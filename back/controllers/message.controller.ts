import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
export const messageSend = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversion = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversion) {
      conversion = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversion.messages.push(newMessage._id);
    }

    await Promise.all([conversion.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatid } = req.params;
    const senderId = req.user._id;

    let conversion = await Conversation.findOne({
      participants: { $all: [senderId, userToChatid] },
    }).populate("messages");

    if (!conversion) {
      return res.status(200).json([]);
    }

    const messages = conversion.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
