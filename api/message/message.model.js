'use strict';

import mongoose, { Schema } from 'mongoose';
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);

var messageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Message', messageSchema);
