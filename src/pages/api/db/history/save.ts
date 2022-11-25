import connect from 'src/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import History from "src/database/models/History";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            fromAddress,
            toAddress,
            transactionType,
            transactionHash,
            amount,
            description
        } = req.body;
        if (fromAddress && toAddress && transactionType && transactionHash && amount && description) {
            try {
                let history = new History(req.body);
                let savedHistory = await history.save();
                return res.status(200).send(savedHistory);
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