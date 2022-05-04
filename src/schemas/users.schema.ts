import {Schema, model} from "mongoose";
import {IUser} from "../interfaces/user.interface";

const usersSchema = new Schema<IUser>({
        login: {type: String, required: true, minlength: 3, maxlength: 50, unique: true, trim: true},
        email: {type: String, required: true, unique: true, trim: true},
        password: {type: String, required: true, minlength: 6, maxlength: 100, trim: true},
        registerDate: {type: Date, default: Date.now}
    },
    {versionKey: false}
);

export const User = model<IUser>('users', usersSchema)
