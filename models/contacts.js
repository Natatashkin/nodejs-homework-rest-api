const fs = require("fs/promises");
const { generate } = require("shortid");
const filePath = require("./path");
const updateContactsList = require("./updateContactsList");

//
// Require `PhoneNumberFormat`.
const PNF = require("google-libphonenumber").PhoneNumberFormat;

// Get an instance of `PhoneNumberUtil`.
const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

const phoneNumberFormater = (phone) => {
  // Parse number with country code and keep raw input.
  const contactPhone = phoneUtil.parseAndKeepRawInput(phone, "US");
  return phoneUtil.format(contactPhone, PNF.NATIONAL);
};

const listContacts = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  const allContacts = JSON.parse(data);
  return allContacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const products = await listContacts();
  const idx = products.findIndex(({ id }) => id === contactId);
  if (idx === -1) {
    return null;
  }
  const newProducts = products.filter((_, index) => index !== idx);
  await updateContactsList(newProducts);
  return products[idx];
};

const addContact = async (body) => {
  const { phone } = body;
  const contacts = await listContacts();
  const normalizedPhone = phoneNumberFormater(phone);
  const newContact = { id: generate(), ...body, phone: normalizedPhone };
  contacts.push(newContact);
  await updateContactsList(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);
  console.log(idx);
  if (idx === -1) {
    return null;
  }
  const { phone } = body;
  const normalizePhone = phoneNumberFormater(phone);
  contacts[idx] = { id: contactId, ...body, phone: normalizePhone };
  await updateContactsList(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
