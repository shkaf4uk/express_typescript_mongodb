import {ObjectId} from 'mongoose';

export interface IAlbum {
    _id: ObjectId,
    title: string,
    owner: ObjectId
}
