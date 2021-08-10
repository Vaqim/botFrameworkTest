const axios = require('axios');

const { FACEBOOK_MESSENGER_PROFILE_ORIGIN } = require('../config').constants;
const { facebookPageAccessToken } = require('../config').config;

async function facebookMessengerSetup() {
  try {
    const res = await axios.post(
      `${FACEBOOK_MESSENGER_PROFILE_ORIGIN}access_token=${facebookPageAccessToken}`,
      {
        get_started: {
          payload: 'menu',
        },
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'postback',
                title: 'Main Menu',
                payload: 'Main Menu',
              },
              {
                type: 'postback',
                title: 'About Me',
                payload: 'About Me',
              },
              {
                type: 'postback',
                title: 'About Author',
                payload: 'About Author',
              },
            ],
          },
        ],
      },
    );

    console.log(res.data);
  } catch (error) {
    console.log('Facebook setup failed');
    // console.error(error);
  }
}

module.exports = facebookMessengerSetup;
