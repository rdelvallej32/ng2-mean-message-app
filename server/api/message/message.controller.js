'use strict';

import Message from './message.model';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    console.log(entity);
    return res.status(statusCode).json(entity);
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
    .then(message => {
      if (!message) {
        return res.status(404).end();
      }
      return message;
    })
    .then(respondWithResult(res, 200))
    .catch(handleError(res));
}

export function create(req, res) {
  Message.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function update(req, res) {
  let messageId = req.params.id;
  if (req.body._id) {
    delete req.body._id;
  }
  Message.findByIdAndUpdateAsync(messageId, req.body)
    .then(respondWithResult(res, 204))
    .catch(handleError());
}

export function destroy(req, res) {
  let id = req.params.id;
  Message.findByIdAndRemoveAsync(id)
    .then(respondWithResult(res, 204))
    .catch(handleError(res));
}
