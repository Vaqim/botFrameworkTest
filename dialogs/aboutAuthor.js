const aboutAuthorCard = require('./cardSchemas/aboutAuthor');

module.exports = [
  async (stepCtx) => {
    await stepCtx.context.sendActivity({ attachments: [aboutAuthorCard] });
    return stepCtx.endDialog();
  },
];
