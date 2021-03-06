import Joi from "joi";
import mongoose from "mongoose";
const objectId = {
  type: "String",
  name: "string",
  base: Joi.string(),
  language: {
    objectId: "must be a valid object ID",
  },
  rules: {
    validate(params, value, state, options) {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return this.createError("string.objectId", {}, state, options);
      }
      return value;
    },
  },
};
export default Joi.extend(objectId);
