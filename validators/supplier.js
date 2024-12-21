const Joi = require('joi');

const supplierSchema = Joi.object({
    name: Joi.string().min(3).max(50).required()
        .messages({
            'string.base': 'The name should be a text.',
            'string.empty': 'The name cannot be empty.',
            'string.min': 'The name should have at least 3 characters.',
            'string.max': 'The name should not exceed 50 characters.',
            'any.required': 'The name is a required field.'
        }),
    contactName: Joi.string().min(3).max(50).required()
        .messages({
            'string.base': 'The contact name should be a text.',
            'string.empty': 'The contact name cannot be empty.',
            'string.min': 'The contact name should have at least 3 characters.',
            'string.max': 'The contact name should not exceed 50 characters.',
            'any.required': 'The contact name is a required field.'
        }),
    contactEmail: Joi.string().email().required()
        .messages({
            'string.base': 'The contact email should be a text.',
            'string.email': 'The contact email must be a valid email address.',
            'string.empty': 'The contact email cannot be empty.',
            'any.required': 'The contact email is a required field.'
        }),
    phone: Joi.string().min(10).max(15).required()
        .messages({
            'string.base': 'The phone number should be a text.',
            'string.empty': 'The phone number cannot be empty.',
            'string.min': 'The phone number should have at least 10 characters.',
            'string.max': 'The phone number should not exceed 15 characters.',
            'any.required': 'The phone number is a required field.'
        }),
    address: Joi.string().min(10).max(200).required()
        .messages({
            'string.base': 'The address should be a text.',
            'string.empty': 'The address cannot be empty.',
            'string.min': 'The address should have at least 10 characters.',
            'string.max': 'The address should not exceed 200 characters.',
            'any.required': 'The address is a required field.'
        })
});

const validateSupplier = (data) => {
    return supplierSchema.validate(data, { abortEarly: false });
};

module.exports = validateSupplier;
