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
    status: {
        type: Number,
        required: true
    }
});
let Playlist = mongoose.model('Playlist', playlist);
mongoose.models = {};
export default Playlist;