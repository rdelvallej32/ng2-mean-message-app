'use strict';

import express from 'express';
const router = express.Router();

router.use('/users', require('../api/user'));
router.use('/messages', require('../api/message'));

module.exports = router;
