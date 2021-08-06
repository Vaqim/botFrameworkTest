const { MemoryStorage, ConversationState, UserState } = require('botbuilder');

const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

const dialogState = conversationState.createProperty('dialogState');
const userProfile = userState.createProperty('userProfile');
const stepStorage = conversationState.createProperty('stepStorage');

module.exports = { conversationState, userState, dialogState, userProfile, stepStorage };
