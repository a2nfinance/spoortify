import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let userPaidPlaylist = new Schema({
    userAddress: {
        type: String,
        required: true,
    },
    playlistId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});
let UserPaidPlaylist = mongoose.model('UserPaidPlaylist', userPaidPlaylist);
mongoose.models = {};
export default UserPaidPlaylist;