/* eslint-disable class-methods-use-this */
const { CardFactory, ActionTypes } = require('botbuilder');
const { ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs');

class MenuDialog extends ComponentDialog {
  constructor() {
    super('menu');

    this.addDialog(new WaterfallDialog('waterfallDialog', [this.placeInfo.bind(this)]));

    this.initialDialogId = 'waterfallDialog';
  }

  async placeInfo(stepCtx) {
    const cardImage = {
      url: 'https://storage.googleapis.com/aciety.com/91/7b/b9b95e6d0a791484ab30e9dd8146.png',
      alt: 'This is image',
    };

    const buttons = [
      { type: ActionTypes.PostBack, value: 'placesFlow', title: 'Find Restaurant' },
      { type: ActionTypes.PostBack, value: 'aboutMe', title: 'About Me' },
      {
        type: ActionTypes.PostBack,
        value: 'aboutAuthor',
        title: 'About Author',
      },
    ];

    const card = CardFactory.heroCard('Menu', [cardImage], buttons);

    await stepCtx.context.sendActivity({ attachments: [card] });
    return stepCtx.endDialog();
  }
}

module.exports = MenuDialog;
