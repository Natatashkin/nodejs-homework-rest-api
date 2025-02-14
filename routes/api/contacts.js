const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { validation, authCurrent, ctrlWrapper } = require("../../middlewares");
const { joiSchema, joiStatusSchema } = require("../../models/contact");
const router = express.Router();

router.get("/", authCurrent, ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", authCurrent, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  authCurrent,
  validation(joiSchema),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:contactId",
  authCurrent,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  authCurrent,
  validation(joiStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", authCurrent, ctrlWrapper(ctrl.removeContact));

module.exports = router;
