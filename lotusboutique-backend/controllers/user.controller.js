const db = require('../models');
const User = db.users;

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    res.status(200).send({
      id: user.userID,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
