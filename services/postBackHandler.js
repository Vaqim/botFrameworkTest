const { addStep } = require('./backStep');

async function postBackHandler(dc) {
  const [dialog, parameter] = dc.context.activity.text.split('()PARAM:');

  dc.context.activity.value = parameter;
  await addStep(dc, dialog);
  return dc.replaceDialog(dialog);
}

module.exports = postBackHandler;
