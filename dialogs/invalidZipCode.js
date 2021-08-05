const invalidZipCodeCard = require('./cardSchemas/invalidZipCode');

module.exports = [
  async (stepCtx) => {
    await stepCtx.context.sendActivity({ attachments: [invalidZipCodeCard] });
    return stepCtx.endDialog();
  },
];
