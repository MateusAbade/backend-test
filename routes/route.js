const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/visualiza-investimento', controller.visualizaIventimento);

router.get('/lista-investimentos/:page', controller.listaIventimentos);

router.post('/cria-investimento', controller.criaIventimentos);

router.put('/retira-investimento', controller.retiraInvestimentos);



module.exports = router