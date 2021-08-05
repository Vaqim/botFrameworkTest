const { ActionTypes } = require('botbuilder');

function getPostBackButton(title, value) {
  return {
    type: ActionTypes.PostBack,
    title,
    value,
  };
}

function getMessageBackButton(title, text, value) {
  return {
    type: ActionTypes.MessageBack,
    text,
    value,
    title,
  };
}

function getUrlButton(title, value) {
  return {
    type: ActionTypes.OpenUrl,
    title,
    value,
  };
}

module.exports = { getPostBackButton, getMessageBackButton, getUrlButton };
