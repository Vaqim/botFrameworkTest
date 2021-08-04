/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
const { ActivityHandler } = require('botbuilder');

const { handleMessage } = require('./handlers');
const { sendMenu } = require('./handlers/handlers');

class WelcomeBot extends ActivityHandler {
  constructor(conversationState) {
    super();

    this.conversationState = conversationState;
    this.dialogState = this.conversationState.createProperty('DialogState');

    this.onDialog(async (ctx, next) => {
      await this.conversationState.saveChanges(ctx, false);
      await next();
    });

    this.onMessage(async (ctx, next) => {
      // console.log(ctx.activity);

      await handleMessage(ctx, this.dialogState);

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
          await sendMenu(ctx);
        }

        await next();
      }
    });
  }

  async run(ctx) {
    await super.run(ctx);

    await this.conversationState.saveChanges(ctx);
  }
}

module.exports = WelcomeBot;
