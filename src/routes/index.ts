import express, {Request, Response} from "express";
import UserController from "../controllers/UserController";
import PhotoController from "../controllers/PhotoController";
import authMiddleware from "../middlewaree/authMiddleware";

export const register = (app: express.Application) => {

    app.post("/register", UserController.register);
    app.post("/login", UserController.login);

    app.post("/load-photos", authMiddleware, PhotoController.loadPhotos);

};
