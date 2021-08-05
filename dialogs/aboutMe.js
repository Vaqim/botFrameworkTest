const aboutMeCard = require('./cardSchemas/aboutMe');

module.exports = [
  async (stepCtx) => {
    await stepCtx.context.sendActivity({ attachments: [aboutMeCard] });
    return stepCtx.endDialog();
  },
];
