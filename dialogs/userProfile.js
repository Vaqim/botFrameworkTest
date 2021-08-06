const { userProfile } = require('../storages');

const steps = [
  async (stepCtx) => stepCtx.prompt('nameInputPrompt', 'enter your name'),
  async (stepCtx) => {
    const name = stepCtx.result;

    await userProfile.set(stepCtx.context, { name });

    const profile = await userProfile.get(stepCtx.context);

    await stepCtx.context.sendActivity(
      `Hello ${profile.name}! I'm Restaurant finder :)\nI will assist to find the restaurant for you!`,
    );
    return stepCtx.endDialog();
  },
];

module.exports = steps;
