import {ObjectId} from 'mongoose';

export interface IPhoto {
    title: string,
    url: string,
    thumbnailUrl: string,
    albumId: ObjectId,
    owner: ObjectId
}
