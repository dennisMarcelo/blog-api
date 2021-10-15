const express = require('express');
const rescue = require('express-rescue');

const postService = require('../services/postService');
const isValid = require('../helpers/validateFields');
const { validateJWT } = require('../middlewares/authorization');

const router = express.Router();

router.post('/', validateJWT, rescue(async (req, res) => {
  isValid.newPost(req.body);

  const postCreated = await postService.create(req.body, req.user);

  res.status(201).json(postCreated);
}));

module.exports = router;