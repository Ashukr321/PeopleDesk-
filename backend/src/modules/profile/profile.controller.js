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

//updateProfileDetails 

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


export { createUserProfile,getProfileDetails,updateProfileDetails }