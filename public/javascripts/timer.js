/* eslint-disable require-jsdoc*/
const FULL_DASH_ARRAY = 283;

export const TIME_FRAME = {
  timeLimit: 60,
  warningThreshold: 20,
  alertThreshold: 5,
};

const COLOR_CODES = {
  info: {
    color: 'cadet-blue-text text-lighten-1',
  },
  warning: {
    color: 'sandy-brown-text',
    threshold: TIME_FRAME.warningThreshold,
  },
  alert: {
    color: 'red-text text-darken-1',
    threshold: TIME_FRAME.alertThreshold,
  },
};

let timeLeft;
let timerInterval;

function initTimer() {
  onTimesUp();
  timeLeft = TIME_FRAME.timeLimit;
  setCircleDasharray();
  $('#base-timer-path-remaining')
      .removeClass()
      .addClass(COLOR_CODES.info.color);
  $('#base-timer-label').text('');
}

function onTimesUp() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = null;
}

function startTimer() {
  $('#base-timer-label').text(formatTime(timeLeft));
  timerInterval = setInterval(() => {
    timeLeft -= 1;
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
  const seconds = time % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function setRemainingPathColor(timeLeft) {
  if (timeLeft <= COLOR_CODES.alert.threshold) {
    $('#base-timer-path-remaining')
        .removeClass()
        .addClass(COLOR_CODES.alert.color);
  } else if (timeLeft <= COLOR_CODES.warning.threshold) {
    $('#base-timer-path-remaining')
        .removeClass()
        .addClass(COLOR_CODES.warning.color);
  }
}

function setCircleDasharray() {
  const circleDasharray = `${
    (calculateTimeFraction() * FULL_DASH_ARRAY).toFixed()
  } ${FULL_DASH_ARRAY}`;
  $('#base-timer-path-remaining').attr('stroke-dasharray', circleDasharray);
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_FRAME.timeLimit;
  return rawTimeFraction - (1 / TIME_FRAME.timeLimit) * (1 - rawTimeFraction);
}

$(document).ready(function() {
  $('.die-item').click(() => {
    initTimer();
    $('.play-timer-btn').show();
  });
  $('.base-timer').click(() => {
    if (!timerInterval) {
      $('.play-timer-btn').hide();
      initTimer();
      startTimer();
    }
  });
});
