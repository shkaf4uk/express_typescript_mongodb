import {Request, Response} from 'express'
import axios from 'axios';
import {Types} from 'mongoose'
import {Photo} from '../schemas/photos.schema'
import {Album} from '../schemas/albums.schema'

interface IPhoto {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

class PhotoController {
    constructor() {
        this.loadPhotos = this.loadPhotos.bind(this)
    }

    async loadPhotos(req: Request, res: Response) {
        try {
            const photosData = await this.getPhotos()
            const albumsTitles = [...new Set(photosData.map(obj => obj.albumId))];
            const albums = albumsTitles.map(title => {
                return {
                    title,
                    owner: new Types.ObjectId(req.user._id)
                }
            })
            const userAlbums = await Album.insertMany(albums)

            const photos = photosData.map(photo => {
                const albumData = userAlbums.find(album => album.title === photo.albumId.toString())
                return {
                    owner: new Types.ObjectId(req.user._id),
                    albumId: new Types.ObjectId(albumData._id),
                    title: photo.title,
                    url: photo.url,
                    thumbnailUrl: photo.thumbnailUrl
                }
            })
            const result = await Photo.insertMany(photos, {ordered: true})
            res.status(200).json(result)
        } catch (e) {
            console.log(e)
        }
    }

    private async getPhotos(): Promise<IPhoto[]> {
        try {
            const {data} = await axios.get('https://jsonplaceholder.typicode.com/photos')
            return data
        } catch (e) {
            console.log(e)
        }
    }

}

export default new PhotoController()
