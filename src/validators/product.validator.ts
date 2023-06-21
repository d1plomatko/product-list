import Joi from "joi";

const productValidator = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    count: Joi.number().min(1).max(1000).required(),
    imageUrl: Joi.string().required(),
    size: Joi.object({
        width: Joi.number().min(1).max(100000).required(),
        height: Joi.number().min(1).max(100000).required(),
    }),
    weight: Joi.string().min(1).max(1000000).required()
})

export {
    productValidator
}