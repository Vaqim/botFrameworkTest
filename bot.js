/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
const { LuisRecognizer } = require('botbuilder-ai');
const { ActivityHandler } = require('botbuilder');

const { luisAppId, luisAppKey } = require('./config').config;

const dialogConfig = require('./dialogConfig');
const { addStep } = require('./services/backStep');
const postBackHandler = require('./services/postBackHandler');

const recognizerOptions = {
  apiVersion: 'v3',
};

const recognizer = new LuisRecognizer(
  { applicationId: luisAppId, endpointKey: luisAppKey },
  recognizerOptions,
);

async function getIntent(ctx) {
  const luisResponse = await recognizer.recognize(ctx);

  if (luisResponse.intents[luisResponse.luisResult.prediction.topIntent].score >= 0.8)
    return luisResponse.luisResult.prediction.topIntent;
  return null;
}

async function matchDialog(dc) {
  const { activity } = dc.context;

  if (activity.channelData.postBack || activity.channelData.postback) return postBackHandler(dc);

  const intent = await getIntent(dc);

  const dialog = dialogConfig.find(
    (d) => d.matches.includes(activity.text.toLowerCase()) || d.intents.includes(intent),
  );

  if (dialog) {
    await dc.replaceDialog(dialog.name);
    return addStep(dc, dialog.name);
  }
  return false;
}

class Bot extends ActivityHandler {
  constructor(conversationState, userState, dialogs) {
    super();

    this.dialogs = dialogs;
    this.userState = userState;
    this.conversationState = conversationState;

    this.dialogState = this.conversationState.createProperty('DialogState');

    this.onDialog(async (ctx, next) => {
      await this.conversationState.saveChanges(ctx, false);
      await next();
    });

    this.onMessage(async (ctx, next) => {
      const dc = await this.dialogs.createContext(ctx);

      await dc.continueDialog();
      await matchDialog(dc);

      if (!ctx.responded) await dc.beginDialog('menu');

      await next();
    });

    this.onDialog(async (ctx, next) => {
      await this.conversationState.saveChanges(ctx, false);
      await this.userState.saveChanges(ctx, false);

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
    await this.userState.saveChanges(ctx);
  }
}

module.exports = Bot;
