const express = require("express");
const { users: ctrl } = require("../../controllers");
const { validation, authCurrent, ctrlWrapper } = require("../../middlewares");
const { joiSubscriptionSchema } = require("../../models/user");

const router = express.Router();
router.get("/current", authCurrent, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  authCurrent,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
