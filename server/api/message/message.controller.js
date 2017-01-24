'use strict';

import _ from 'lodash';
import Message from './message.model';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      return res.status(404).end();
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).json({
      title: 'ERROR HAS OCCURRED',
      error: err
    });
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    console.log(entity);
    if (entity) {
      return res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function validateCredentials(user, res) {
  return function(entity) {
    if (entity.user != user) {
      return res.status(401).json({
        title: 'Not Authenticated',
      });
    }
    return entity;
  };
}

function updateUserMessage(user, res) {
  return function(entity) {
    user.messages.push(entity);
    return user.save()
      .then(() => {
        res.status(201).json(entity);
      });
  };
}

export function index(req, res) {
  Message.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function show(req, res) {
  Message.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res, 200))
    .catch(handleError(res));
}

export function create(req, res) {
  let message = Object.assign(req.body, {
    user: req.user
  });
  Message.createAsync(message)
    // .then(respondWithResult(res, 201))
    .then(updateUserMessage(req.user, res))
    .catch(handleError(res));
}

export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  Message.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(validateCredentials(req.user, res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function destroy(req, res) {
  Message.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(validateCredentials(req.user, res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
