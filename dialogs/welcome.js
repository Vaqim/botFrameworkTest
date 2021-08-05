const menuCard = require('./cardSchemas/menu');

module.exports = [
  async (stepCtx) => {
    const userName = stepCtx.context.activity.from.name;

    await stepCtx.context.sendActivity(
      `Hello ${userName}! I'm Restaurant finder :)\nI will assist to find the restaurant for you!`,
    );
    await stepCtx.context.sendActivity({ attachments: [menuCard] });
    return stepCtx.endDialog();
  },
];
