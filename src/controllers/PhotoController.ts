import {Request, Response} from 'express'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import {createHash} from 'crypto'
import {User} from "../schemas/users.schema";
import {configs} from '../config'

class PhotoController {
    constructor() {}

    async loadPhoto (req: Request, res: Response) {
        res.send('ok!')
    }

}

export default new PhotoController()