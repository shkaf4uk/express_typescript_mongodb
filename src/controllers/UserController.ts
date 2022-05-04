import {Request, Response} from 'express'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import {createHash} from 'crypto'
import {User} from "../schemas/users.schema";
import {configs} from '../config'

class UserController {
    constructor() {
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }

    async register (req: Request, res:Response): Promise<Response> {
        try {
            const {email, login, password} = req.body
            const validEmail = this.validateCredentials(email, null)
            if (!validEmail) return res.status(400).send('Email is not valid')

            const validLogin = this.validateCredentials(null, login)
            if (!validLogin) return res.status(400).send('Login is not valid')

            const existUser = await User.findOne({$or: [{email}, {login}]})
            if (existUser) return res.status(409).send('login or email is not unique')

            const user = new User({
                login,
                email,
                password: this.getHash(password)
            })
            await user.save()
            res.status(200).json(user)
        } catch (e) {
            console.log(e)
            res.status(500).json(e.message)
        }
    }

    async login (req: Request, res: Response): Promise<Response> {
        try {
            const {email, login, password} = req.body
            const emailOrLogin = this.validateCredentials(email, login)
            if (!emailOrLogin) return res.status(400).send(`${email ? 'Email ' : 'Login '} is not valid`)

            const user = await User.findOne({$or: [{email: emailOrLogin}, {login: emailOrLogin}]})
            if (!user) return res.status(400).send(`User not found`)

            const validPassword = user.password === this.getHash(password)
            if (!validPassword) return res.status(400).send('Password not valid')

            const token = jwt.sign({ _id: user._id.toString() }, configs.secret, { expiresIn: '12h' })
            return res.status(200).json({token})
        } catch (e) {
            console.log('e: ', e)
            res.status(500).json(e.message)
        }
    }

    private validateCredentials = (email: string, login: string): string => {
        if (email) return validator.isEmail(email, {allow_utf8_local_part: false}) && email

        return !validator.isEmail(login, {allow_utf8_local_part: false}) &&
            validator.isLength(login, {min: 3, max: 50}) &&
            validator.isAlphanumeric(login) && login
    }

    private getHash = (password: string): string => createHash('md5').update(password).digest('hex')
}

export default new UserController()
