import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createComment,
  deleteComment,
  likeOrDislike,
  editComment,
  getTweetComments

} from "../controllers/comment.js";

const router = express.Router();

// Create a Comment
router.post("/", createComment);

// Delete a Comment
router.delete("/delete/:id", deleteComment);

// Like or Dislike a Comment
router.put("/:id/like", likeOrDislike);

//edit Comment
router.put("/edit/:id", editComment);

//get tweet Comments
router.get("/getTweetComments/:id", getTweetComments)

export default router;

