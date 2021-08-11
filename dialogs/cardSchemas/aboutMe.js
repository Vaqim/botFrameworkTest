const { CardFactory } = require('botbuilder');

const { getMessageBackButton } = require('../../templates');

const card = CardFactory.heroCard(
  'About Me',
  'I`m Restaurant finder, and I will help you to find the nearest restaurant',
  null,
  [getMessageBackButton('Back', 'menu')],
);

module.exports = card;
