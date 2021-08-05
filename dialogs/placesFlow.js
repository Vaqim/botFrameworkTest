const { AttachmentLayoutTypes } = require('botbuilder');

const googleApi = require('../services/googleApi');
const { generateCarousel } = require('../services/placesFlow');

module.exports = [
  async (stepCtx) => {
    return stepCtx.prompt('zipCodePrompt', 'Please enter your zip code');
  },
  async (stepCtx) => {
    const zipCode = stepCtx.result;

    const coordinates = await googleApi.getCoordinates(zipCode);
    if (!coordinates) return stepCtx.replaceDialog('invalidZipCode');

    const places = await googleApi.getNearestPlaces(coordinates);
    if (!places.length) return stepCtx.replaceDialog('invalidZipCode');

    // const carousel = generateCarousel(places);

    // await stepCtx.context.sendActivity('cards');

    const carousel = generateCarousel(places);

    await stepCtx.context.sendActivity({
      attachments: carousel,
      attachmentLayout: AttachmentLayoutTypes.Carousel,
    });

    return stepCtx.endDialog();
  },
];
