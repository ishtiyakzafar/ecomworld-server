const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(50).required()
        .messages({
            'string.base': 'Name should be a text.',
            'string.empty': 'Name cannot be empty.',
            'string.min': 'Name should have at least 3 characters.',
            'string.max': 'Name should not exceed 50 characters.',
            'any.required': 'Name is a required field.'
        }),
    email: Joi.string().email().required()
        .messages({
            'string.base': 'Email should be a text.',
            'string.email': 'Email must be a valid email address.',
            'string.empty': 'Email cannot be empty.',
            'any.required': 'Email is a required field.'
        }),
    // contact: Joi.string().pattern(/^[0-9]{10}$/).required()
    //     .messages({
    //         'string.pattern.base': 'Contact must be a valid 10-digit mobile number.',
    //         'string.empty': 'Contact cannot be empty.',
    //         'any.required': 'Contact is a required field.'
    //     }),
    password: Joi.string().min(6).required()
        .messages({
            'string.base': 'Password should be a text.',
            'string.empty': 'Password cannot be empty.',
            'string.min': 'Password should have at least 6 characters.',
            'any.required': 'Password is a required field.'
        }),
    role: Joi.string().valid('user', 'admin', 'supplier')
        .messages({
            'string.base': 'Role should be a text.',
            'string.empty': 'Role cannot be empty.',
            'any.only': 'Role must be either user, admin or supplier.'
        })
});

const validateUser = (data) => {
    return userSchema.validate(data, { abortEarly: false });
};

module.exports = validateUser;
