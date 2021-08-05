const { CardFactory, ActionTypes } = require('botbuilder');

const button = { type: ActionTypes.PostBack, value: 'menu', title: 'Back' };

const card = CardFactory.heroCard(
  'About Author',
  'My author is Vadym Saiko - Node.js Intern in MOC',
  null,
  [button],
);

module.exports = card;
