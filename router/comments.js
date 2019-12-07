const express = require("express");
const db = require("../data/db");

const router = express.Router({
  mergeParams: true
});

router.get("/", async (req, res) => {
  let findComment = await db.findPostComments(req.params.id);
  try {
    if (findComment.length !== 0) {
      res.status(200).json(findComment);
    } else {
      res.status(404).json({ error: "The comment does not exist" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/", async (req, res) => {
  const date = new Date().toLocaleString().replace("/", "-");
  try {
    let commentBody = {
      text: req.body.text,
      post_id: req.params.id,
      created_at: date,
      updated_at: date
    };
    let commentCommand = await db.insertComment(commentBody);
    res.status(201).json(db.findCommentById(commentCommand));
  } catch (e) {
    res.status(500).json(e);
  }
});
module.exports = router;
