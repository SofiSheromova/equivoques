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
  res.cookie('userAge', userAge, {maxAge: 900000, httpOnly: true});
  res.cookie('userName', req.body.userName, {maxAge: 900000, httpOnly: true});
  res.redirect(req.query.referer || '/');
};

exports.rulesPage = function(req, res, next) {
  if (!req.cookies.userAge) {
    res.redirect('/authorization?referer=/rules');
    return;
  }
  res.render('rules', {title: 'Правила'});
};

exports.gamePage = function(req, res, next) {
  console.log(req.cookies);
  if (!req.cookies.userAge) {
    res.redirect('/authorization?referer=/game');
    return;
  }
  res.render('game', {title: 'Игра'});
};
