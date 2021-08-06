const Joi = require('joi');

require('dotenv').config();

const constants = require('./constants');

const configValidator = Joi.object({
  googleApiKey: Joi.string().required(),
  appId: Joi.string().required(),
  appKey: Joi.string().required(),
});

const config = {
  googleApiKey: process.env.GOOGLE_API_KEY,
  appId: process.env.APP_ID,
  appKey: process.env.APP_KEY,
};
const validatedConfig = configValidator.validate(config);

module.exports = { config: validatedConfig.value, constants };
