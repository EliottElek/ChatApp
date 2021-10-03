import { User } from "../models";
import { UserInputError } from "apollo-server-express";
import mongoose from "mongoose";
import { SignUp } from "../schemas";

export default {
  Query: {
    users: (root, arg, context, info) => {
      return User.find({});
    },
    user: (root, arg, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new UserInputError("not a valid user ID");
      }
      return User.findById(arg.id);
    },
  },
  Mutation: {
    signUp: (root, args, context, info) => {
      //validation
       SignUp.validate(args);
      return User.create(args);
    },
  },
};
