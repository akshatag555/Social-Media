const express=require("express");
const { register,login, followuser, logout, updatepass, updateprof, deleteprofile, myprofile, getuserprof, getallusers, forgetpass, resetpassword, getMyPosts, getUserPosts } = require("../controllers/user");
const {isauth}=require("../middleware/auth")
const router=express.Router();
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/follow/:id").get(isauth,followuser)
router.route("/update/password").put(isauth,updatepass)
router.route("/update/profile").put(isauth,updateprof)
router.route("/delete/me").delete(isauth,deleteprofile)
router.route("/me").get(isauth,myprofile)
router.route("/my/posts").get(isauth,getMyPosts)
router.route("/user/posts/:id").get(isauth,getUserPosts)
router.route("/user/:id").get(isauth,getuserprof)
router.route("/users").get(isauth,getallusers)
router.route("/forgot/password").post(forgetpass)
router.route("/password/reset/:token").put(resetpassword)
module.exports=router;