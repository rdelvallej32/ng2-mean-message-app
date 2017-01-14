'use strict';

import User from './message.user';

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
    return res.status(statusCode).json(entity);
  };
}

export function index(req, res) {
  User.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function create(req, res) {
  User.createAsync(req.body)
    .then(user => {
      user.save();
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
