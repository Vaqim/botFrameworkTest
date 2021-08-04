const { CardFactory, ActionTypes } = require('botbuilder');

async function sendMenu(ctx) {
  const cardImage = {
    url: 'https://storage.googleapis.com/aciety.com/91/7b/b9b95e6d0a791484ab30e9dd8146.png',
    alt: 'This is image',
  };

  const buttons = [
    { type: ActionTypes.PostBack, value: 'placesFlow', title: 'Find Restaurant' },
    { type: ActionTypes.PostBack, value: 'aboutMe', title: 'About Me' },
    {
      type: ActionTypes.PostBack,
      value: 'aboutAuthor',
      title: 'About Author',
    },
  ];

  const card = CardFactory.heroCard('Menu', [cardImage], buttons);
  await ctx.sendActivity({ attachments: [card] });
}

// async function sendAboutMe(ctx) {
//   const button = { type: ActionTypes.PostBack, value: 'menu', title: 'Back' };

//   const card = CardFactory.heroCard(
//     'About Me',
//     'I`m Restaurant finder, and i will help you to find the nearest restaurant',
//     null,
//     [button],
//   );

//   await ctx.sendActivity({ attachments: [card] });
// }

// async function sendAboutAuthor(ctx) {
//   const button = { type: ActionTypes.PostBack, value: 'menu', title: 'Back' };

//   const card = CardFactory.heroCard(
//     'About Author',
//     'My author is Vadym Saiko - Node.js Intern in MOC',
//     null,
//     [button],
//   );

//   await ctx.sendActivity({ attachments: [card] });
// }

// async sendPlaceInfo(ctx) {}

module.exports = { sendMenu };
