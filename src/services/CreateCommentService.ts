import AppError from '../errors/AppError'
import { Comments }  from '../schemas/Comments'
import { Classes }  from '../schemas/Classes'

interface Request {
    id_class: string
    comment: string
}

class CreateCommentService {
    public async execute({ id_class, comment }: Request): Promise<Comments> {

        const newComment = new Comments({id_class, comment});
        
        try{
            await newComment.save();
            await Classes.findByIdAndUpdate(id_class,  {$inc : {'total_comments' : 1}})
        } catch (error) {
            throw new AppError('Error creating comment', 501)
        }

        return newComment
    }
}

export default CreateCommentService