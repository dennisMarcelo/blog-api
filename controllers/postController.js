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

router.get('/', validateJWT, rescue(async (req, res) => {
  const posts = await postService.findAll();

  res.status(200).json(posts);
}));

router.get('/:id', validateJWT, rescue(async (req, res) => {
  const { id } = req.params;

  const post = await postService.findById(id);

  res.status(200).json(post);
}));

module.exports = router;