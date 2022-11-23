import connect from 'src/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Song from "src/database/models/Song";
import Playlist from "src/database/models/Playlist";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {
            userAddress,
        } = req.body;
        if (userAddress) {
            try {
                let playlists = await Playlist.find({
                    userAddress: userAddress
                })
                if (playlists && playlists.length) {

                    let playlistIds = playlists.map(p => p._id);

                    let songs = await Song.find({playlistId: {$in: playlistIds}})

                    return res.status(200).send(songs);
                }
                return res.status(200).send([]);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        } else {
            res.status(422).send('data_incomplete');
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connect(handler);