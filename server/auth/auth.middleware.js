'use strict';

import jwt from 'jsonwebtoken';
import User from '../api/user/user.model';

exports.isAuthenticated = (req, res, next) => {
  jwt.verify(req.query.token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    } else {
      const token = jwt.decode(req.query.token);
      User.findById(token.entity._id).exec()
        .then(user => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(err => console.error(err));
    }
  });
};
