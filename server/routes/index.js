'use strict';

import express from 'express';
const router = express.Router();

router.use('/messages', require('../api/message'));
router.use('/users', require('../api/user'));

module.exports = router;
