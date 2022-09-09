const express= require("express");
const { loginUser, registerUser, logout, getSingleUser, getAllUsers, deleteUser } = require("../controllers/userController");
const {isAuthenticatedUser} = require("../middleware/auth");
const router=express.Router();

router.post("/register",registerUser);
router.post("/authenticate",loginUser);
router.get("/follow/:id",isAuthenticatedUser,getSingleUser);
router.get("/unfollow",isAuthenticatedUser,logout);
router.get("/user",isAuthenticatedUser,getAllUsers);
router.delete("/posts/:id",isAuthenticatedUser,deleteUser);


module.exports=router;