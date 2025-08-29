import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/Users.models.js";
import { Token } from "../models/Token.models.js";



const signupUser = asyncHandler(
    async (req, res) => {
        const { fullname, username, email, password } = req.body;

        if (!fullname || !username || !email || !password) {
            throw new ApiError(401, "All fields are required");
        }
        const user = await User.findOne({ email });

        if (user) {
            throw new ApiError(401, "User already exists");
        }

        const newUser = await User.create({
            fullname,
            username,
            email,
            password
        });

        const users = await User.findById(newUser._id).select("-password -__v -createdAt -updatedAt");

        res.status(201).json(
            new ApiResponse(201, "User created successfully", users)
        );

    }
)

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if ((!email && !username) || !password) {
        throw new ApiError(401, "All fields are required");
    }

    const emails = email?.toLowerCase().trim();
    const usernames = username?.toLowerCase().trim();

    // allow login via email OR username
    const user = await User.findOne({
        $or: [{ email: emails }, { username: usernames }]
    });

    if (!user) {
        throw new ApiError(401, "User does not exist");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const token = new Token({ userId: user._id });
    const accessToken = token.generateAccessToken(); 
    const refreshToken = token.generateRefreshToken(); 

    const userResponse = {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email
    };

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    };

    res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200, "User logged in successfully", { user: userResponse, accessToken, refreshToken })
        );
});


const logoutUser = asyncHandler(
    async (req, res) => {
        const { user } = req;

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        await Token.deleteMany({ userId: user._id });
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");


        res.status(200).json(
            new ApiResponse(200, "User logged out successfully")
        );
    }
);


export { signupUser, loginUser, logoutUser }