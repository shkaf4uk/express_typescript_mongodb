import {App} from './app';
import {configs} from "./config";
import {AuthController} from './controllers/AuthController';
import {AlbumController} from './controllers/AlbumController';
import {PhotoController} from "./controllers/PhotoController";

const app = new App(
    [
        new AuthController(),
        new AlbumController(),
        new PhotoController(),
    ],
    configs.port
);

app.listen();
