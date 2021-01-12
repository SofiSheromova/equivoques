/* eslint-disable require-jsdoc*/
function rollDice() {
  const dice = [...document.querySelectorAll('.die-list')];
  dice.forEach((die) => {
    toggleClasses(die);
    die.dataset.roll = getRandomNumber(1, 6);
  });
}

function toggleClasses(die) {
  die.classList.toggle('odd-roll');
  die.classList.toggle('even-roll');
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function() {
  let clicked = false;
  $('#roll-button').click(rollDice);
  $('.die-item').click(function() {
    if (!clicked) {
      clicked = true;
      $('.die-item[data-side="1"]')
          .empty()
          .append($('<span class="dot"></span>'));
    }
    rollDice();
  });
});
