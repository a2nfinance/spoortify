import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let history = new Schema({
    fromAddress: {
        type: String,
        required: true,
    },
    toAddress: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
    },
    transactionHash: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },

});
let History = mongoose.model('History', history);
mongoose.models = {};
export default History;