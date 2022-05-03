"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const UserController_1 = __importDefault(require("../controllers/UserController"));
const register = (app) => {
    // const oidc = app.locals.oidc;
    app.get("/", (req, res) => {
        res.send("Hello world!!!");
    });
    app.post("/register", UserController_1.default.register);
    app.post("/login", UserController_1.default.login);
    app.get("/users", (req, res) => {
        res.send('ALL users!');
    });
    // define a secure route handler for the guitars page
    // app.get( "/guitars", oidc.ensureAuthenticated(), ( req: any, res ) => {
    //     res.render( "guitars" );
    // } );
};
exports.register = register;
//# sourceMappingURL=index.js.map