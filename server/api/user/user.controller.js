'use strict';

import User from './user.model';
import createHash from '../utilities/crypt';

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

export function signup(req, res) {
  let user = req.body;
  user.password = createHash(user.password);
  console.log(user);

  User.createAsync(user)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
