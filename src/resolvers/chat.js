import { UserInputError } from "apollo-server-errors";
import { User, Chat } from "../models";
import { startChat } from "../schemas";
export default {
  Mutation: {
    startChat: async (root, args, { req }, info) => {
      const { userId } = req.session;
      const { title, userIds } = args;
      const { error } = startChat(userId).validate(args, { abortEarly: false });
      if (!error) {
        const idsFound = await User.where("_id").in(userIds).countDocuments();
        if (idsFound !== userIds.length) {
          throw new UserInputError("One or more userIds are invalid.");
        }
        userIds.push(userId);
        const chat = Chat.create({ title, users: userIds });
        await chat;
        await User.updateMany(
          { _id: { $in: userIds } },
          { $push: { chats: chat } }
        );
        return chat;
      } else {
        console.log(error);
      }
    },
  },
};
