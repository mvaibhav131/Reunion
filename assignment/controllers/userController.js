const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandalers");
const catchAsyncError= require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");


//register User
const registerUser=catchAsyncError(async(req,res)=>{
  const {name,email,password}= req.body;
  const user = await User.create({
    name,
    email,
    password,
     });
    sendToken(user,201,res);
});

//Login User
const loginUser= catchAsyncError(async(req,res,next)=>{

  const {email,password}=req.body;
  //checking if user has given password and email both
  if(!email || !password){
    return next(new ErrorHandler("Please Enter Email & Password",400))
  }
  const user= await User.findOne({email}).select("+password");
  
  if(!user){
    return next(new ErrorHandler("Invalid Email or Password",401))
  }
  const isPasswordMatched= await user.comparePassword(password);
  if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid Email or Password",401))
  }
  // const token= user.getJWTToken();
  // res.status(200).json({
  //   success:true,
  //   token,
  // })
  sendToken(user,200,res);
});

// Logout User
const logout= catchAsyncError(async(req,res,next)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  });
  res.status(200).json({
    success:true,
    message:"Logged Out Succesfully"
  });
});

//Get single User
const getSingleUser= catchAsyncError(async(req,res,next)=>{
    const user= await User.findById(req.params.id);
    if(!user){
      return next(new ErrorHandler("User does not exists",400));
    }
    res.status(200).json({
      success:true,
      user,
     });
  });
  

// Get Uer Details
const getUserDetails = catchAsyncError(async(req,res,next)=>{
  const user= await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user,
  });
});

//Update User Profile
const updateProfile = catchAsyncError(async(req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email,
  };
  // We will add cloudnary later
  const user= await User.findByIdAndUpdate(req.user.id ,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });
  res.status(200).json({
    success:true,
    user
  });
});

//Get all users
const getAllUsers= catchAsyncError(async(req,res,next)=>{

  const users= await User.find();
   res.status(200).json({
    success:true,
    users,
   });
});


//Delete User
const deleteUser=catchAsyncError(async(req,res,next)=>{
  const user= await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler("User does not exists",400));
  }
  await   user.remove();

  res.status(200).json({
    success:true,
    message:"User Deleted Successfully",
  });
});






module.exports={registerUser,loginUser,logout,deleteUser,getUserDetails,updateProfile,getAllUsers,getSingleUser}