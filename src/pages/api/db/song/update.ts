import connect from 'src/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Song from "src/database/models/Song";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            _id,
            userAddress,
            name,
            cover,
            songURL,
            playlistId,
            description,
            status
        } = req.body;
        if (_id && name && userAddress && cover && songURL && playlistId) {
            try {
                let savedSong = await Song.findOneAndUpdate({_id: _id}, {
                    userAddress: userAddress,
                    name: name,
                    cover: cover,
                    songURL: songURL,
                    playlistId: playlistId,
                    description: description,
                    status: status
                });
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