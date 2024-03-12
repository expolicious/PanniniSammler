import Album from "../models/albumModel.js";

export const getAlbums = async (req, res, next) => {
  try {
    res.json(await Album.find().populate('users', 'stickers'));
  } catch (err) {
    next(err);
  }
}

export const addAlbum = async (req, res, next) => {
  try {
    const {albumname, numberofsticker, albumcover} = req.body;
// Neues Album erstellen
    const newAlbum = new Album({
      albumname, numberofsticker, albumcover
    });
// Album in die Datenbank speichern
    (await Album.create(newAlbum)).populate('users', 'stickers');
    res.status(201).json({ message: `Added Album successfully.` });
  } catch (err) {
    const error = new Error("Creating Album failed.");
    error.status = 500;
    next(err);
  }
}

export const addSticker = async (req, res, next) => {
  try {
    const {albumname, sticker001, sticker002} = req.body;
// Neuen Sticker erstellen
    const newSticker = new Sticker({
      albumname, sticker001, sticker002
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

export const updateAlbum = async (req, res, next) => {
  try {
    const updatedAlbum = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedAlbum);
  } catch (err) {
    next(err);
  }
}

export const deleteAlbum = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Album.deleteOne({ _id: id });
    res.status(200).json({ message: `Deleted album successfully.`});
  } catch (err) {
    const error = new Error("Deleting album failed.");
    error.status = 500;
    next(err);
  }
}
