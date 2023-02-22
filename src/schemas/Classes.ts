import mongoose, { Model } from 'mongoose'

const ClassesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    data_init:{
        type: String,
        required: true,
    },
    data_end: {
        type: String,
        required: true,
    },
    total_comments: {
        type: Number,
        default: 0,
    }
}, { timestamps: true});

export interface Classes {
    _id?: string;
    name: string;
    description: string;
    video: string;
    data_init: String;
    data_end: String;
    total_comments?: Number;
}


interface ClassesModel extends Omit<Classes, '_id'>, Document {}

export const Classes: Model<ClassesModel> = mongoose.model("Classes", ClassesSchema)


