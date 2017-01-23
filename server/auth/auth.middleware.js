'use strict';

import jwt from 'jsonwebtoken';

exports.isAuthenticated = (req, res, next) => {
  jwt.verify(req.query.token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    next();
  });
};
