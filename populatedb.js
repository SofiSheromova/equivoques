#! /usr/bin/env node

/* eslint-disable require-jsdoc*/

console.log('This script populates some test themes, categories, ' +
    'tasks and cards to your database.');
const mongoose = require('mongoose');

const async = require('async');
const Theme = require('./models/theme');
const Category = require('./models/category');
const Task = require('./models/task');
const StandardCard = require('./models/standard-card');
const EquivoquesCard = require('./models/equivoques-card');

const setUpMongooseConnection = require('./database');
setUpMongooseConnection();

const themes = {};
const categories = {};
const standardTasks = [];
const equivoquesTask = [];
const cards = [];

function themeCreate(title, description, ageRestriction=10, cb) {
  const theme = new Theme({title, description, ageRestriction});
  theme.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Theme: ' + theme);
    themes[theme.title] = theme;
    cb(null, theme);
  } );
}

function categoryCreate(title, specification, duration, points, cb) {
  const category = new Category({title, specification, duration, points});

  category.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories[category.title] = category;
    cb(null, category);
  } );
}

function taskCreate(theme, category, content, cb) {
  const task = new Task({theme, category, content});
  task.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    if (task.points === 6) {
      console.log('New Equivoques Task: ' + task);
      equivoquesTask.push(task);
    } else {
      console.log('New Standard Task: ' + task);
      standardTasks.push(task);
    }
    cb(null, task);
  });
}

function cardCreate(tasks, cb) {
  let card;
  if (tasks.length === 1) {
    card = new EquivoquesCard({tasks});
  } else {
    card = new StandardCard({tasks});
  }
  card.save(function(err) {
    if (err) {
      console.log('ERROR CREATING Card: ', card);
      cb(err, null);
      return;
    }
    console.log('New Card: ' + card);
    cards.push(card);
    cb(null, card);
  } );
}

function createThemes(cb) {
  async.series([
    function(callback) {
      themeCreate(
          'культпросвет',
          'Всё, что связано с культурой - от классики до современных ' +
          'субкультур.',
          16,
          callback);
    },
    // function(callback) {
    //   themeCreate(
    //       'вести из прошлого',
    //       'Люди, события, предметы из прошлого. Впрочем, не исключено, ' +
    //       'что они могут существовать и в настоящем.',
    //       16,
    //       callback);
    // },
    function(callback) {
      themeCreate(
          'верю-не-верю',
          'Верования, религии, сказки, мифы, городские легенды, ' +
          'суеверия и т.п.',
          16,
          callback);
    },
    function(callback) {
      themeCreate(
          'конкретно',
          'Всё, что можно не только увидеть, но и потрогать. Тема охватывает ' +
          'конкретные вещи, предметы - как правило, привычные и часто ' +
          'встречающиеся в нашей повседневной жизни.',
          16,
          callback);
    },
    function(callback) {
      themeCreate(
          'кушать подано',
          'Всё, что может быть съедено или использовано для приготовления ' +
          'пищи и её поедания.',
          10,
          callback);
    },
    function(callback) {
      themeCreate(
          'песня',
          'Время узнать кому медведь на ухо наступил.',
          10,
          callback);
    },
    function(callback) {
      themeCreate(
          'пластилин',
          'Почувствуй себя настоящим скульптором. Но ваять ' +
          'шедевры сегодня придётся из пластилина.',
          10,
          callback);
    },
  ],
  // optional callback
  cb);
}

