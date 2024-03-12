import express from 'express';
import { getStickers, stickerToDB } from '../controller/stickerController.js';
import { updateAlbum } from '../controller/albumController.js';

const router = express.Router();

router
  .route("/")
  .get(getStickers)
  .post(stickerToDB) 

router
  .route("/:id")
  .patch(updateAlbum)  
  
  export default router;