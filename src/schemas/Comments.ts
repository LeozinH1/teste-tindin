import mongoose, { Model } from 'mongoose'

const CommentsSchema = new mongoose.Schema({
    id_class: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Classes'
    },
    comment: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export interface Comments {
    _id?: string;
    id_class: mongoose.Schema.Types.ObjectId;
    comment: string;
}

interface CommentsModel extends Omit<Comments, '_id'>, Document {}

export const Comments: Model<CommentsModel> = mongoose.model("Comments", CommentsSchema);