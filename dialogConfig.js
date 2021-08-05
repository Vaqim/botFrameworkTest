const defaultDialogConfig = {
  name: '',
  path: '',
  matches: [],
  intents: [],
};

const dialogs = [
  { name: 'menu', path: './dialogs/menu', matches: ['menu', 'home'] },
  {
    name: 'aboutMe',
    path: './dialogs/aboutMe',
    matches: ['aboutme'],
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
  },
  { name: 'placeInfo', path: './dialogs/placeInfo', matches: ['placeinfo'] },
  { name: 'welcome', path: './dialogs/welcome' },
].map((el) => ({
  ...defaultDialogConfig,
  ...el,
}));

module.exports = dialogs;
