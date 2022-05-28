const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);
  if (!removedContact) {
    throw new NotFound(`Contact with id=${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result: removedContact,
    },
  });
};

module.exports = removeContact;
