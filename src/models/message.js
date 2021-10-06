import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  body: String,
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
  },
});
export default mongoose.model("Message", messageSchema);
