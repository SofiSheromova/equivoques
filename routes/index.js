const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Экивоки'});
});

router.get('/authorization', function(req, res, next) {
  res.render('authorization-form', {title: 'Авторизация'});
});

router.post('/authorization', function(req, res, next) {
  const userAge = new Date(
      new Date() - new Date(Date.parse(req.body.userBirthday)),
  ).getFullYear() - 1970;
  res.cookie('userAge', userAge, {maxAge: 900000, httpOnly: true});
  res.cookie('userName', req.body.userName, {maxAge: 900000, httpOnly: true});
  res.redirect(req.query.referer || '/');
});

router.get('/rules', function(req, res, next) {
  if (!req.cookies.userAge) {
    res.redirect('/authorization?referer=/rules');
    return;
  }
  res.render('rules', {title: 'Правила'});
});

router.get('/game', function(req, res, next) {
  console.log(req.cookies);
  if (!req.cookies.userAge) {
    res.redirect('/authorization?referer=/game');
    return;
  }
  res.render('game-start', {title: 'Игра'});
});

module.exports = router;
