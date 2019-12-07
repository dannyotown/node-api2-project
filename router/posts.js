const express = require("express");
const comments = require("./comments");
const db = require("../data/db");

const router = express.Router();

router.use("/:id/comments", comments);

router.get("/", async (req, res) => {
  try {
    const getPosts = await db.find();
    res.status(200).json(getPosts);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getPostByID = await db.findById(req.params.id);
    if (getPostByID.length !== 0) {
      res.status(200).json(getPostByID);
    } else {
      res.status(404).json({ error: "There is no post with this ID" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/", async (req, res) => {
  const date = new Date().toLocaleString().replace("/", "-");
  const body = {
    title: req.body.title,
    contents: req.body.contents,
    created_at: date,
    updated_at: date
  };
  try {
    if (body) {
      const insertInDb = await db.insert(body);
      return res.status(200).json(insertInDb);
    } else {
      res.status(400).json({ error: "There was an issue adding the post." });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let getPostByID = await db.findById(req.params.id);
    if (getPostByID) {
      await db.remove(req.params.id);
      return res.status(200).json({ success: "Post Deleted Successfully!" });
    } else {
      res.status(404).json({ error: "The post could not be removed" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:id", async (req, res) => {
  const date = new Date()
    .toLocaleString()
    .split("")
    .replace(new RegExp("/", "g"), "-")
    .join("");
  const updateBody = {
    title: req.body.title,
    contents: req.body.contents,
    updated_at: date
  };
  try {
    let getPostByID = await db.findById(req.params.id);
    if (getPostByID) {
      await db.update(req.params.id, updateBody);
      res.status(200).json(getPostByID);
    } else {
      res.status(404).json({ error: "The post could not be updated" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
