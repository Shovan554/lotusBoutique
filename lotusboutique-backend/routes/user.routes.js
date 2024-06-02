
const verifyToken = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

module.exports = app => {
  const router = require('express').Router();

  router.get('/profile', verifyToken, userController.getUserProfile);

  app.use('/api/user', router);
};
