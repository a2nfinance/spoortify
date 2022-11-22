import connect from 'src/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Playlist from "src/database/models/Playlist";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            userAddress,
            name,
            cover
        } = req.body;
        if (name && userAddress && cover) {
            // Create new one and update
            // Need to create new only
            try {
                let playlist = new Playlist(req.body);
                let savedPlaylist = await playlist.save();
                // Create new product
                return res.status(200).send(savedPlaylist);
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