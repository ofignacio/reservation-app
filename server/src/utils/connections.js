// Principal libraries
import mysql from "mysql";

// Extras
import { DISPLAY_LOGS, GLOBAL_DATABASE } from "../config/constants";
import { log } from "./logs";

export const makeQuery = (query, values, conn) => {
  return new Promise((resolve, reject) => {
    if (conn) {
      conn.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else {
      const connection = mysql.createConnection(GLOBAL_DATABASE);
      connection.connect(
        (err) => err && log("No se puede conectar con la base de datos")
      );
      connection.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
      connection.end();
    }
  });
};

export const success = (result, error, message) => {
  if (DISPLAY_LOGS) {
    log(`${message}`);
  }
  return JSON.stringify({ status: 200, data: result, error });
};

export const error = (err, message) => {
  let messageError;
  if (typeof err === "object" && err.message) messageError = err.message;
  else if (typeof err === "string") messageError = err;
  else messageError = "server.internalerror";
  if (DISPLAY_LOGS) {
    log(`${message}. ${err}`);
  }
  return JSON.stringify({
    status: 500,
    error: { isError: true, message: messageError },
  });
};

export const isError = (isError, message) => ({ isError: isError, message });
