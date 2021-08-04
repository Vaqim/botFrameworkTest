const { DialogSet } = require('botbuilder-dialogs');

const PlacesFlowDialog = require('../dialogs');

async function handleMessage(context, accessor) {
  const dialogSet = new DialogSet(accessor);

  dialogSet.add(new PlacesFlowDialog());

  const dialogContext = await dialogSet.createContext(context);
  await dialogContext.continueDialog();

  if (!context.responded) await dialogContext.beginDialog('placesFlowDialog');
}

module.exports = {
  handleMessage,
};
