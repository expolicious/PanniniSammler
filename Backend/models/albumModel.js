import { Schema, model } from "mongoose";

const albumSchema = new Schema(
  {
    albumname: { type: String, required: true},
    numberofsticker: { type: Number, required: true },
    stickers: [{ type: Schema.Types.ObjectId, ref: 'Sticker'}],
    albumcover: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User'}]
  },
  { versionKey: false }
);

export default model("Album", albumSchema, "albums")