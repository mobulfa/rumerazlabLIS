const Joi = require('joi');

module.exports = customerSchemaValidation = Joi.object({
    customer: Joi.object({
        casenumber: Joi.number(),
        name: Joi.string().required(),
        age: Joi.number().required().min(0),
        address: Joi.string().required(),
        contact: Joi.number().required().min(12)
    })
})