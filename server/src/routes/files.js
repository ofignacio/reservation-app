import { Router } from "express";
import files from "../controllers/files/files";

const PATH = "/files";
const router = Router();

router.get(`${PATH}/:file`, files);

export default router;
