/* eslint-disable camelcase */
const { stringify } = require('querystring');
const { CardFactory } = require('botbuilder');

const { googleApiKey } = require('../config').config;
const { GOOGLE_MAP_LINK, GOOGLE_STATIC_MAP_LINK } = require('../config').constants;
const templates = require('../templates');

function getStaticMapLink({ lat, lng }) {
  return `${GOOGLE_STATIC_MAP_LINK}${stringify({
    center: `${lat},${lng}`,
    zoom: 16,
    size: '300x300',
    markers: `color:green|size:mid|${lat},${lng}`,
    key: googleApiKey,
  })}`;
}

function getMapLink(address, placeId) {
  return `${GOOGLE_MAP_LINK}${stringify({ query: address, query_place_id: placeId })}`;
}

function getShortInfo(address, openingHours) {
  return openingHours
    ? `${address}\n\nNow ${openingHours.open_now ? 'OPENED' : 'CLOSED'}`
    : address;
}

function generateCarousel(data) {
  const cards = data.map((place) => {
    return CardFactory.heroCard(
      place.name,
      getShortInfo(place.vicinity, place.opening_hours),
      [getStaticMapLink(place.geometry.location)],
      [
        templates.getUrlButton('View On Map', getMapLink(place.vicinity, place.place_id)),
        templates.getPostBackButton('Place Info', `placeInfo()PARAM:${place.place_id}`),
        templates.getPostBackButton('Menu', 'menu'),
      ],
    );
  });

  return cards;
}

function generatePlaceInfoCard(place) {
  const { name, formatted_address } = place;
  const phone = place.international_phone_number;
  const openingHours = place.opening_hours;

  const phoneString = phone ? `\n\nPhone: ${phone}` : '';
  let timetableString = '';

  if (openingHours) {
    timetableString = timetableString.concat(
      `\n\n Now ${openingHours.open_now ? 'OPENED' : 'CLOSED'}`,
    );
    if (openingHours.weekday_text)
      openingHours.weekday_text.forEach((e) => {
        timetableString = timetableString.concat(`\n\n${e}`);
      });
  }

  const textMessage = `${name}${formatted_address}${phoneString}${timetableString}`;

  return templates.fbButtonsTemplate(textMessage, {
    title: 'Menu',
    payload: 'menu',
    type: 'postback',
  });

  // return CardFactory.heroCard(name, textMessage, null, [
  //   templates.getPostBackButton('Menu', 'menu'),
  // ]);
}

module.exports = {
  getStaticMapLink,
  getMapLink,
  getShortInfo,
  generateCarousel,
  generatePlaceInfoCard,
};
