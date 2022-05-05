import {Request, Response} from 'express'
import {Types} from 'mongoose'
import {Photo} from '../schemas/photos.schema'
import {Album} from '../schemas/albums.schema'

class AlbumController {
    constructor() {}

    async deleteAlbum(req: Request, res: Response): Promise<Response> {
        try {
            const {albumid} = req.body
            if (!albumid) return res.status(400).send('Not correct params')
            const albumsIds = albumid.split(',')
            const albums = await Album.deleteMany({
                owner: new Types.ObjectId(req.user._id),
                _id: {
                    $in: albumsIds
                }
            })
            const photos = await Photo.deleteMany({
                owner: new Types.ObjectId(req.user._id),
                albumId: {
                    $in: albumsIds
                }
            })
            return res.status(200).json({
                deletedAlbums: albums.deletedCount,
                deletedPhotos: photos.deletedCount
            })
        } catch (e) {
            console.log(e)
            res.status(500).send()
        }
    }

    async changeAlbumTitle(req: Request, res: Response): Promise<Response> {
        try {
            const {albumid, new_album_name} = req.body
            if (!albumid || !new_album_name) return res.status(400).send('Not correct params')

            const result = await Album.findOneAndUpdate({
                _id: new Types.ObjectId(albumid),
                owner: new Types.ObjectId(req.user._id)
            }, {
                title: new_album_name
            });
            return res.status(200).json({title: result.title})
        } catch (e) {
            console.log(e)
            res.status(500).send()
        }
    }
}

export default new AlbumController()
