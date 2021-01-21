const Theme = require('../models/theme');
const Category = require('../models/category');

exports.main = function(req, res, next) {
  res.render('index', {title: 'Экивоки'});
};

exports.authorizationForm = function(req, res, next) {
  res.render('authorization-form', {title: 'Авторизация'});
};

exports.authorization = function(req, res, next) {
  const userAge = new Date(
      new Date() - new Date(Date.parse(req.body.userBirthday)),
  ).getFullYear() - 1970;
  res.cookie('userAge', userAge, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
  res.cookie('userName', req.body.userName,
      {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
  res.redirect(req.query.referer || '/');
};

exports.rulesPage = function(req, res, next) {
  if (!req.cookies.userName || !req.cookies.userAge) {
    res.redirect('/authorization?referer=/rules');
    return;
  }
  const tasks = [1, 2, 3, 4, 5, 6].map((points) => {
    return Category.find({points})
        .then((categories) => {
          const result = {};
          result[`category-${points}-points`] = categories;
          return result;
        })
        .catch((err) => {
          return {};
        });
  });
  tasks.push(
      Theme.find({})
          .then((themes) => {
            return {themes};
          })
          .catch((err) => {
            return {};
          }),
  );
  Promise.all(tasks)
      .then((output) => Object.assign(...output))
      .then((context) => res.render('rules', context))
      .catch((error) => next(error));
};

exports.gamePage = function(req, res, next) {
  if (!req.cookies.userName || !req.cookies.userAge) {
    res.redirect('/authorization?referer=/game');
    return;
  }
  res.render('game', {title: 'Игра'});
};
