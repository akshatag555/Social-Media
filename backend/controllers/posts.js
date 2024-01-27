const Post = require("../models/Post");
const User = require("../models/User");
exports.createpost = async (req, res) => {
  try {
    const newpostdata = {
      caption: req.body.caption,
      image: {
        public_id: "req.body.public_id",
        url: "req.body.url",
      },
      owner: req.user._id,
    };
    const newpost = await Post.create(newpostdata);
    const user = await User.findById(req.user.id);
    user.posts.push(newpost._id);
    await user.save();
    res.status(201).json({
      success: true,
      post: newpost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deletepost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: true,
        message: "Post Not Found",
      });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    await post.deleteOne();
    const user = await User.findById(req.user._id);
    const ind = user.posts.indexOf(req.params.id);
    user.posts.splice(ind, 1);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "post deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatepost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const { newcaption } = req.body;
    post.caption = newcaption;
    await post.save();
    res.status(200).json({
      success: true,
      message: "caption updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.likepost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }
    if (post.likes.includes(req.user._id)) {
      const ind = post.likes.indexOf(req.user._id);
      post.likes.splice(ind, 1);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getpostoffollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addcomment = async (req, res) => {
  try {
    const cmnt = req.body.comment;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }
    let cmntind = -1;
    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        cmntind = index;
      }
    });
    if (cmntind !== -1) {
      post.comments[cmntind].comment = req.body.comment;
      await post.save();
      return res.status(200).json({
        success: true,
        message: "comment updated",
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: cmnt,
      });

      await post.save();
      return res.status(200).json({
        success: true,
        message: "comment added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deletecomment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }
    if (post.owner.toString() === req.user._id.toString()) {
      if(req.body.commentid==undefined){
        return res.status(400).json({
          success:false,
          message:"commentid needed"
        })
      }
      let x=false;
      post.comments.forEach((item, index) => {
        
        if (item.user.toString() === req.body.commentid.toString()) {
          x=true;
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      if(x){return res.status(200).json({
        success:true,
        message:"Selected Comment deleted"
      })
    }
    else{
      return res.status(404).json({
        success:false,
        message:"Comment not found"
      })
    }
    } else {
      let x = false;
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          x = true;
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      if (x)
        return res.status(200).json({
          success: true,
          message: "Comment deleted",
        });
      else {
        return res.status(404).json({
          success: false,
          message: "your comment doesnt exist",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
