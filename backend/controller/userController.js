const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/userModel");
// const {z}=require("zod");

// const signUpZod = z.object({
//     firstName: z.string().trim().min(1, { message: "First name is required" }),
//     lastName: z.string().trim().min(1, { message: "Last name is required" }),
//     email: z.string().email({ message: "Invalid Email" }),
//     password: z.string().trim().min(6, { message: "Password should be at least 6 characters" }),
//     confirm_password: z.string().trim().min(6, { message: "Confirm password should be at least 6 characters" }),
//     role: z.string().optional(),
// });
exports.register = async (req, res) => {
    try {
        // signUpZod.parse(req.body);
        const { firstName, lastName, email, password, confirm_password, role } = req.body;

        // Check if password and confirm_password match
        if (password !== confirm_password) {
            return res.status(400).json({ message: "Confirm password does not match" });
        }

        // Hash the password and confirm_password
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const hashedConfirmPassword = await bcrypt.hash(confirm_password, 10);

        // Create a new user instance
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            confirm_password,
            role
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;

        // Find the user with the provided email
        const user = await User.findOne({ email });
       

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the provided password matches the stored hashed password
        const passwordMatch = await user.comparePassword(password);
        console.log(passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};