const { MemoryStorage, ConversationState, UserState } = require('botbuilder');

const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

const userProfile = userState.createProperty('userProfile');

module.exports = { conversationState, userState, userProfile };
