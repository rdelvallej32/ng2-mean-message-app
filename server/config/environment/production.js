'use strict';
/*eslint no-process-env:0*/

module.exports = {
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/ng-messenger'
  }
};
