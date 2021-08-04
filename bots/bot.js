/* eslint-disable class-methods-use-this */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
const { ActionTypes, ActivityHandler, CardFactory } = require('botbuilder');

const { handleMessage } = require('./handlers');

class WelcomeBot extends ActivityHandler {
  constructor(conversationState) {
    super();

    this.conversationState = conversationState;
    this.dialogState = this.conversationState.createProperty('DialogState');

    this.onDialog(async (context, next) => {
      await this.conversationState.saveChanges(context, false);
      await next();
    });

    this.onMessage(async (ctx, next) => {
      // console.log(ctx.activity);

      await handleMessage(ctx, this.dialogState);

      const text = ctx.activity.text.toLowerCase();

      switch (text) {
        case 'hello':
        case 'hi':
          await ctx.sendActivity(`You said "${ctx.activity.text}"`);
          break;
        case 'menu':
          await this.sendMenu(ctx);
          break;
        case 'aboutme':
          await this.sendAboutMe(ctx);
          break;
        case 'aboutauthor':
          await this.sendAboutAuthor(ctx);
          break;
        case 'findcafe':
          break;
        default:
          await ctx.sendActivity('What was that?');
      }

      await next();
    });

    this.onMembersAdded(async (ctx, next) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const idx in ctx.activity.membersAdded) {
        if (ctx.activity.membersAdded[idx].id !== ctx.activity.recipient.id) {
          const userName = ctx.activity.from.name;

          await ctx.sendActivity(
            `Hello ${userName}! I'm Restaurant finder 0.7 :)\nI will assist to find the restaurant for you!`,
          );
          await this.sendMenu(ctx);
        }

        await next();
      }
    });
  }

  async run(ctx) {
    await super.run(ctx);

    await this.conversationState.saveChanges(ctx);
  }

  async placesFlowDialog(ctx) {
    await ctx.beginDialog('placesFlowDialog');
  }

  // async sendPlaceInfo(ctx) {}

  async sendMenu(ctx) {
    const cardImage = {
      url: 'https://storage.googleapis.com/aciety.com/91/7b/b9b95e6d0a791484ab30e9dd8146.png',
      alt: 'This is image',
    };

    const buttons = [
      { type: ActionTypes.PostBack, value: 'findCafe', title: 'Find Restaurant' },
      { type: ActionTypes.PostBack, value: 'aboutMe', title: 'About Me' },
      {
        type: ActionTypes.PostBack,
        value: 'aboutAuthor',
        title: 'About Author',
      },
    ];

    const card = CardFactory.heroCard('Menu', [cardImage], buttons);
    await ctx.sendActivity({ attachments: [card] });
  }

  async sendAboutMe(ctx) {
    const button = { type: ActionTypes.PostBack, value: 'menu', title: 'Back' };

    const card = CardFactory.heroCard(
      'About Me',
      'I`m Restaurant finder, and i will help you to find the nearest restaurant',
      null,
      [button],
    );

    await ctx.sendActivity({ attachments: [card] });
  }

  async sendAboutAuthor(ctx) {
    const button = { type: ActionTypes.PostBack, value: 'menu', title: 'Back' };

    const card = CardFactory.heroCard(
      'About Author',
      'My author is Vadym Saiko - Node.js Intern in MOC',
      null,
      [button],
    );

    await ctx.sendActivity({ attachments: [card] });
  }
}

module.exports = WelcomeBot;
