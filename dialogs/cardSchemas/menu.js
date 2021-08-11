const { CardFactory } = require('botbuilder');

const { getMessageBackButton } = require('../../templates');

const cardImage = {
  url: 'https://storage.googleapis.com/aciety.com/91/7b/b9b95e6d0a791484ab30e9dd8146.png',
  alt: 'This is image',
};

const buttons = [
  getMessageBackButton('Find Restaurant', 'findCafe'),
  getMessageBackButton('About Me', 'aboutMe'),
  getMessageBackButton('About Author', 'aboutAuthor'),
];

const card = CardFactory.heroCard('Menu', [cardImage], buttons);

module.exports = card;
