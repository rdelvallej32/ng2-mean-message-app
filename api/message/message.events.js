/**
 * User model events
 */

'use strict';

import {EventEmitter} from 'events';
import User from './user.model';
var MessageEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MessageEvents.setMaxListeners(0);

// Model events<% if (filters.mongooseModels) { %>
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  User.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MessageEvents.emit(event + ':' + doc._id, doc);
    MessageEvents.emit(event, doc);
  };
}

export default MessageEvents;
