import express, {Request, Response, NextFunction} from 'express'
import mongoose from "mongoose";
import * as routes from './routes'
import {configs} from "./config";

function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
    console.log(`${request.method} ${request.path}`);
    next();
}

const app = express();
const port = configs.port

app.use(loggerMiddleware)
app.use(express.json())

routes.register(app)

app.listen( port, async () => {
    try {
        await mongoose.connect('mongodb://localhost/winmark', {}, (err) => {
            if (err) console.log(err);
            console.log('connected to DB')
        })
        console.log( `server started at http://localhost:${ port }` );
    } catch (e) {
        console.log(e)
    }
} );
