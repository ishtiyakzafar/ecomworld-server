const Address = require("../models/address");


exports.createAddress = async (req, res) => {
    try {
        const address = new Address({ userId: req.user.id, ...req.body });
        await address.save();
        res.status(200).json({ message: 'Address added successfully', address });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.getAddresses = async (req, res) => {
    try {
        const result = await Address.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.getAddressById = async (req, res) => {
    try {
        const result = await Address.findById(req.params.id);
        if (!result) return res.status(400).json({ message: "Address not found" });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        const result = await Address.findByIdAndDelete(req.params.id);
        if (!result) return res.status(400).json({ message: "Address not found" });

        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.updateAddress = async (req, res) => {
    try {
        const result = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!result) return res.status(400).json({ message: "Address not found" });

        res.status(200).json({ message: "Address updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};