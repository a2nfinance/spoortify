import connect from 'src/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Playlist from "src/database/models/Playlist";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            _id,
            userAddress,
            name,
            description,
            price,
            isPaid,
            cover,
            status
        } = req.body;
        if (name && userAddress && _id) {
            // Create new one and update
            // Need to create new only
            try {
                let updatedPlaylist = await Playlist.findOneAndUpdate({_id: _id}, {
                    name: name,
                    description: description,
                    price: price,
                    isPaid: isPaid,
                    cover: cover,
                    status
                })
                // Create new product
                return res.status(200).send(updatedPlaylist);
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