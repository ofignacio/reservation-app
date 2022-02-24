import { parseBoolean } from "./validations";

export const parseBody = (req, res, next) => {
  Object.keys(req.body).map((key) => {
    const value = req.body[key];
    if (value === "") {
      req.body[key] = null;
    } else if (!isNaN(value)) {
      req.body[key] = parseInt(value, 10);
    } else if (value === "null") {
      req.body[key] = null;
    } else if (key === "icons") {
      req.body[key] = value.split(",").map((item) => parseInt(item, 10));
    } else if (value === "true" || value === "false") {
      req.body[key] = parseBoolean(value);
    }
    return key;
  });

  next();
};
