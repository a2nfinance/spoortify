import connect from 'src/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import User from "src/database/models/User";

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
                return res.status(200).send(user);
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