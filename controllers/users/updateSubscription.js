const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const updetedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!updetedUser) {
    throw new NotFound(`Contact with id=${_id} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: updetedUser,
    },
  });
};

module.exports = updateSubscription;
