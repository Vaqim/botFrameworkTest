const { CardFactory } = require('botbuilder');

const { getMessageBackButton } = require('../../templates');

const card = CardFactory.heroCard(
  'Ooops..!',
  'It doesn`t seem valid zip code.\nYou can return to the main menu or try again.',
  null,
  [getMessageBackButton('Try Again', 'findCafe'), getMessageBackButton('Menu', 'menu')],
);

module.exports = card;
