'use strict';

import mongoose, { Schema } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);

var userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }]
});

userSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('User', userSchema);
