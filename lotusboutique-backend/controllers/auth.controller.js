const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;
const Session = db.sessions;

exports.signup = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists. Please login.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      type: 'user'
    });
    res.send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.userID }, process.env.SECRET, {
      expiresIn: 10800 // 3 hours
    });

    // Create a session
    const expiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours from now
    await Session.create({
      userID: user.userID,
      expiresAt
    });

    res.status(200).send({
      id: user.userID,
      email: user.email,
      type: user.type, // Include user type in response
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};