/* eslint-disable class-methods-use-this */
const { CardFactory, ActionTypes } = require('botbuilder');
const { ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs');

class PlaceInfoDialog extends ComponentDialog {
  constructor() {
    super('placeinfo');

    this.addDialog(new WaterfallDialog('waterfallDialog', [this.placeInfo.bind(this)]));

    this.initialDialogId = 'waterfallDialog';
  }

  async placeInfo(stepCtx) {
    const placeId = stepCtx.context.activity.value;

    const card = CardFactory.heroCard(`place info for ${placeId} id`, 'Place info lalala', null, [
      { type: ActionTypes.PostBack, value: 'menu', title: 'Menu' },
    ]);

    await stepCtx.context.sendActivity({ attachments: [card] });
    return stepCtx.endDialog();
  }
}

module.exports = PlaceInfoDialog;
