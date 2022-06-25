const express = require("express");
const { users: ctrl } = require("../../controllers");
const {
  validation,
  authCurrent,
  upload,
  ctrlWrapper,
} = require("../../middlewares");
const { joiSubscriptionSchema } = require("../../models/user");

const router = express.Router();
router.get("/current", authCurrent, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  authCurrent,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  authCurrent,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
