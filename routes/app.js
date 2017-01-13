'use strict';

import express from 'express';
const router = express.Router();

router.get('/haha', (req, res, next) => {
    res.render('index');
});

module.exports = router;
