import express from "express";

// Controllers imported
import {
  sendF1HAFormEmails,
  sendE1REmailEmails,
  sendF2SCFormEmails,
  sendNotificationRimbo,
} from "../controllers/emailsController.js";

const router = express.Router();

router.route("/e1r").post(sendF1HAFormEmails);
router.route("/e2tt").post(sendE1REmailEmails);
router.route("/e2r").post(sendNotificationRimbo);
router.route("/e3").post(sendF2SCFormEmails);

export default router;
