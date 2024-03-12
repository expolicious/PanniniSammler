import express from 'express';
import { getUsers, regUser, updateUser, loginUser } from '../controller/userController.js';
import { getAlbums, addSticker, addAlbum, deleteAlbum } from '../controller/albumController.js';

const router = express.Router();

router
  .route("/")
  .get(getUsers)    //users alluser

router
  .route("/:id")
  .patch(updateUser)

router
  .route("/registration")
  .post(regUser)    //user registration

router
  .route("/login")
  .post(loginUser)

router
  .route("/login/album")
  .get(getAlbums)
  
router
  .route("/login/album/:id")
  .patch(addSticker)
  .delete(deleteAlbum)
  
  export default router;