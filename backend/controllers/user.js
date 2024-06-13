const Post = require("../models/Post");
const User = require("../models/User");
const { sendEmail } = require("../middleware/sendEmail");
const cloudinary = require("cloudinary");
const crypto = require("crypto");
exports.register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      // return res
      //   .status(400)
      //   .json({ success: false, message: "user already exists" });
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });
    const token = await user.generateToken();
    const option = {
      expires: new Date(Date.now() + 90 * 24 * 3600 * 1000),
      httpOnly: true,
    };
    res.status(201).cookie("token", token, option).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts followers following");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user doesnt exists",
      });
    }
    const ismatch = await user.matchPassword(password);
    if (!ismatch) {
      return res.status(400).json({
        success: false,
        message: "incorrect password",
      });
    }
    const token = await user.generateToken();
    const option = {
      expires: new Date(Date.now() + 90 * 24 * 3600 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, option).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged Out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.followuser = async (req, res) => {
  try {
    const usertofollow = await User.findById(req.params.id);
    const loggeduser = await User.findById(req.user._id);
    if (!usertofollow) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    if (loggeduser.following.includes(usertofollow._id)) {
      const ind = loggeduser.following.indexOf(usertofollow._id);
      loggeduser.following.splice(ind, 1);

      const ind2 = usertofollow.followers.indexOf(loggeduser._id);
      usertofollow.followers.splice(ind2, 1);
      await loggeduser.save();
      await usertofollow.save();
      return res.status(200).json({
        success: true,
        message: "User Unfollowed",
      });
    } else {
      usertofollow.followers.push(loggeduser._id);
      loggeduser.following.push(usertofollow._id);
      await loggeduser.save();
      await usertofollow.save();
      return res.status(200).json({
        success: true,
        message: "User Followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatepass = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { oldPass, newPass } = req.body;
    if (!oldPass || !newPass) {
      return res.status(400).json({
        success: false,
        message: "please enter old and new password",
      });
    }
    const isMatch = await user.matchPassword(oldPass);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old Password",
      });
    }
    user.password = newPass;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateprof = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, avatar } = req.body;
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteprofile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // .select("+password");
    //const pass = req.body.pass;
    const followers = user.followers;
    const followings = user.following;
    // if (!pass) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "enter password for confirmation",
    //   });
    // }
    // const ispassmatch = await user.matchPassword(pass);
    // if (!ispassmatch) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "incorrect password",
    //   });
    // }

    const posts = user.posts;
    const userid = user._id;
    // Set the cookie before sending the initial response
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    //removing avatar from cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    //deleting user
    await user.deleteOne();

    // Delete user posts
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await post.deleteOne();
    }
    //
    for (let i = 0; i < followers.length; i++) {
      const followerId = followers[i];
      if (followerId) {
        const follower = await User.findById(followerId);
        if (follower) {
          const ind = follower.following.indexOf(userid);
          if (ind !== -1) {
            follower.following.splice(ind, 1);
            await follower.save();
          }
        }
      }
    }

    for (let i = 0; i < followings.length; i++) {
      const followingId = followings[i];
      if (followingId) {
        const following = await User.findById(followingId);
        if (following) {
          const ind = following.followers.indexOf(userid);
          if (ind !== -1) {
            following.followers.splice(ind, 1);
            await following.save();
          }
        }
      }
    }
    //removing all comments of user
    const allPosts = await Post.find();
    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);
      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user === userid) {
          allPosts.comments.splice(j, 1);
        }
      }
      await post.save();
    }
    //removing all likes of user
    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);
      for (let j = 0; j < post.likes.length; j++) {
        if (post.likes[j] === userid) {
          allPosts.likes.splice(j, 1);
        }
      }
      await post.save();
    }
    // Send the final response outside the loop
    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.myprofile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers following"
    );
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getuserprof = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exists",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getallusers = async (req, res) => {
  try {
    const user = await User.find({
      name: {
        $regex: req.query.name,
        $options: "i",
      },
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: error.message,
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = [];
    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: error.message,
    });
  }
};
exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = [];
    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: error.message,
    });
  }
};
exports.forgetpass = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const resetpasstoken = user.getresetpasstoken();
    await user.save();
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetpasstoken}`;
    const msg = `Reset your password by clicking on the link below: \n \n ${resetUrl}`;
    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        msg,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      (user.resetpasstoken = undefined), (user.resetpassexpire = undefined);
      await user.save();
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.resetpassword = async (req, res) => {
  try {
    const resetpasstoken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetpasstoken,
      resetpassexpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }
    user.password = req.body.password;
    user.resetpasstoken = undefined;
    user.resetpassexpire = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
