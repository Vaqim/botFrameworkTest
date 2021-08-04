/* eslint-disable class-methods-use-this */
const { CardFactory, ActionTypes } = require('botbuilder');
const { ComponentDialog, NumberPrompt, WaterfallDialog } = require('botbuilder-dialogs');

class PlacesFlowDialog extends ComponentDialog {
  constructor() {
    super('placesFlowDialog');

    this.addDialog(new NumberPrompt('zipCodePrompt', this.zipCodeValidator));

    this.addDialog(
      new WaterfallDialog('waterfallDialog', [
        this.zipCodeStep.bind(this),
        this.cardsStep.bind(this),
      ]),
    );

    this.initialDialogId = 'waterfallDialog';
  }

  async zipCodeStep(stepCtx) {
    console.log('zip step');
    return stepCtx.prompt('zipCodePrompt', 'Please enter your zip code');
  }

  async cardsStep(stepCtx) {
    console.log('card step');

    const zipCode = stepCtx.result;

    const cardImage = {
      url: 'https://storage.googleapis.com/aciety.com/91/7b/b9b95e6d0a791484ab30e9dd8146.png',
      alt: 'This is image',
    };

    const firstButtons = [
      {
        type: ActionTypes.MessageBack,
        text: 'placeInfo',
        value: 'firstPlaceID',
        title: 'Place info',
      },
      { type: ActionTypes.PostBack, value: 'aboutMe', title: 'About Me' },
    ];

    const secondButtons = [...firstButtons];
    secondButtons[0].value = 'secondPlaceID';

    const firstCard = CardFactory.heroCard(
      `First place with zip code ${zipCode}`,
      [cardImage],
      firstButtons,
    );

    const secondCard = CardFactory.heroCard(
      `Second place with zip code ${zipCode}`,
      [cardImage],
      secondButtons,
    );

    await stepCtx.context.sendActivity({ attachments: [firstCard, secondCard] });
    return stepCtx.endDialog();
  }

  async zipCodeValidator(ctx) {
    return (
      ctx.recognized.succeeded &&
      ctx.recognized.value > 0 &&
      ctx.recognized.value.toString().length === 5 &&
      ctx.recognized.value < 99950
    );
  }
}

module.exports = PlacesFlowDialog;
