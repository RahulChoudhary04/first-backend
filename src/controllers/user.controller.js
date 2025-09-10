import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

// method to generate access token and refresh token
const generateAccessTokenandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accesstoken = user.generateAccessToken()
        const refreshtoken = user.generateRefreshToken()

        user.refreshtoken = refreshtoken
        await user.save({validateBeforeSave: false})

        return {accesstoken, refreshtoken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong, while generating refresh and access tokens")
    }
}

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

    // step 1 getting user details
    const {username, email, fullname, password} = req.body
    // console.log("email: ",email);
    // console.log("Body :  ", req.body);

    // validation 
    if(
        [fullname, email, username, password].some( (field) => 
            field?.trim() === ""
        ) 
    ){
        throw new ApiError(400, "All fields are required")
    }

    // check if user already exists
    const existedUser = await User.findOne({
        $and: [
            { email },
            { username }
        ]
    })

    if(existedUser){
        throw new ApiError(409, "User already exists")
    }


    // step 3 - handle file uploads
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    // printing local paths of uploaded files just for my  reference
            // console.log("avatarLocalPath: ", avatarLocalPath);
            // console.log("coverImageLocalPath: ", coverImageLocalPath);

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }


    // step 4 - upload files on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    // print the urls just for my reference
            // console.log("avatar url: ", avatar);
            // console.log("coverImage url: ", coverImage);

    if(!avatar){
        throw new ApiError(400, "Avatar is required")
    }

    // step 5 - create user object - entry in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password
    })
    // user created or not
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken "
    )
    // step 6 - user created or not response
    if(!createdUser){
        throw new ApiError(500, "Something went wrong, while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

const loginUser = asyncHandler( async (req, res) => {
    // req body -> data
    // username or email
    // find user based on username or email
    // if user not found -> error
    // if user found -> compare password
    // access token and refresh token generate
    // send cookie 

    // taking data from req body
    const {username, email, password} = req.body
    // making check if any one of them is present or not
    if(!username || !email){
        throw new ApiError(400, "Username or email is required")
    }

    // finding user based on username or email
    const user = await User.findOne({
        $or: [{ username}, {email}]
    })

    // if user not found
    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    // if user found -> compare password
    const isPasswordValid = await user.isPasswordCorrect(password)

    // if password not valid
    if(!isPasswordValid){
        throw new ApiError(401, "Incorrect password")
    }

    // if password valid -> generate access token and refresh token

})

export {
    registerUser,
    loginUser

};