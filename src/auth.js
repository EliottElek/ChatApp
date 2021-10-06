import { AuthenticationError } from "apollo-server-errors";
import { User } from "./models";
import { SESS_NAME } from "./config";
export const attemptSignIn = async (email, password) => {
  const user = User.findOne({ email });
  await user;
  await user.clone();
  if (!user) {
    throw new AuthenticationError("Incorrect email.");
  }
  if (!await user.isPassword(password)) {
    throw new AuthenticationError("Incorrect password.");
  }
  return user;
};
const signedIn = (req) => req.session.userId;

export const checkSignedIn = (req) => {
  if (!signedIn(req)) {
    throw new AuthenticationError("You must be signed in.");
  }
};
export const checkSignedOut = (req) => {
  if (signedIn(req)) {
    throw new AuthenticationError("You You are already signed in.");
  }
};
export const signOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);
      res.clearCookie(SESS_NAME);
      resolve(true);
    });
  });
