import mongoose, { Model } from 'mongoose'

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

export interface Users {
    _id?: string;
    name: string;
    email: string;
    password: string;
}

interface UsersModel extends Omit<Users, '_id'>, Document {}

export const Users: Model<UsersModel> = mongoose.model("Users", UsersSchema);






