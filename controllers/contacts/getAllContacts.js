const { Contact } = require("../../models");
// const { NotFound } = require("http-errors");

const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite === "true") {
    const contacts = await Contact.find({ owner: _id, favorite }, "", {
      skip: skip,
      limit: Number(limit),
    }).populate("owner", " _id name email subscription");

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  }

  // if (favorite === "false") {
  //   throw new NotFound("лісом!");
  // }

  const contacts = await Contact.find({ owner: _id }, "", {
    skip: skip,
    limit: Number(limit),
  }).populate("owner", " _id name email subscription");

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAllContacts;
