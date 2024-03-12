import { Schema, model } from "mongoose";

const stickerSchema = new Schema(
  { 
    albums: [{ type: Schema.Types.ObjectId, ref: 'Album' }],
    //stickernumber: { type: Number, required: true },
    stickernumber: {type: Number, required: true},
    path: {type:String, required: true}
  },
  { versionKey: false }
);

export default model("Sticker", stickerSchema, "stickers")