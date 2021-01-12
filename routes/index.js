const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const GameController = require('../controllers/game-controller');

/* GET home page. */
router.get('/', GameController.main);

router.get('/authorization', GameController.authorizationForm);

router.post('/authorization', GameController.authorization);

router.get('/rules', GameController.rulesPage);

router.get('/game', GameController.gamePage);

module.exports = router;
