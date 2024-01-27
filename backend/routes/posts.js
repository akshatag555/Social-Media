const express = require("express");
const { createpost, likepost, deletepost, getpostoffollowing, updatepost, addcomment, deletecomment } = require("../controllers/posts");
const { isauth } = require("../middleware/auth");
const router = express.Router();
router.route("/post/upload").post(isauth, createpost);
router.route("/post/:id").get(isauth, likepost).put(isauth,updatepost).delete(isauth, deletepost);
router.route("/posts").get(isauth,getpostoffollowing)
router.route("/post/comment/:id").put(isauth,addcomment).delete(isauth,deletecomment)
module.exports = router;
