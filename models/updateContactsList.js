const { writeFile } = require("fs").promises;
const filePath = require("./path");

const updateContactsList = async (newList) => {
  await writeFile(filePath, JSON.stringify(newList));
};

module.exports = updateContactsList;
