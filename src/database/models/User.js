import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let user = new Schema({
    userAddress: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    cover: {
        type: String,
        required: false
    },
    status: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    countView: {
        type: Number,
        required: true,
        default: 0
    }
});
let User = mongoose.model('User', user);
mongoose.models = {};
export default User;