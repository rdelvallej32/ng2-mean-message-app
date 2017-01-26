'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

var all = {
  env: process.env.NODE_ENV
  };

  module.exports = _.merge(
    all,
    require(`./${process.env.NODE_ENV}.js`) || {});
