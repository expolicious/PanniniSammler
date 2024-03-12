import { Schema, model } from "mongoose";

const userStickerSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        sticker: { type: Schema.Types.ObjectId, ref: 'Sticker', required: true },
        isOwned: { type: Boolean, default: false }
   });

export default model("UserSticker", userStickerSchema, "user_stickers");