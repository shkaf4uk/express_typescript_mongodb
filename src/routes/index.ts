import express, {Request, Response} from "express";
import UserController from "../controllers/UserController";

export const register = (app: express.Application) => {
    // const oidc = app.locals.oidc;

    app.get("/", (req: Request, res: Response) => {
        res.send("Hello world!!!");
    });

    app.post("/register", UserController.register);
    app.post("/login", UserController.login);

    app.get("/users", (req: Request, res: Response) => {
        res.send('ALL users!')
    });

    // define a secure route handler for the guitars page
    // app.get( "/guitars", oidc.ensureAuthenticated(), ( req: any, res ) => {
    //     res.render( "guitars" );
    // } );
};