const { MessageFactory, ActionTypes } = require('botbuilder');

const { userProfile } = require('../storages');

const steps = [
  async (stepCtx) => stepCtx.prompt('nameInputPrompt', 'enter your name'),
  async (stepCtx) => {
    const name = stepCtx.result;

    await userProfile.set(stepCtx.context, { name });

    const profile = await userProfile.get(stepCtx.context);

    const cardActions = [
      {
        type: ActionTypes.MessageBack,
        title: 'Red',
        text: 'Red',
      },
      {
        type: ActionTypes.MessageBack,
        title: 'Yellow',
        text: 'Yellow',
      },
      {
        type: ActionTypes.MessageBack,
        title: 'Blue',
        text: 'Blue',
      },
    ];

    const reply = MessageFactory.suggestedActions(cardActions, 'What is the best color?');

    await stepCtx.context.sendActivity(
      `Hello ${profile.name}! I'm Restaurant finder :)\nI will assist to find the restaurant for you!`,
    );

    await stepCtx.context.sendActivity(reply);
  },

  async (stepCtx) => {
    if (stepCtx.context.activity.message.quick_reply)
      await stepCtx.context.sendActivity(`You choose ${stepCtx.context.activity.text} color`);
    return stepCtx.endDialog();
  },
];

module.exports = steps;
