import AppError from '../errors/AppError'
import { Classes } from '../schemas/Classes'

interface Request {
    name: string
    description: string
    video: string
    data_init: Date
    data_end: Date
}

class CreateClasseService {
    public async execute({ name, description, video, data_init, data_end }: Request): Promise<Classes> {

        const newClasse = new Classes({
            name,
            description,
            video,
            data_init,
            data_end
        })

        try{
            await newClasse.save();
        }catch(error){
            throw new AppError(`${error}`, 501)
        }

        return newClasse
    }
}

export default CreateClasseService