'use strict';

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
    console.error(err);
    return res.status(statusCode).json({
      title: 'ERROR HAS OCCURRED',
      error: err
    });
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => res.sendStatus(204));
    }
  };
}

export function index(req, res) {
  Message.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function show(req, res) {
  let messageId = req.params.id;
  Message.findByIdAsync(messageId)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res, 200))
    .catch(handleError(res));
}

export function create(req, res) {
  Message.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Message.findByIdAsync(req.params.id, req.body)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res, 204))
    .catch(handleError());
}

export function destroy(req, res) {
  Message.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(req.body))
    .catch(handleError(res));
}
