const { getPlaceDetails } = require('../services/googleApi');
const { generatePlaceInfoCard } = require('../services/placesFlow');
const { stepStorage } = require('../storages');

async function getStoredParameter(ctx) {
  const steps = await stepStorage.get(ctx);
  return steps[steps.length - 1].parameter;
}

module.exports = [
  async (stepCtx) => {
    const placeId = stepCtx.context.activity.value || (await getStoredParameter(stepCtx.context));

    if (!placeId) return stepCtx.replaceDialog('menu');

    const placeDetails = await getPlaceDetails(placeId);

    const card = generatePlaceInfoCard(placeDetails);

    await stepCtx.context.sendActivity({ attachments: [card] });
    return stepCtx.endDialog();
  },
];
