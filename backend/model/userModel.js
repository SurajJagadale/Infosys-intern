const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    confirm_password: { type: String },
    role: { type: String, enum: ['caretaker', 'user'], default: 'user' }
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    
    try {
        const genSalt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, genSalt);
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
