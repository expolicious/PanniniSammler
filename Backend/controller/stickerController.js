import Sticker from "../models/stickerModel.js";

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
