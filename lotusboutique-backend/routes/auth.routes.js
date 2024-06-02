module.exports = app => {
    const auth = require('../controllers/auth.controller');
    const router = require('express').Router();
  
    router.post('/signup', auth.signup);
    router.post('/login', auth.login);
  
    app.use('/api/auth', router);
  };
  