'use strict';

import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.use('/messages', require('../api/message'));
router.use('/users', require('../api/user'));

module.exports = router;
