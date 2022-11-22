import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let playlist = new Schema({
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
    description: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: false
    },
    price: {
        type: Number,
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
let Playlist = mongoose.model('Playlist', playlist);
mongoose.models = {};
export default Playlist;