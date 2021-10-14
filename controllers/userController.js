const express = require('express');
const rescue = require('express-rescue');

const isValid = require('../helpers/validateFields');
const userService = require('../services/userService');

const router = express.Router();

router.post('/', rescue(async (req, res) => {
  isValid.newUser(req.body);
  
  const token = await userService.create(req.body);
  
  res.status(201).json({ token });
}));

module.exports = router;