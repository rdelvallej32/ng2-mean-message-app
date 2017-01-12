'use strict';

mongoose.Promise = require('bluebird');
import mongoose, { Schema } from 'mongoose';

var messageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId
  }
});

export default mongoose.model('Message', messageSchema);
