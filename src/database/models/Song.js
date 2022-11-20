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
    cover: {
        type: String,
        required: true
    },
    isPaidToListen: {
        type: Boolean,
        required: false
    },
    freeVersionURL: {
        type: String,
        required: true
    },
    fullVersionURL: {
        type: String,
        required: false
    },
    playlistId: {
        type: Number,
        required: true
    }
    status: {
        type: Number,
        required: true
    }
});
let Song = mongoose.model('Song', song);
mongoose.models = {};
export default Song;