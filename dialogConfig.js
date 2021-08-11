const defaultDialogConfig = {
  name: '',
  path: '',
  matches: [],
  intents: [],
};

const dialogs = [
  { name: 'menu', path: './dialogs/menu', matches: ['menu'], intents: ['menu'] },
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
    name: 'findCafe',
    path: './dialogs/placesFlow',
    matches: ['findcafe'],
    intents: ['findRestaurant'],
  },
  { name: 'placeInfo', path: './dialogs/placeInfo' },
  { name: 'welcome', path: './dialogs/welcome', matches: ['welcome'] },
].map((el) => ({
  ...defaultDialogConfig,
  ...el,
}));

module.exports = dialogs;
