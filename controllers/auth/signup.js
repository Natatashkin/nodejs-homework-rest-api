const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { nodemailerSendEmail } = require("../../helpers");
const { v4 } = require("uuid");

const signup = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email ${email} already exist`);
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const newUser = new User({
    name,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Поздравляем с регистрацией",
    html: `<p>Для верификации пройдите по данной ссылке - localhost:3000/api/users/verify/${verificationToken}</p>`,
  };

  nodemailerSendEmail(mail);

  return res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
