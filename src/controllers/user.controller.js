import {asyncHandler} from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend 
    // validation lagana padega to check not empty
    // check if user already exists
    // files hai ya nhi , eg. avatar and image le rhe hai
    // upload them to cloudinary, check avatar iploaded or not as it is compulsory
    // create user object - create entry in db
    // remove password and refresh token from response
    // check if user created or not
    // return response


})



export {registerUser};