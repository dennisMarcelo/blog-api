const express = require('express');
const rescue = require('express-rescue');

const isValid = require('../helpers/validateFields');
const loginService = require('../services/loginService');

const router = express.Router();

router.post('/', rescue(async (req, res) => {
  isValid.loginUser(req.body);
  
  const token = await loginService.login(req.body);

  res.status(200).json({ token });
}));

module.exports = router;