function createCategories(cb) {
  async.series([
    function(callback) {
      categoryCreate(
          'слова',
          'Объясните слово или выражение любыми словами, кроме тех, ' +
          'которые содержатся в задании (включая предлоги, союзы и т.п.), ' +
          'и их однокоренных. Награда за успех - 1 клетка вперёд.',
          1,
          1,
          callback);
    },
    function(callback) {
      categoryCreate(
          'наоборот',
          'Прочитайте вслух загаданное слово задом наперёд (не более ' +
          '3-х раз). Команда должна его восстановить и правильно произнести. ' +
          'Нельзя ничего записывать. Награда за успех - 2 клетки вперёд',
          1,
          2,
          callback);
    },
    function(callback) {
      categoryCreate(
          'рисунок',
          'Объясните слово с помощью рисунка. Нельзя издавать звуки, ' +
          'жестикулировать, писать цифры и буквы. Можно обозначать схему ' +
          'предложения или словосочетания с помощью условных знаков. ' +
          'Награда за успех - 3 клетки вперёд.',
          1,
          3,
          callback);
    },
    function(callback) {
      categoryCreate(
          'жесты',
          'Объясните слово жестами. Нельзя издавать звуки. Можно ' +
          'показывать на предметы. Используйте условные знаки, чтобы ' +
          'обозначить схему предложения или словосочетания. ' +
          'Награда за успех - 4 клетки вперёд',
          1,
          4,
          callback);
    },
    function(callback) {
      categoryCreate(
          'да/нет',
          'Чтобы отгадать слово, ваша команда (или соперники, если ' +
          'вы играете каждый за себя) задаёт вопросы. Игрок может отвечать ' +
          'только «да» и «нет». На выполнение этого задания может быть дано ' +
          '2 минуты. Награда за успех - 5 клетки вперёд',
          2,
          5,
          callback);
    },
    function(callback) {
      categoryCreate(
          'песня',
          'Спойте песню (можно несколько), в которой есть загаданное ' +
          'слово. Само слово произносить нельзя (\"Пи-ип!\"). Можно петь на ' +
          'иностранных языках. Объясните как можно больше слов из ' +
          'предложенных на карточке за 1 минуту. За каждое отгаданное слово ' +
          'пройдите на 2 клетки вперёд',
          1,
          6,
          callback);
    },
    function(callback) {
      categoryCreate(
          'пластилиновая корова',
          'Объясните слово с помощью скульптуры. Используйте пластилин или ' +
          'любые предметы (скрепки, зубочистки и т.п.). Нельзя изображать ' +
          'буквы, цифры, жестикулировать и издавать звуки. На выполнение ' +
          'задания даётся 2 минуты. Если слово отгадано, пройдите на 6 ' +
          'клеток вперед.',
          2,
          6,
          callback);
    },
  ],
  // optional callback
  cb);
}

function createStandardTasks(cb) {
  async.parallel([
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['слова'],
          'Сверлить бетон',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['наоборот'],
          'Видеомагнитофон',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['рисунок'],
          'Печать',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['жесты'],
          'Конь педальный',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['да/нет'],
          'Цепь',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['слова'],
          'Раритет',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['наоборот'],
          'Овощехранилище',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['рисунок'],
          'Подземный переход',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['жесты'],
          'Где же кружка?',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['да/нет'],
          'Корыто',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['слова'],
          'Большой толковый словарь',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['наоборот'],
          'Электровеник',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['рисунок'],
          'Играть со спичками',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['жесты'],
          'Паркет',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['да/нет'],
          'Форточка',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['слова'],
          'Вилкой ткнуть',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['наоборот'],
          'Фундамент',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['рисунок'],
          'Погреб',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['жесты'],
          'Сыграть в ящик',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['да/нет'],
          'Катафалк',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['слова'],
          'Тормоз',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['наоборот'],
          'Шубохранилище',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['рисунок'],
          'Поливать из шланга',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['жесты'],
          'Катышки',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['да/нет'],
          'Кочерга',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['слова'],
          'Хостел',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['наоборот'],
          'Аттракцион',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['рисунок'],
          'Паркет',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['жесты'],
          'Джигит-такси',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['конкретно'],
          categories['да/нет'],
          'Расчёска',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['слова'],
          'Бизнес-ланч',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['наоборот'],
          'Бешбармак',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['рисунок'],
          'Холодец',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['жесты'],
          'Лаптем щи хлебать',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['да/нет'],
          'Мармелад',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['слова'],
          'Компот из сухофруктов',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['наоборот'],
          'Дегустация',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['рисунок'],
          'Маковая росинка',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['жесты'],
          'Чистить рыбу от чешуи',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['да/нет'],
          'Оливье',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['слова'],
          'Хлебный мякиш',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['наоборот'],
          'Бланшировка',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['рисунок'],
          'Свиная рулька',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['жесты'],
          'Заморить червячка',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['да/нет'],
          'Редька',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['слова'],
          'Перемена блюд',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['наоборот'],
          'Холодильник',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['рисунок'],
          'Завтрак туриста',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['жесты'],
          'Кидаться тортами',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['да/нет'],
          'Винегрет',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['слова'],
          'Беляшная',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['наоборот'],
          'копчености',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['рисунок'],
          'Шаурма (шаверма)',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['жесты'],
          'Всухомятку',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['да/нет'],
          'Обжора',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['слова'],
          'Гастрономический тур',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['наоборот'],
          'Кофемашина',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['рисунок'],
          'Яйцо всмятку',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['жесты'],
          'Хлеб да соль',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['кушать подано'],
          categories['да/нет'],
          'Мясорубка',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['слова'],
          'стиль',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['наоборот'],
          'аккомпаниатор',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['рисунок'],
          'Мазня',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['жесты'],
          'Матерные частушки',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['да/нет'],
          'Спецэффекты',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['слова'],
          'Художественный свист',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['наоборот'],
          'Абстракционизм',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['рисунок'],
          'Фиговый лист',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['жесты'],
          'Взять автограф',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['да/нет'],
          'Тенор',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['слова'],
          'Машинный перевод',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['наоборот'],
          'Фотоколлаж',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['рисунок'],
          'Комикс',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['жесты'],
          'Не читал, но осуждаю',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['да/нет'],
          'Голливуд',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['слова'],
          'Культовый фильм',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['наоборот'],
          'Балетмейстер',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['рисунок'],
          'Клинопись',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['жесты'],
          'Рукодельница',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['да/нет'],
          'Кукловод',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['слова'],
          'Джаз-бенд',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['наоборот'],
          'Стихотворение',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['рисунок'],
          'Жонглер',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['жесты'],
          'Развесистая клюква',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['да/нет'],
          'Гений',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['слова'],
          'Сноб',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['наоборот'],
          'Кинематограф',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['рисунок'],
          'Литературный негр',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['жесты'],
          'Учиться в кульке',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['культпросвет'],
          categories['да/нет'],
          'Караоке',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['слова'],
          'Грешновато',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['наоборот'],
          'Стоунхендж',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['рисунок'],
          'По дереву постучать',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['жесты'],
          'Приворотное зелье',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['да/нет'],
          'Амулет',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['слова'],
          'Гипножаба',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['наоборот'],
          'Одержимец',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['рисунок'],
          'Крокодил в канализации',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['жесты'],
          'Телекинез',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['да/нет'],
          'Пришелец',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['слова'],
          'Гомеопатия',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['наоборот'],
          'Самосожжение',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['рисунок'],
          'Круги на полях',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['жесты'],
          'Присесть на дорожку',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['да/нет'],
          'Метла',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['слова'],
          'Кармический урок',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['наоборот'],
          'Заратустра',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['рисунок'],
          'Продать душу дьяволу',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['жесты'],
          'Битва экстрасенсов',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['да/нет'],
          'Телепатия',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['слова'],
          'Оптическая иллюзия',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['наоборот'],
          'Трансмутация',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['рисунок'],
          'Уши развесить',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['жесты'],
          'Чистить ауру',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['да/нет'],
          'Гороскоп',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['слова'],
          'Святоша',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['наоборот'],
          'Предсказательница',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['рисунок'],
          'Письмо счастья',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['жесты'],
          'Галлюцинация',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['верю-не-верю'],
          categories['да/нет'],
          'Бэтмен',
          callback,
      );
    },
  ],
  // optional callback
  cb);
}

