const { CardFactory, ActionTypes } = require('botbuilder');

const button = { type: ActionTypes.PostBack, value: 'menu', title: 'Back' };

const card = CardFactory.heroCard(
  'About Me',
  'I`m Restaurant finder, and I will help you to find the nearest restaurant',
  null,
  [button],
);

module.exports = card;
