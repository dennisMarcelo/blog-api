const express = require('express');
const rescue = require('express-rescue');

const isValid = require('../helpers/validateFields');
const userService = require('../services/userService');
const { validateJWT } = require('../middlewares/authorization');

const router = express.Router();

router.post('/', rescue(async (req, res) => {
  isValid.newUser(req.body);
  
  const token = await userService.create(req.body);
  
  res.status(201).json({ token });
}));

router.get('/', validateJWT, rescue(async (req, res) => {
  const users = await userService.getAll();

  res.status(200).json(users);
}));

module.exports = router;