function createEquivoquesTasks(cb) {
  async.parallel([
    function(callback) {
      taskCreate(
          themes['пластилин'],
          categories['пластилиновая корова'],
          'Рыба',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['пластилин'],
          categories['пластилиновая корова'],
          'Apple',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['пластилин'],
          categories['пластилиновая корова'],
          'Кобра',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['пластилин'],
          categories['пластилиновая корова'],
          'Банан',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['пластилин'],
          categories['пластилиновая корова'],
          'Лайк',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['пластилин'],
          categories['пластилиновая корова'],
          'Пушка',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['пластилин'],
          categories['пластилиновая корова'],
          'Жало',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['пластилин'],
          categories['пластилиновая корова'],
          'Качели',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['песня'],
          categories['песня'],
          'Дорога, лодка, самолёт',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['песня'],
          categories['песня'],
          'Королева, старый, вчера',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['песня'],
          categories['песня'],
          'Сон, удача, судьба',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['песня'],
          categories['песня'],
          'Рука, сердце, слеза',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['песня'],
          categories['песня'],
          'Собака, кот, мальчик',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['песня'],
          categories['песня'],
          'Зеркало, туман, ночь',
          callback,
      );
    },
    function(callback) {
      taskCreate(
          themes['песня'],
          categories['песня'],
          'Веселый, детство, ресницы',
          callback,
      );
    },
  ], cb);
}

function createStandardCards(cb) {
  const cardCreationFunctions = [];
  for (let i = 0; i < standardTasks.length; i += 5) {
    const tasks = standardTasks.slice(i, i + 5);
    cardCreationFunctions.push(function(callback) {
      cardCreate(tasks, callback);
    });
  }
  async.parallel(cardCreationFunctions, cb);
}

function createEquivoquesCards(cb) {
  const cardCreationFunctions = [];
  for (let i = 0; i < equivoquesTask.length; i++) {
    cardCreationFunctions.push(function(callback) {
      cardCreate([equivoquesTask[i]], callback);
    });
  }
  async.parallel(cardCreationFunctions, cb);
}

async.series([
  createThemes,
  createCategories,
  createStandardTasks,
  createEquivoquesTasks,
  createStandardCards,
  createEquivoquesCards,
],
// Optional callback
function(err, results) {
  if (err) {
    console.log('Error!:\n '+ err);
  } else {
    console.log('Done!\nCards:\n '+ cards);
  }
  // All done, disconnect from database
  mongoose.connection.close();
});
