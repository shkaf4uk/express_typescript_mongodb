import {Schema, model, Types} from "mongoose";
import {IPhoto} from "../interfaces/photo.interface";

const photoSchema = new Schema<IPhoto>({
    title: {type: String, required: true},
    url: {type: String, required: true, unique: true},
    thumbnailUrl: {type: String, required: true, unique: true},
    albumId: {type: Types.ObjectId, ref: 'albums'},
    owner: {type: Types.ObjectId, ref: 'users'}
});

export const Photo = model<IPhoto>('photos', photoSchema)