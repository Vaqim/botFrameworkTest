const { MessageFactory, ActionTypes } = require('botbuilder');

const { userProfile } = require('../storages');

const steps = [
  async (stepCtx) => stepCtx.prompt('nameInputPrompt', 'enter your name'),
  async (stepCtx) => {
    const name = stepCtx.result;

    await userProfile.set(stepCtx.context, { name });

    // const profile = await userProfile.get(stepCtx.context);

    const cardActions = [
      {
        type: ActionTypes.PostBack,
        title: 'Red',
        value: 'Red',
        // image: 'https://via.placeholder.com/20/FF0000?text=R',
        // imageAltText: 'R',
      },
      {
        type: ActionTypes.PostBack,
        title: 'Yellow',
        value: 'Yellow',
        // image: 'https://via.placeholder.com/20/FFFF00?text=Y',
        // imageAltText: 'Y',
      },
      {
        type: ActionTypes.PostBack,
        title: 'Blue',
        value: 'Blue',
        // image: 'https://via.placeholder.com/20/0000FF?text=B',
        // imageAltText: 'B',
      },
    ];

    const reply = MessageFactory.suggestedActions(cardActions, 'What is the best color?');

    await stepCtx.context.sendActivity(reply);

    // await stepCtx.context.sendActivity(
    //   `Hello ${profile.name}! I'm Restaurant finder :)\nI will assist to find the restaurant for you!`,
    // );
    return stepCtx.endDialog();
  },
];

module.exports = steps;
