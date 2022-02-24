import jwt from 'jsonwebtoken';
import {SESSION_KEY} from '../config/constants';

const unauthorized = (message = 'Unauthorized') =>
  JSON.stringify({status: 401, message});

export const open = async (req, res, next) => {
  const openToken = req.headers['o-access-token'];
  if (openToken) {
    const isLogged = jwt.verify(openToken, SESSION_KEY);
    if (isLogged) {
      next(req, res);
    } else {
      res.send(unauthorized());
    }
  } else {
    res.send(unauthorized());
  }
};

export const admin = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    const isLogged = jwt.verify(token, SESSION_KEY);
    if (isLogged && isLogged.isAdmin) {
      req.idUser = isLogged.username;
      next();
    } else {
      res.send(unauthorized());
    }
  } else {
    res.send(unauthorized());
  }
};

export default async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    const isLogged = jwt.verify(token, SESSION_KEY);
    if (isLogged) {
      req.idUser = isLogged.username;
      next();
    } else {
      res.send(unauthorized());
    }
  } else {
    res.send(unauthorized());
  }
};
