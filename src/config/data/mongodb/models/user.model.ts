import mongoose, {Schema} from 'mongoose';

const userShema = new Schema({

    name: {
        type: String,
        required: [true, 'names is requeried']
    },
    email: {
        type: String,
        required:[true, 'Email is requerid'],
        unique: true
    },
    password:{
        type: String,
        required:[true, 'Paswword is requerid']
    },
    img:{
        type: String,
    },
    roles:{
        type:[String],
        default:['USER_ROLE'],
        enum:   ['USER_ROLE','ADMIN_ROLE']

    },

});

export const UserModel = mongoose.model('User',userShema);