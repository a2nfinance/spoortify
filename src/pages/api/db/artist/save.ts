import connect from 'src/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import User from "src/database/models/User";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            userAddress,
            name,
        } = req.body;
        if (name && userAddress) {
            try {
                let user = new User(req.body);
                let savedUser = await user.save();
                return res.status(200).send(savedUser);
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