/* eslint-disable require-jsdoc*/
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function() {
  let diceClicked = false;
  $('.die-item').click(rollDice);

  function rollDice() {
    if (!diceClicked) {
      diceClicked = true;
      $('.die-item[data-side="1"]')
          .empty()
          .append($('<span class="dot"></span>'));
    }
    const diceValue = updateDiceValue();
    console.log(diceValue);
    let url;
    if (diceValue === '6') {
      url = '/equivoquescard/';
    } else {
      url = '/standardcard/';
    }
    fetch(url)
        .then((res) => res.json())
        .then(console.log)
        .catch(console.log);
  }

  function updateDiceValue() {
    const dice = $('.die-list')
        .toggleClass('odd-roll')
        .toggleClass('even-roll')
        .attr('data-roll', getRandomNumber(1, 6));

    return dice.attr('data-roll');
  }
});
