const User = require('../models/user');
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "CUSTOMER" }).select("name email addresses ratings reviews createdAt emailVerified").sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user.id);

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) return res.status(400).json({ message: "Invalid credential" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await User.findByIdAndUpdate(req.user.id, { password: hashedPassword }, { new: true });

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

exports.updateDetailByCustomer = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.status(200).json({ message: "Profile updated successfully", user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
