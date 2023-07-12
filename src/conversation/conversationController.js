const conversationService = require('../conversation/conversationService');

const getDataControllerFn = async (req, res) => {
  try {
    const conversations = await conversationService.getDataFromDBService();

    // Extract the message and bot from each conversation
    const messages = conversations.map(conversation => ({
      message: conversation.message,
      bot: conversation.bot
    }));

    res.send({ status: true, data: messages });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { getDataControllerFn };
