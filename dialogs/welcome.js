const { userProfile } = require('../storages');

module.exports = [
  async (stepCtx) => {
    const profile = await userProfile.get(stepCtx.context);

    const userName = profile ? profile.name : stepCtx.context.activity.from.name;

    await stepCtx.context.sendActivity(
      `Hello ${userName}! I'm Restaurant finder :)\nI will assist to find the restaurant for you!`,
    );
    return stepCtx.endDialog();
  },
];
