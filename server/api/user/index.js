'use strict';

import { Router} from 'express';
import * as controller from './user.controller';

var router = new Router();

router.get('/', controller.index);
router.post('/', controller.create);

module.exports = router;
