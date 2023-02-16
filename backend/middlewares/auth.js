/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../constants');
const { UnauthorizedError } = require('../errors');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }

  req.user = payload;

  next();
};
