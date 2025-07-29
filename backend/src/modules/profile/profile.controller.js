import User from "../user/user.model.js"
import Profile from "./profile.model.js"
import createError from 'http-errors'
// createUserProfile
const createUserProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Profile created successfully!"
    })
  } catch (error) {
    return next(error);
  }
}

// 2 getProfileDetails

const getProfileDetails  = async (req,res,next) => {
    try {
      return res.status(200).json({
        success:true,
        message:"fetch profile details"
      })
    } catch (error) {
      return next(error);
    }
}

// 3 updateProfileDetails 

const updateProfileDetails = async(req,res,next)=>{
  try {
    return res.status(200).json({
      success:true,
      message:"Profile details updated!"
    })
  } catch (error) {
    return next(error);
  }
}

// 4 profilePicUpdate
const profilePicUpdate = async(req,res,next)=>{
  try {
    return res.status(200).json({
      success:true,
      message:"profile pic uploaded successFully!"
    })
  } catch (error) {
    return next(error);
  }
}




export { createUserProfile,getProfileDetails,updateProfileDetails ,profilePicUpdate }