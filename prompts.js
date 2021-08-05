const { NumberPrompt } = require('botbuilder-dialogs');

function zipCodeValidator(ctx) {
  return (
    ctx.recognized.succeeded &&
    ctx.recognized.value > 0 &&
    ctx.recognized.value.toString().length === 5 &&
    ctx.recognized.value < 99950
  );
}

const zipCodePrompt = new NumberPrompt('zipCodePrompt', zipCodeValidator);

module.exports = [zipCodePrompt];
