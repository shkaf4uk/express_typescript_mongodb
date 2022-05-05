import {Schema, model, Types} from 'mongoose';
import {IPhoto} from '../interfaces/photo-create.interface';

const photoSchema = new Schema<IPhoto>({
        title: {type: String, required: true},
        url: {type: String, required: true},
        thumbnailUrl: {type: String, required: true},
        albumId: {type: Types.ObjectId, ref: 'albums'},
        owner: {type: Types.ObjectId, ref: 'users'}
    },
    {versionKey: false}
);

export const Photo = model<IPhoto>('photos', photoSchema)
