const express = require('express');
const router = express.Router();

const { getWords, resultRank } = require('../controllers/scoreController')
router.get('/words', getWords)
router.post('/rank', resultRank);

module.exports=router
