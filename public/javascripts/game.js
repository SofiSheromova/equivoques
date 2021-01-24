/* eslint-disable require-jsdoc*/
import {TIME_FRAME} from './timer.js';

const CardTypesUrl = Object.freeze({
  'standard': '/standardcard/',
  'equivoques': '/equivoquescard/',
});

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function() {
  let diceRolled = false;
  $('.die-item').click(rollDice);

  $(document).on('keyup', function(e) {
    if (e.which === 32) {
      rollDice();
    }
  });

  function rollDice() {
    $('.error-placement').hide();
    if (!diceRolled) {
      diceRolled = true;
      removeDiceButton();
    }
    const diceValue = updateDiceValue();

    requestCard(diceValue)
        .then((card) => {
          displayCard(card, diceValue);
        });
  }

  function removeDiceButton() {
    $('.die-item[data-side="1"]')
        .empty()
        .append($('<span class="dot"></span>'));
  }

  function updateDiceValue() {
    const dice = $('.die-list')
        .toggleClass('odd-roll')
        .toggleClass('even-roll')
        .attr('data-roll', getRandomNumber(1, 6));

    return dice.attr('data-roll');
  }

  function requestCard(diceValue) {
    const url = diceValue === '6' ?
        CardTypesUrl.equivoques :
        CardTypesUrl.standard;

    return fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if (res.hasOwnProperty('error')) {
            return Promise.reject(res.error);
          }
          return res;
        })
        .catch((err) => {
          console.log(err);
          $('.error-placement').show();
        });
  }

  function displayCard(card, diceValue) {
    $('.card-wrapper').children().hide();
    if (diceValue === '6') {
      displayEquivoquesCard(card);
    } else {
      displayStandardCard(card, diceValue);
    }
  }

  function displayStandardCard(card, number) {
    $('.standard-card').css('display', 'flex');
    $(`.standard-card .theme__game-card`)
        .text(card[0].theme.title);

    for (let i = 1; i < 6; i++) {
      $(`.standard-task[data-point=${i}] .category-name__standard-task`)
          .text(card[i - 1].category.title);
      $(`.standard-task[data-point=${i}] .content__standard-task`)
          .text(card[i - 1].content);
    }

    TIME_FRAME.timeLimit = card[number - 1].category.duration;
  }

  function displayEquivoquesCard(card) {
    $('.equivoques-card').css('display', 'flex');
    $(`.equivoques-card .theme__game-card`)
        .text(card[0].theme.title);
    $(`.equivoques-card .rules__equivoques-card`)
        .text(card[0].category.specification);
    $(`.equivoques-card .equivoques-task`)
        .text(card[0].content);

    TIME_FRAME.timeLimit = card[0].category.duration;
  }
});
