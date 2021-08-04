/* eslint-disable class-methods-use-this */
const { CardFactory, ActionTypes } = require('botbuilder');
const { ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs');

class AboutAuthorDialog extends ComponentDialog {
  constructor() {
    super('aboutauthor');

    this.addDialog(new WaterfallDialog('waterfallDialog', [this.placeInfo.bind(this)]));

    this.initialDialogId = 'waterfallDialog';
  }

  async placeInfo(stepCtx) {
    const button = { type: ActionTypes.PostBack, value: 'menu', title: 'Back' };

    const card = CardFactory.heroCard(
      'About Author',
      'My author is Vadym Saiko - Node.js Intern in MOC',
      null,
      [button],
    );

    await stepCtx.context.sendActivity({ attachments: [card] });
    return stepCtx.endDialog();
  }
}

module.exports = AboutAuthorDialog;
