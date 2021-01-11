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
  console.log(req.body);
  res.redirect(req.cookies || '/');
});

router.get('/rules', function(req, res, next) {
  console.log(req.cookies);
  if (!req.cookies.userAge) {
    res.redirect('/authorization');
  } else {
    res.redirect('/');
  }
});

router.get('/game', function(req, res, next) {
  console.log(req.cookies);
  if (!req.cookies.userAge) {
    res.redirect('/authorization');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
