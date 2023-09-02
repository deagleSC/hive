import Comment from "../models/Comment.js";
import { handleError } from "../error.js";
import User from "../models/User.js";
import Tweet from "../models/Tweet.js";

export const createComment = async (req, res, next) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    handleError(500, err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId === req.body.id) {
      await comment.deleteOne();
      res.status(200).json("Comment has been deleted");
    } else {
      handleError(500, err);
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const likeOrDislike = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment.likes.includes(req.body.id)) {
      await comment.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json("Comment has been liked");
    } else {
      await comment.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).json("Comment has been disliked");
    }
  } catch (err) {
    handleError(500, err);
  }
};

// export const getAllComments = async (req, res, next) => {
//   try {
//     const currentUser = await User.findById(req.params.id);
//     const userComments = await Comments.find({ userId: currentUser._id });
//     const followersTweets = await Promise.all(
//       currentUser.following.map((followerId) => {
//         return Tweet.find({ userId: followerId });
//       })
//     );

//     res.status(200).json(userTweets.concat(...followersTweets));
//   } catch (err) {
//     handleError(500, err);
//   }
// };

// export const getUserTweets = async (req, res, next) => {
//   try {
//     const userTweets = await Tweet.find({ userId: req.params.id }).sort({
//       createAt: -1,
//     });

//     res.status(200).json(userTweets);
//   } catch (err) {
//     handleError(500, err);
//   }
// };

    export const getTweetComments = async (req, res, next) => {
        try {
            const tweetComments = await Comment.find({tweetId: req.params.id}).sort(({
                createAt: -1,
            }));
            res.status(200).json(tweetComments)
        } catch (err) {
            handleError(500, err)
        }
    }

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    await comment.updateOne({ $set: { description: req.body.text } });
    res.status(200).json("comment updated");

  } catch (err) {
    next(err)
  }
}
