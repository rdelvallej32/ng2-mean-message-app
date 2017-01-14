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

export function create(req, res) {
  Message.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
