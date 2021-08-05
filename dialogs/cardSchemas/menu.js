const { ActionTypes, CardFactory } = require('botbuilder');

const cardImage = {
  url: 'https://storage.googleapis.com/aciety.com/91/7b/b9b95e6d0a791484ab30e9dd8146.png',
  alt: 'This is image',
};

const buttons = [
  { type: ActionTypes.PostBack, value: 'findCafe', title: 'Find Restaurant' },
  { type: ActionTypes.PostBack, value: 'aboutMe', title: 'About Me' },
  {
    type: ActionTypes.PostBack,
    value: 'aboutAuthor',
    title: 'About Author',
  },
];

const card = CardFactory.heroCard('Menu', [cardImage], buttons);

module.exports = card;
