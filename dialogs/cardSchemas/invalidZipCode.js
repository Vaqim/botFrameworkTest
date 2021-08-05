const { CardFactory } = require('botbuilder');

const { getPostBackButton } = require('../../templates');

const card = CardFactory.heroCard(
  'Ooops..!',
  'It doesn`t seem valid zip code.\nYou can return to the main menu or try again.',
  null,
  [getPostBackButton('Try Again', 'findcafe'), getPostBackButton('Menu', 'menu')],
);

module.exports = card;
