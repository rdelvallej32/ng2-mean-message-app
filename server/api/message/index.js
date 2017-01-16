'use strict';

import { Router} from 'express';
import * as controller from './message.controller';

var router = new Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);


module.exports = router;
