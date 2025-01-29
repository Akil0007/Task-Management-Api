const Joi = require("joi");

// common function to create a validation middleware
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ message: error.details.map((e) => e.message).join(", ") });
  }
  next();
};

//  registration validation schema
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  mobile: Joi.number().optional(),
  country: Joi.string().optional(),
  state: Joi.string().optional(),
  city: Joi.string().optional(),
  gender: Joi.string().valid("Male", "Female").optional(),
});

//  login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// task creation validation schema
const taskSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  desc: Joi.string().optional().max(200),
  startDate: Joi.date().required(),
  endDate: Joi.date().required().greater(Joi.ref("startDate")).messages({
    "date.greater": "endDate must be after startDate",
  }),
  status: Joi.string()
    .valid("Not Started", "In Progress", "Completed")
    .optional(),
});

// task update validation schema
const taskUpdateSchema = Joi.object({
  name: Joi.string().optional().min(3).max(50),
  desc: Joi.string().optional().max(200),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional().greater(Joi.ref("startDate")).messages({
    "date.greater": "endDate must be after startDate",
  }),
  status: Joi.string()
    .valid("Not Started", "In Progress", "Completed")
    .optional(),
});

module.exports = {
  validateRegister: validate(registerSchema),
  validateLogin: validate(loginSchema),
  validateTask: validate(taskSchema),
  validateTaskUpdate: validate(taskUpdateSchema),
};
