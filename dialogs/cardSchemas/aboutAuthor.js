const { CardFactory } = require('botbuilder');

const { getMessageBackButton } = require('../../templates');

const card = CardFactory.heroCard(
  'About Author',
  'My author is Vadym Saiko - Node.js Intern in MOC',
  null,
  [getMessageBackButton('Back', 'menu')],
);

module.exports = card;
