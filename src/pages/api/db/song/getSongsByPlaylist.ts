import connect from 'src/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import Song from "src/database/models/Song";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {
            playlistId,
        } = req.body;

        if (playlistId) {
            try {
                let songs = await Song.find({
                    playlistId: playlistId
                })
                return res.status(200).send(songs);
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