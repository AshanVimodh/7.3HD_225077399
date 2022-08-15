const express = require("express");
const router = express.Router();
const postServices = require("../services/PostServices.js");

router.post("/create", (req, res, next) => {
  postServices
    .createPost(req.body)
    .then((body) => res.status(200).send(body))
    .catch((err) => next(err));
});

router.get("/listing", (req, res, next) => {
  let { id } = req.query,
    data = {};
  if (id) {
    data["_id"] = id;
  }
  postServices
    .listing(data)
    .then((posts) => res.json(posts))
    .catch((err) => next(err));
});

router.put("/update/:id", (req, res, next) => {
  const { id } = req.params;
  const { text, like } = req.body;
  postServices
    .updatePost({ id, text, like })
    .then((post) => res.json(post))
    .catch((err) => next(err));
});

router.delete("/delete/:id", (req, res, next) => {
  postServices
    .deletePost(req.params.id, req.body)
    .then((quotes) => res.json(quotes))
    .catch((err) => next(err));
});

module.exports = router;
