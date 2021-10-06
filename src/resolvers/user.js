import { User } from "../models";
import { UserInputError } from "apollo-server-express";
import mongoose from "mongoose";
import { signUp, signIn } from "../schemas";
import * as Auth from "../auth";
export default {
  Query: {
    me: async (root, arg, { req }, info) => {
      Auth.checkSignedIn(req);
      const q = User.findById(req.session.userId);
      await q;
      return await q.clone();
    },
    users: async (root, arg, { req }, info) => {
      //TO DO auth, projection, pagination
      Auth.checkSignedIn(req);
      const q = User.find({});
      await q;
      return await q.clone();
    },
    user: async (root, arg, { req }, info) => {
      Auth.checkSignedIn(req);

      if (!mongoose.Types.ObjectId.isValid(arg.id)) {
        throw new UserInputError("not a valid user ID");
      }
      const q = User.findById(arg.id);
      await q;
      return await q.clone();
    },
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      //validation
      Auth.checkSignedOut(req);
      const { error } = signUp.validate(args);
      if (!error) {
        const user = await User.create(args);
        req.session.userId = user.id;
        return user;
      } else {
        console.log(error);
      }
    },
    signIn: async (root, args, { req }, info) => {
      const { userId } = req.session;
      if (userId) {
        return User.findById(userId);
      }
      const { error } = signIn.validate(args, { abortEarly: false });
      if (!error) {
        const user = await Auth.attemptSignIn(args.email, args.password);
        req.session.userId = user.id;
      } else {
        console.log(error);
      }
    },
    signOut: (root, args, { req, res }, info) => {
      Auth.checkSignedIn(req);
      return Auth.signOut(req, res);
    },
  },
  User: {
    chats: async(user, args, context, info) => {
      return await user.populate("chats").chats;
    },
  },
};
