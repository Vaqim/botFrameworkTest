const Joi = require('joi');

require('dotenv').config();

const constants = require('./constants');

const configValidator = Joi.object({
  googleApiKey: Joi.string().required(),
});

const config = {
  googleApiKey: process.env.GOOGLE_API_KEY,
};
const validatedConfig = configValidator.validate(config);

module.exports = { config: validatedConfig.value, constants };
