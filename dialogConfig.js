const defaultDialogConfig = {
  name: '',
  path: '',
  matches: [],
  intents: [],
};

const dialogs = [
  { name: 'menu', path: './dialogs/menu', matches: ['menu', 'home'], intents: ['menu'] },
  { name: 'backStep', path: './dialogs/backStep', matches: ['back'] },
  {
    name: 'userProfile',
    path: './dialogs/userProfile',
    matches: ['profile'],
  },
  {
    name: 'aboutMe',
    path: './dialogs/aboutMe',
    matches: ['aboutme'],
    intents: ['whoAreYou'],
  },
  {
    name: 'aboutAuthor',
    path: './dialogs/aboutAuthor',
    matches: ['aboutauthor'],
  },
  {
    name: 'invalidZipCode',
    path: './dialogs/invalidZipCode',
    matches: ['invalidzipcode'],
  },
  {
    name: 'placesFlow',
    path: './dialogs/placesFlow',
    matches: ['findcafe', 'findrestaurant'],
    intents: ['findRestaurant'],
  },
  { name: 'placeInfo', path: './dialogs/placeInfo', matches: ['placeinfo'] },
  { name: 'welcome', path: './dialogs/welcome' },
].map((el) => ({
  ...defaultDialogConfig,
  ...el,
}));

module.exports = dialogs;
