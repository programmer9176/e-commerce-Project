import { comparePassword, hashPassword } from "../Helpers/authhelpers.js";
import AuthModel from "../Models/AuthModel.js";
import JWT from "jsonwebtoken"

export const signupController = async (req, resp) => {
    console.log(req.body); // Log the incoming data
    try {
        const { name, email, password, phone, address, answer } = req.body; // Added 'answer' here

        // Validation
        if (!name) {
            return resp.json({ success: false, message: "Name is required" });
        }
        if (!email) {
            return resp.json({ success: false, message: "Email is required" });
        }
        if (!password) {
            return resp.json({ success: false, message: "Password is required" });
        }
        if (!phone) {
            return resp.json({ success: false, message: "Phone is required" });
        }
        if (!address) {
            return resp.json({ success: false, message: "Address is required" });
        }
        if (!answer) {
            return resp.json({ success: false, message: "Answer is required" });
        }

        // Check if user already exists
        const existUser = await AuthModel.findOne({ email });

        if (existUser) {
            return resp.json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Save the new user
        const registerUser = await new AuthModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            answer // Included 'answer' here as well
        }).save();

        return resp.json({
            success: true,
            message: "User created successfully",
            user: {
                name: registerUser.name,
                email: registerUser.email,
                phone: registerUser.phone,
                address: registerUser.address
            }
        });
    } catch (error) {
        return resp.status(500).json({ success: false, message: error.message });
    }
};



export const loginController = async (req, resp) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const existUser = await AuthModel.findOne({ email });

        if (!existUser) {
            return resp.json({
                success: false,
                message: "User does not exist",
            });
        }

        // Compare passwords
        const match = await comparePassword(password, existUser.password);
        if (!match) {
            return resp.json({
                success: false,
                message: "Password didn't match",
            });
        }

        // Generate JWT token
        const token = await JWT.sign({ _id: existUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return resp.json({
            success: true,
            message: "Login successful",
            user: {
                id: existUser._id,
                name: existUser.name,
                email: existUser.email,
                phone: existUser.phone,
                address: existUser.address,
                role: existUser.role
            },
            token,
        });

    } catch (error) {
        return resp.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

// forgot password


export const forgotPasswordController = async (req, resp) => {
    try {
        const { email, newpassword, answer } = req.body;

        if (!email) {
            return resp.json({ success: false, message: "Email is required" });
        }

        if (!newpassword) {
            return resp.json({ success: false, message: "New Password is required" });
        }

        if (!answer) {
            return resp.json({ success: false, message: "Answer is required" });
        }

        // Use findOne to check for existing user with email and answer
        const existUser = await AuthModel.findOne({ email, answer });

        if (!existUser) {
            return resp.json({
                success: false,
                message: "Invalid email or answer"
            });
        }

        // Hash the new password
        const hashed = await hashPassword(newpassword);

        // Update the password field in the database
        const user = await AuthModel.findByIdAndUpdate(existUser._id, { password: hashed });

        if (user) {
            return resp.json({
                success: true,
                message: "Password reset successfully"
            });
        } else {
            return resp.json({
                success: false,
                message: "Failed to reset password"
            });
        }

    } catch (error) {
        return resp.json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}



export const testController = (req, resp) => {
    resp.json("protected route");
}

export const isAdmin = async (req, resp, next) => {
    try {

        const user = await AuthModel.findById(req.user._id);

        if (user.role !== 1) {
            return resp.json({
                success: false,
                message: "UnAthorized access"
            });
        } else {
            next()
        }

    } catch (error) {
        return resp.json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}