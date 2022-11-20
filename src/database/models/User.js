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
    status: {
        type: Number,
        required: true
    }
});
let User = mongoose.model('User', user);
mongoose.models = {};
export default User;