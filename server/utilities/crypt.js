'use strict';

import bcrypt from 'bcryptjs';

exports.createHash = password => bcrypt.hashSync(password, 10);

exports.comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
