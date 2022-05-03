"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const users_schema_1 = require("../schemas/users.schema");
const config_1 = require("../config");
class UserController {
    constructor() {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }
    async register(req, res) {
        try {
            const { email, login, password } = req.body;
            const validEmail = this.validation(email, true);
            if (!validEmail) {
                return res.status(400).send('Email is not valid');
            }
            const validLogin = this.validation(login);
            if (!validLogin) {
                return res.status(400).send('Login is not valid');
            }
            const existUser = await users_schema_1.User.findOne({ $or: [{ email }, { login }] });
            if (existUser) {
                return res.status(409).send('login or email is not unique');
            }
            const hashPassword = this.getHash(password);
            const user = new users_schema_1.User({
                login,
                email,
                password: hashPassword
            });
            await user.save();
            res.status(200).json(user);
        }
        catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    }
    async login(req, res) {
        try {
            const { email, login, password } = req.body;
            if (email && password) {
                const user = await users_schema_1.User.findOne({ email });
                console.log('userByEmail: ', user);
            }
            if (login && password) {
                const validLogin = this.validation(login);
                if (!validLogin)
                    return res.status(400).json({ message: 'Login is not valid' });
                const user = await users_schema_1.User.findOne({ login });
                console.log('userByLogin: ', user);
                if (!user) {
                    return res.status(400).send(`User with login ${login} not found`);
                }
                const validPassword = user.password === this.getHash(password);
                if (!validPassword) {
                    return res.status(400).send('Password not valid');
                }
                const token = jsonwebtoken_1.default.sign({ id: user._id.toString() }, config_1.configs.secret, { expiresIn: '12h' });
                return res.status(200).json({ token });
            }
        }
        catch (e) {
            console.log('e: ', e);
            res.status(500);
        }
    }
    checkLoginFields(field, password) {
    }
    getHash = (password) => (0, crypto_1.createHash)('md5').update(password).digest('hex');
    validation = (field, isEmail = false) => {
        if (!isEmail) {
            return validator_1.default.isLength(field, { min: 3, max: 50 }) && validator_1.default.isAlphanumeric(field);
        }
        return validator_1.default.isEmail(field, { allow_utf8_local_part: false });
    };
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map