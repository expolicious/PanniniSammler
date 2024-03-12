import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type:String, required:true },
    birthdate: { type: Date, required: false },
    email: { type: String, required: true, unique: true},
    password: { type:String, required: true},
    albums: [{ type: Schema.Types.ObjectId, ref: 'Album'}],
    stickers: [{ type: Schema.Types.ObjectId, ref: 'Sticker'}],
  },
  { versionKey: false }
);

export default model("User", userSchema, "users");