'use strict';

mongoose.Promise = require('bluebird');
import mongoose, { Schema } from 'mongoose';

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
  messages: []
});

export default mongoose.model('User', userSchema);
