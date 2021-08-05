const menuCard = require('./cardSchemas/menu');

module.exports = [
  async (stepCtx) => {
    await stepCtx.context.sendActivity({ attachments: [menuCard] });
    return stepCtx.endDialog();
  },
];
