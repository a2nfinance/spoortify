import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let song = new Schema({
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
        required: true
    },
    songURL: {
        type: String,
        required: true
    },
    playlistId: {
        type: String,
        required: true
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
let Song = mongoose.model('Song', song);
mongoose.models = {};
export default Song;