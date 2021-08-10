/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { WaterfallDialog, DialogSet } = require('botbuilder-dialogs');

const { appId, appPassword } = require('./config').config;
const { conversationState, userState, dialogState } = require('./storages');
const dialogConfig = require('./dialogConfig');
const prompts = require('./prompts');
const facebookMessengerSetup = require('./services/facebookSetup');

const Bot = require('./bot');

const adapter = new BotFrameworkAdapter({
  appId,
  appPassword,
});

adapter.onTurnError = async (context, error) => {
  console.error(`\n [onTurnError] unhandled error: ${error}`);

  await context.sendTraceActivity(
    'OnTurnError Trace',
    `${error}`,
    'https://www.botframework.com/schemas/error',
    'TurnError',
  );

  await context.sendActivity('The bot encountered an error or bug.');
  await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

const dialogs = new DialogSet(dialogState);

dialogConfig.forEach((dc) => {
  const dialog = require(dc.path);
  dialogs.add(new WaterfallDialog(dc.name, dialog));
});

prompts.forEach((p) => dialogs.add(p));

const bot = new Bot(conversationState, userState, dialogs);
facebookMessengerSetup();

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(process.env.port || process.env.PORT || 3978);
  console.log(`\n${server.name} listening to ${server.url}`);
  console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
  console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});

server.get('/', (req, res) => {
  res.json({ message: 'Hello from server' });
});

server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});
