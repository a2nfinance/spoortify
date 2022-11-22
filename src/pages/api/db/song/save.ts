import connect from 'src/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import Song from "src/database/models/Song";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            userAddress,
            name,
            cover,
            songURL,
            playlistId
        } = req.body;
        if (name && userAddress && cover && songURL && playlistId) {
            // Create new one and update
            // Need to create new only
            try {
                let song = new Song(req.body);
                let savedSong = await song.save();
                // Create new product
                return res.status(200).send(savedSong);
            } catch (error) {
                console.log(error)
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