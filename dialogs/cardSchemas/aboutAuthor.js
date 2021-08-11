const { CardFactory } = require('botbuilder');

const { getPostBackButton } = require('../../templates');

const card = CardFactory.heroCard(
  'About Author',
  'My author is Vadym Saiko - Node.js Intern in MOC',
  null,
  [getPostBackButton('Back', 'menu')],
);

module.exports = card;
