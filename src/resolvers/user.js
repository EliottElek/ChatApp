import { User } from "../models";
import { UserInputError } from "apollo-server-express";
import mongoose from "mongoose";
import { SignUp } from "../schemas";

export default {
  Query: {
    users: async (root, arg, context, info) => {
      const q = User.find({});
      await q;
      return await q.clone();
    },
    user: async (root, arg, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(arg.id)) {
        throw new UserInputError("not a valid user ID");
      }

      const q = User.findById(arg.id);
      await q;
      return await q.clone();
    },
  },
  Mutation: {
    signUp: (root, args, context, info) => {
      //validation
      // const validation = SignUp.validate(args);
      // console.log(validation);
      return User.create(args);
    },
  },
};
