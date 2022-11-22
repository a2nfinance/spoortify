import connect from 'src/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Playlist from "src/database/models/Playlist";
import User from "../../../../database/models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {
            id,
        } = req.body;

        if (id) {
            try {
                let user = await User.findOne({
                    _id: id
                })
                if (user) {
                    let playlists = await Playlist.find({
                        userAddress: user.userAddress
                    })
                    return res.status(200).send(playlists);
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