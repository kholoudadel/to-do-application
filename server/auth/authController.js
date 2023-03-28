const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./authModel');

const authController = {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await userModel.create({ username, password: hashedPassword });
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.cookie('token', token, { httpOnly: true });
      res.status(201).json({ message: 'User created', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userModel.findOne({ username });
      if (!user) throw new Error('User not found');
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new Error('Invalid password');
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({ message: 'Logged in successfully', user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  async logout(req, res) {
    try {
      res.clearCookie('token');
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;
