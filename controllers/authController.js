import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import University from "../models/University.js";
import generateUniCode from "../utils/generateUniCode.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.json({
                success: false,
                message: "You are already registered, kindly login"
            });
        }

        const hashedPass = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPass,
            role
        });

        res.json({
            success: true,
            message: "User registered"
        })

    } catch (err) {
        console.error("Error at server : ", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Server Error : ", err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

export const registerUniversity = async (req, res) => {
    try {
        const { uniName, adminName, email, phone, location, password } = req.body;
        const uniExists = await University.findOne({ email });

        if (uniExists) {
            return res.json({
                success: false,
                message: "University already registered"
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const uniCode = await generateUniCode();
        console.log("Generated Code:", uniCode);
        const university = await University.create({
            uniName : uniName,
            adminName,
            email,
            phone,
            location,
            uniCode
        });

        await User.create({
            name: adminName,
            email: email,
            password : hashedPass,
            role : "uni_admin",
            university : university._id,
        });

        res.json({
            success: true,
            message: "University enrolled"
        });
    } catch (err) {
        console.error("Server Error : ", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}