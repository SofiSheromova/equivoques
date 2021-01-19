/* eslint-disable require-jsdoc*/
const TIME_LIMIT = 60;
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 15;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: 'cadet-blue-text text-lighten-1',
  },
  warning: {
    color: 'sandy-brown-text',
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: 'red-text text-darken-1',
    threshold: ALERT_THRESHOLD,
  },
};

let timeLeft = TIME_LIMIT;
let timerInterval = null;

function onTimesUp() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = TIME_LIMIT;
  setCircleDasharray();
}

function startTimer() {
  if (timerInterval) {
    return;
  }
  let timePassed = 0;
  timeLeft = TIME_LIMIT;
  $('#base-timer-path-remaining')
      .removeClass()
      .addClass(COLOR_CODES.info.color);
  $('#base-timer-label').text(formatTime(timeLeft));
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    $('#base-timer-label').text(formatTime(timeLeft));
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const {alert, warning} = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    $('#base-timer-path-remaining')
        .removeClass()
        .addClass(alert.color);
  } else if (timeLeft <= warning.threshold) {
    $('#base-timer-path-remaining')
        .removeClass()
        .addClass(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  $('#base-timer-path-remaining').attr('stroke-dasharray', circleDasharray);
}

$(document).ready(function() {
  $('.die-item').click(() => {
    onTimesUp();
    $('.play-timer-btn').show();
    $('#base-timer-path-remaining')
        .removeClass()
        .addClass(COLOR_CODES.info.color);
    $('#base-timer-label').text('');
  });
  $('.base-timer').click(() => {
    $('.play-timer-btn').hide();
    startTimer();
  });
});
