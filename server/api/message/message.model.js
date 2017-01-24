'use strict';

import mongoose, { Schema } from 'mongoose';
import User from '../user/user.model';
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

messageSchema.post('remove', message => {
  User.findById(message.user).exec()
    .then(user => {
      user.messages.pull(message);
      user.save();
    });
});

export default mongoose.model('Message', messageSchema);
