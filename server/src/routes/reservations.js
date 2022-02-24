import { Router } from "express";
import icons from "../controllers/reservation/icons";
import stripePayment from "../controllers/payments/stripe";
import middleware from "../utils/middleware";

const PATH = "/reservation";
const router = Router();

router.post(`${PATH}/stripe`, middleware, stripePayment);

router.get(`${PATH}/create`, async (req, res) => {
  console.log("Create reservation");
});

router.post(`${PATH}/icons`, icons);

export default router;
