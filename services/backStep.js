const { stepStorage } = require('../storages');

async function addStep(dc, dialogName) {
  const stepData = await stepStorage.get(dc.context, []);

  if (dialogName === 'menu') return stepStorage.set(dc.context, []);
  if (dialogName === 'backStep') return false;
  if (
    stepData.length &&
    dialogName === stepData[stepData.length - 1].name &&
    dc.context.activity.value === stepData[stepData.length - 1].parameter
  )
    return false;

  const parameter = dc.context.activity.value;

  stepData.push({ name: dialogName, parameter });

  return stepStorage.set(dc.context, stepData);
}

module.exports = { addStep };
