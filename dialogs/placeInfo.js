const { getPlaceDetails } = require('../services/googleApi');
const { generatePlaceInfoCard } = require('../services/placesFlow');

module.exports = [
  async (stepCtx) => {
    const placeDetails = await getPlaceDetails(stepCtx.context.activity.value);

    const card = generatePlaceInfoCard(placeDetails);

    await stepCtx.context.sendActivity({ attachments: [card] });
    return stepCtx.endDialog();
  },
];
