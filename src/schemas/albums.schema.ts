import {Schema, model, Types} from "mongoose";
import {IAlbum} from "../interfaces/ambul.interface";

const albumSchema = new Schema<IAlbum>({
        title: {type: String, required: true},
        owner: {type: Types.ObjectId, ref: 'users'}
    },
    {versionKey: false}
);

export const Album = model<IAlbum>('albums', albumSchema)

