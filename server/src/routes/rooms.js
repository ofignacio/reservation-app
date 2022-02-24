// Principal libarires
import { Router } from "express";
import multer from "multer";

// Controllers
import { generateRandom, list } from "../controllers/rooms/list";
import search from "../controllers/rooms/search";
import create from "../controllers/rooms/create";

// Extras
import { PHOTOS_FOLDER } from "../config/constants";
import middleware from "../utils/middleware";
import { parseBody } from "../utils/parse";

const PATH = "/rooms";
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PHOTOS_FOLDER);
  },
  filename: (req, file, cb) => {
    if (!req.body.photos) req.body.photos = [];
    const name =
      file.fieldname +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      ".png";
    req.body.photos.push(name);
    cb(null, name);
  },
});

const upload = multer({ dest: PHOTOS_FOLDER, storage }).array("photo", 12);

router.post(`${PATH}/random`, generateRandom);

router.post(`${PATH}/list`, list);

router.post(`${PATH}/search`, search);

router.post(`${PATH}/add`, middleware, upload, parseBody, create);

router.get(`${PATH}/modify`, async (req, res) => {
  console.log("Modify room");
});

router.get(`${PATH}/delete`, async (req, res) => {
  console.log("Delete room");
});

export default router;
