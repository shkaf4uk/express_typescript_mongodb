import dotenv from "dotenv";
import express from 'express'
import mongoose from "mongoose";
import * as routes from './routes'

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT

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