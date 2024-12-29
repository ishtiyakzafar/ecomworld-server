const Address = require("../models/address");


exports.createAddress = async (req, res) => {
    try {
        const address = new Address({ userId: req.user.id, ...req.body });
        await address.save();
        res.status(200).json({ message: "Address created successfully", address });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};