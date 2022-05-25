const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;

  const updetedContact = await contactsOperations.updateContact(
    contactId,
    req.body
  );
  if (!updetedContact) {
    throw new NotFound(`Contact with id=${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: updetedContact,
    },
  });
};

module.exports = updateContactById;
