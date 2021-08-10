const Joi = require('joi');

require('dotenv').config();

const constants = require('./constants');

const configValidator = Joi.object({
  googleApiKey: Joi.string().required(),
  facebookPageAccessToken: Joi.string().required(),
  appId: Joi.string().required(),
  appPassword: Joi.string().required(),
  luisAppId: Joi.string().required(),
  luisAppKey: Joi.string().required(),
});

const config = {
  facebookPageAccessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  googleApiKey: process.env.GOOGLE_API_KEY,
  appId: process.env.APP_ID,
  appPassword: process.env.APP_PASSWORD,
  luisAppId: process.env.LUIS_APP_ID,
  luisAppKey: process.env.LUIS_APP_KEY,
};
const validatedConfig = configValidator.validate(config);

module.exports = { config: validatedConfig.value, constants };
