import Sticker from "../models/stickerModel.js";
import User from  "../models/userModel.js"

export const getStickers = async (req, res, next) => {
  try {
    res.json(await Sticker.find().populate('albums'));
  } catch (err) {
    next(err);
  }
}

export const stickerToDB = async (req, res, next) => {
  try {
    const {albums, stickernumber, path} = req.body;
// Neuen Sticker erstellen
    const newSticker = new Sticker({
      albums, stickernumber, path
    });
// Sticker in die Datenbank speichern
    await Sticker.create(newSticker);
    res.status(201).json({ message: `Added sticker successfully.` });
  } catch (err) {
    const error = new Error("Creating sticker failed.");
    error.status = 500;
    next(err);
  }
}

export const stickerToUser = async (req, res, next) => {
  try{
    const userId = req.params;
    const stickersId = req.body;

    const newSticker = new Sticker({stickersId})
    await User.updateOne(newSticker)
    res.status(201).json({message: 'added Sticker to user succesfully'})
  } catch (err){
    const error = new Error('Sticker to user failed');
    error.status = 500;
    next(err)
  }
}
