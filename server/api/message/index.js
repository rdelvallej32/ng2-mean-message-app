'use strict';

import { Router} from 'express';
import * as controller from './message.controller';
import auth from '../../auth/auth.middleware';

var router = new Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated, controller.create);
router.patch('/:id', auth.isAuthenticated, controller.update);
router.delete('/:id', auth.isAuthenticated, controller.destroy);


module.exports = router;
