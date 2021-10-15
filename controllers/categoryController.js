const express = require('express');
const rescue = require('express-rescue');

const isValid = require('../helpers/validateFields');
const { validateJWT } = require('../middlewares/authorization');
const categoryService = require('../services/categoryService');

const router = express.Router();

router.post('/', validateJWT, rescue(async (req, res) => {
  isValid.newCategory(req.body);

  const newCategory = await categoryService.create(req.body);

  res.status(201).json(newCategory);
}));

module.exports = router;