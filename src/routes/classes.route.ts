import 'reflect-metadata'
import { Router } from 'express'
import mongoose from 'mongoose'
import AppError from '../errors/AppError'

import CreateClasseService from '../services/CreateClasseService'
import CreateCommentService from '../services/CreateCommentService'

import ensureAuthenticated from '../middlewares/IsAuthenticated'

import { Classes } from '../schemas/Classes'
import { Comments } from '../schemas/Comments'


const classesRouter = Router()




// classesRouter.use(ensureAuthenticated)

// Criar uma nova classe

classesRouter.post('/', async (request, response) => {
    const { name, description, video, data_init, data_end } = request.body
    const createClasse = new CreateClasseService()
    const classe = await createClasse.execute({
        name,
        description,
        video,
        data_init,
        data_end
    })

    return response.json(classe)
})


// Listar classes cadastradas


classesRouter.get('/', async (request, response) => {
    /*
    Na listagem da aula trazer um campo chamado last_comment, que é o
    último comentário que a aula recebeu e o campo last_comment_date que é a
    data que foi feito este comentário. Poder filtrar pelo campo name, description,
    data_init e data_end.
    */



    const filterName = request.query.name;
    const filterDescription = request.query.description;
    const filterDataInit = request.query.datainit;
    const filterDataEnd = request.query.dataend;



    const page = Number(request.query.page);
    const perPage = 2;
    const skip = perPage * page - perPage
    const results = await Classes.count()
    const total_pages = Math.ceil(results / perPage)
    
    if(page < 1 || page > total_pages){
        throw new AppError(`Page ${page} does not exist.`, 404)
    }

    const classes = await Classes.aggregate([
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "id_class",
                as: "last_comment",
                pipeline: [ 
                    { $sort: { 'createdAt': -1 } },
                    { $limit: 1 } 
                ],
            }
        }
    ]).skip(skip).limit(perPage)


   return response.status(200).json({classes, results, page, total_pages })
})


// Obter detalhes de uma aula pelo o id

classesRouter.get('/:id', async (request, response) => {
    const { id } = request.params;


 
    const classe = await Classes.findOne({where: { id }})
    const comments = await Comments.find({ 
        where: {
            id_class : id
        }, 
        take: 3, 
        order: { 
            date_created : "DESC" 
        }
    })

    return response.status(200).json({classe})
})


// Atualizar o cadastro de uma aula

classesRouter.put('/', async (request, response) => {
    
    
    return response.status(200).json({ message: "hello"})
})


// Excluir o cadastro de uma aula

classesRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;

    await Classes.findByIdAndDelete(id)

    return response.status(204).send();
})


// Cadastrar um comentário de uma aula

classesRouter.post('/comments', async (request, response) => {
    const { id_class, comment } = request.body
    const createComment = new CreateCommentService()

    const commentInsert = await createComment.execute({
        id_class,
        comment,
    })

    return response.json(commentInsert)
})


// Listar todos os comentários de uma aula

classesRouter.get('/:id/comments', async (request, response) => {
    const { id } = request.params;

    const comments = await Comments.find({ 
        where: { 
            id_class: id 
        }
    })
    return response.status(200).json(comments)
})


// Excluir um comentário

classesRouter.delete('/comments/:id', async (request, response) => {
    const { id } = request.params;

    await Comments.findByIdAndDelete(id)

    return response.status(204).send();
})

export default classesRouter