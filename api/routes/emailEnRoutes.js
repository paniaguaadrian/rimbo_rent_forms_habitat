import express from "express";

// Controllers imported
import {
  sendHAFormEmailsEn,
  sendE1REmailEmailsEn,
  sendF2SCFormEmailsEn,
  sendNotificationRimboEn,
} from "../controllers/emailsController.js";

const router = express.Router();

router.route("/e1r").post(sendHAFormEmailsEn);
router.route("/e2tt").post(sendE1REmailEmailsEn);
router.route("/e2r").post(sendNotificationRimboEn);
router.route("/e3").post(sendF2SCFormEmailsEn);

export default router;
