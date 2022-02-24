import {isError, error, makeQuery, success} from '../../utils/connections';
import {DB_KEY} from '../../config/constants';

const pass = async (req, res) => {
  const {username} = req.body;
  try {
    const {affectedRows} = await makeQuery(
      `update users set password = AES_ENCRYPT(?, '${DB_KEY}') where username = ?`,
      ['bethel', username],
    );

    if (affectedRows === 0) {
      throw new Error('Se ha producido un error');
    }

    res.send(
      success(
        null,
        isError(false),
        '| Reset pass success | (src/controllers/users/pass.js/pass) |',
      ),
    );
  } catch (err) {
    res.send(
      error(
        err,
        `| Reset pass failed | (src/controllers/users/pass.js/pass/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default pass;
