/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
const { LuisRecognizer } = require('botbuilder-ai');
const { ActivityHandler } = require('botbuilder');

const { luisAppId, luisAppKey } = require('./config').config;

const dialogConfig = require('./dialogConfig');
const { stepStorage } = require('./storages');

const recognizerOptions = {
  apiVersion: 'v3',
};

const recognizer = new LuisRecognizer(
  { applicationId: luisAppId, endpointKey: luisAppKey },
  recognizerOptions,
);

async function getIntent(ctx) {
  const luisResponse = await recognizer.recognize(ctx);

  const intentData = { intent: null, parameter: null };

  if (luisResponse.intents[luisResponse.luisResult.prediction.topIntent].score >= 0.8)
    intentData.intent = luisResponse.luisResult.prediction.topIntent;

  if (Object.keys(luisResponse.luisResult.prediction.entities).length)
    [intentData.parameter] =
      luisResponse.luisResult.prediction.entities[
        Object.keys(luisResponse.luisResult.prediction.entities)[0]
      ];

  return intentData;
}

async function addStep(dc, dialogName) {
  const stepData = await stepStorage.get(dc.context, []);

  if (dialogName === 'menu') return stepStorage.set(dc.context, []);
  if (dialogName === 'backStep') return false;
  if (
    stepData.length &&
    dialogName === stepData[stepData.length - 1].name &&
    dc.context.activity.value === stepData[stepData.length - 1].parameter
  )
    return false;

  const parameter = dc.context.activity.value;

  stepData.push({ name: dialogName, parameter });

  return stepStorage.set(dc.context, stepData);
}

async function matchDialog(dc, activity) {
  const { intent, parameter } = await getIntent(dc);

  const dialog = dialogConfig.find(
    (d) => d.matches.includes(activity.text.toLowerCase()) || d.intents.includes(intent),
  );

  if (dialog) {
    if (parameter) dc.context.activity.value = parameter;
    await dc.replaceDialog(dialog.name);
    await addStep(dc, dialog.name);
  }
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
      await matchDialog(dc, ctx.activity);

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
