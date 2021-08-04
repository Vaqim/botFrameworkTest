/* eslint-disable class-methods-use-this */
const { CardFactory, ActionTypes } = require('botbuilder');
const { ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs');

class AboutMeDialog extends ComponentDialog {
  constructor() {
    super('aboutme');

    this.addDialog(new WaterfallDialog('waterfallDialog', [this.placeInfo.bind(this)]));

    this.initialDialogId = 'waterfallDialog';
  }

  async placeInfo(stepCtx) {
    const button = { type: ActionTypes.PostBack, value: 'menu', title: 'Back' };

    const card = CardFactory.heroCard(
      'About Me',
      'I`m Restaurant finder, and i will help you to find the nearest restaurant',
      null,
      [button],
    );

    await stepCtx.context.sendActivity({ attachments: [card] });
    return stepCtx.endDialog();
  }
}

module.exports = AboutMeDialog;
