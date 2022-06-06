const express = require("express");
const { auth: ctrl } = require("../../controllers");
const { validation, authCurrent, ctrlWrapper } = require("../../middlewares");
const { joiSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/logout", authCurrent, ctrlWrapper(ctrl.logout));

module.exports = router;
