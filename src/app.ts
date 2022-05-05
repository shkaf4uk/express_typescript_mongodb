import express from 'express';
import mongoose from 'mongoose';
import {IController} from './interfaces/controller.interface';

export class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: IController[], port: number) {
        this.app = express();
        this.port = port;

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private connectToTheDatabase() {
        mongoose.connect('mongodb://localhost/winmark', {}, (err) => {
            if (err) console.log(err);
            console.log('connected to DB')
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log( `server started at http://localhost:${this.port}` );
        });
    }
}
