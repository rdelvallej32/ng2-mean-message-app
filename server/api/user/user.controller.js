'use strict';

import User from './user.model';
import crypt from '../../utilities/crypt';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function validateCredentials(credentials, res) {
  return function(entity) {
    if (!crypt.comparePassword(credentials.password, entity.password)) {
      let err = new Error('Invalid Login Credentials');
      return res.status(401).json(err);
    }
    let token = jwt.sign({entity}, 'secret', {expiresIn: 7200});
    return res.json({token, userId: entity._id});
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
  user.password = crypt.createHash(user.password);

  User.createAsync(user)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function signin(req, res) {
  let query = { email: req.body.email};
  User.findOneAsync(query)
    .then(handleEntityNotFound(res))
    .then(validateCredentials(req.body, res))
    .catch(handleError(res));
}
