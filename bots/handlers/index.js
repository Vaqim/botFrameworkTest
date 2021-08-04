const { DialogSet } = require('botbuilder-dialogs');

const dialogs = require('../dialogs');

const keyWords = {
  menu: 'menu',
  aboutme: 'aboutme',
  aboutauthor: 'aboutauthor',
  placesflow: 'placesflow',
  placeinfo: 'placeinfo',
};

async function handleMessage(ctx, accessor) {
  const dialogSet = new DialogSet(accessor);

  Object.values(dialogs).forEach((Dialog) => dialogSet.add(new Dialog()));

  const dialogContext = await dialogSet.createContext(ctx);
  const text = ctx.activity.text.toLowerCase();

  await dialogContext.continueDialog();

  if (!ctx.responded) {
    if (text in keyWords) {
      await dialogContext.beginDialog(text);
    } else await ctx.sendActivity('What was that?');
  }
}

module.exports = {
  handleMessage,
};
