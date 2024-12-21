const Supplier = require('../models/supplier');
const validateSupplier = require('../validators/supplier');

// Create a new supplier
exports.createSupplier = async (req, res) => {
    const { error } = validateSupplier(req.body);
     if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const supplierExist = await Supplier.findOne({ email: req.body.email });
        if (supplierExist) return res.status(400).json({ message: 'Supplier with this email already exists' });
        const newSupplier = new Supplier(req.body);
        const supplier = await newSupplier.save();
        res.status(201).json(supplier);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a supplier by ID
exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a supplier
exports.updateSupplier = async (req, res) => {
    const { error } = validateSupplier(req.body);
     if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a supplier
exports.deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json({ message: 'Supplier deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
