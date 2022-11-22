import connect from 'src/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
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
                return res.status(200).send(playlists);
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