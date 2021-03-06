import mongoose, { Schema } from "mongoose";
import { hash, compare } from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: async (email) =>
          (await User.where({ email }).countDocuments()) === 0,
        message: ({ value }) => `Email ${value} has already been taken.`,
      },
    },
    username: {
      type: String,
      validate: {
        validator: async (username) =>
          (await User.where({ username }).countDocuments()) === 0,
        message: ({ value }) => `Username ${value} has already been taken.`,
      },
    },
    chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
    name: String,
    password: String,
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await hash(this.password, 10);
    } catch (err) {
      next(err);
    }
  }
  next();
});
userSchema.static.doesntExist = async function (options) {
  return (await this.where(options).countDocuments) === 0;
};

userSchema.methods.isPassword = async function (password) {
  return await compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
