/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
const { ActivityHandler } = require('botbuilder');
const dialogConfig = require('./dialogConfig');

async function matchDialog(dc, activity) {
  const dialog = dialogConfig.find((d) => d.matches.includes(activity.text.toLowerCase()));

  if (dialog) await dc.replaceDialog(dialog.name);
}

class Bot extends ActivityHandler {
  constructor(conversationState, dialogs) {
    super();

    this.dialogs = dialogs;

    this.conversationState = conversationState;
    this.dialogState = this.conversationState.createProperty('DialogState');

    this.onDialog(async (ctx, next) => {
      await this.conversationState.saveChanges(ctx, false);
      await next();
    });

    this.onMessage(async (ctx, next) => {
      const dc = await this.dialogs.createContext(ctx);
      await dc.continueDialog();
      await matchDialog(dc, ctx.activity);

      if (!ctx.responded) await dc.beginDialog('menu');

      await next();
    });

    this.onDialog(async (ctx, next) => {
      await this.conversationState.saveChanges(ctx, false);
      await next();
    });

    this.onMembersAdded(async (ctx, next) => {
      const dc = await this.dialogs.createContext(ctx);
      await dc.continueDialog();
      // eslint-disable-next-line no-restricted-syntax
      for (const idx in ctx.activity.membersAdded) {
        if (ctx.activity.membersAdded[idx].id !== ctx.activity.recipient.id)
          await dc.replaceDialog('welcome');

        await next();
      }
    });
  }

  async run(ctx) {
    await super.run(ctx);

    await this.conversationState.saveChanges(ctx);
  }
}

module.exports = Bot;
