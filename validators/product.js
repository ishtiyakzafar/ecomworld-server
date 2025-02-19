const Joi = require('joi');

// Define the validation schema for a product with custom messages
const productSchema = Joi.object({
    name: Joi.string().min(3).max(30).required()
        .messages({
            'string.base': 'The name should be a text.',
            'string.empty': 'The name cannot be empty.',
            'string.min': 'The name should have at least 3 characters.',
            'string.max': 'The name should not exceed 30 characters.',
            'any.required': 'The name is a required field.'
        }),
    price: Joi.number().positive().required()
        .messages({
            'number.base': 'The price should be a number.',
            'number.positive': 'The price must be a positive number.',
            'any.required': 'The price is a required field.'
        }),
    description: Joi.string().optional()
        .messages({
            'string.base': 'The description should be a text.'
        }),
    category: Joi.string().min(3).max(30).required()
        .messages({
            'string.base': 'The category should be a text.',
            'string.empty': 'The category cannot be empty.',
            'string.min': 'The category should have at least 3 characters.',
            'string.max': 'The category should not exceed 30 characters.',
            'any.required': 'The category is a required field.'
        }),
    stock: Joi.number().integer().min(0).required()
        .messages({
            'number.base': 'The stock should be a number.',
            'number.integer': 'The stock must be an integer.',
            'number.min': 'The stock cannot be negative.',
            'any.required': 'The stock is a required field.'
        }),
    // sku: Joi.string().min(3).max(10).required()
    //     .messages({
    //         'string.base': 'The SKU should be a text.',
    //         'string.empty': 'The SKU cannot be empty.',
    //         'string.min': 'The SKU should have at least 3 characters.',
    //         'string.max': 'The SKU should not exceed 10 characters.',
    //         'any.required': 'The SKU is a required field.'
    //     }),
    images: Joi.array().items(Joi.string().uri().message('Each image URL should be a valid URI.')).optional()
        .messages({
            'array.base': 'The images field should be an array.',
            'array.items': 'Each image URL should be a valid URI.',
        })
});

const validateProduct = (data) => {
    return productSchema.validate(data, { abortEarly: false });
};

module.exports = validateProduct;
