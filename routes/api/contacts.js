const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const router = express.Router();

const validateMiddleware = validation(contactSchema);

router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.put(
  "/:contactId",
  validateMiddleware,
  ctrlWrapper(ctrl.updateContactById)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
