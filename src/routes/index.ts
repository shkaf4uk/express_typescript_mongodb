import express from "express";
import authMiddleware from "../middlewaree/authMiddleware";
import UserController from "../controllers/UserController";
import PhotoController from "../controllers/PhotoController";
import AlbumController from "../controllers/AlbumController";

export const register = (app: express.Application) => {

    app.post("/register", UserController.register);
    app.post("/login", UserController.login);

    app.post("/load-photos", authMiddleware, PhotoController.loadPhotos);
    app.get("/get-photos", PhotoController.getPhotos);

    app.delete("/delete-photo", authMiddleware, PhotoController.deletePhoto);

    app.delete("/delete-album", authMiddleware, AlbumController.deleteAlbum);
    app.patch('/change-album-title', authMiddleware, AlbumController.changeAlbumTitle)
};
