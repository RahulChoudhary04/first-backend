import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// jwt verification
export const verifyJWT = asyncHandler (async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        // if no token then throw error
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
        // decode token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // find user by id from decoded token
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            // 
            throw new ApiError(401, "Invalid access token")
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})