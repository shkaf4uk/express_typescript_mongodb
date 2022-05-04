import {Request, Response} from 'express'
import axios from 'axios';
import {Types} from 'mongoose'
import {Photo} from '../schemas/photos.schema'
import {Album} from '../schemas/albums.schema'
import {IAlbum} from "../interfaces/ambul.interface";

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

    async loadPhotos(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.user._id
            const photosData = await this.getPhotosByUrl()
            const userAlbums = await this.addAlbums(photosData, userId)

            const photos = photosData.map(photo => {
                const albumData = userAlbums.find(album => album.title === photo.albumId.toString())
                return {
                    owner: new Types.ObjectId(userId),
                    albumId: new Types.ObjectId(albumData._id),
                    title: photo.title,
                    url: photo.url,
                    thumbnailUrl: photo.thumbnailUrl
                }
            })
            const result: any = await Photo.insertMany(photos)
            return res.status(200).json(result)
        } catch (e) {
            console.log(e)
            res.status(500).send()
        }
    }

    async getPhotos(req: Request, res: Response): Promise<Response> {
        try {
            const {ownerid, page, maxcount} = req.query
            const photosPerPage = 5
            const countSkip = photosPerPage * Number(page) - photosPerPage

            if (!ownerid) return res.status(403).json({message: 'Need params ownerid'})
            const photos = await Photo.find({
                owner: new Types.ObjectId(ownerid.toString())
            }).skip(countSkip).limit(Number(maxcount))
            return res.status(200).json(photos)
        } catch (e) {
            console.log(e)
            res.status(500).send()
        }
    }

    private async getPhotosByUrl(): Promise<IPhoto[]> {
        try {
            const {data} = await axios.get('https://jsonplaceholder.typicode.com/photos')
            return data
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    private async addAlbums (photos: IPhoto[], userId: string): Promise<IAlbum[]> {
        try {
            const albumsTitles = [...new Set(photos.map(obj => obj.albumId))];
            const albums = albumsTitles.map(title => ({title, owner: new Types.ObjectId(userId)}))
            return await Album.insertMany(albums)
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}

export default new PhotoController()
