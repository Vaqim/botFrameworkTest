const { stepStorage } = require('../storages');

module.exports = [
  async (stepCtx) => {
    const stepData = await stepStorage.get(stepCtx.context);

    stepData.pop();

    if (!stepData.length) return stepCtx.replaceDialog('menu');

    await stepStorage.set(stepCtx.context, stepData);

    return stepCtx.replaceDialog(stepData[stepData.length - 1].name);
  },
];
