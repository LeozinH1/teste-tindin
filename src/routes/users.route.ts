import 'reflect-metadata'
import { Router } from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService'

const classesRouter = Router()


// Logar com um usuário

classesRouter.post('/', async (request, response) => {
    const { email, password } = request.body

    const authenticateUser = new AuthenticateUserService()

    const { user, token } = await authenticateUser.execute({
        email,
        password,
    })

    const userWithoutPassword = {
        id: user._id,
        name: user.name,
        email: user.email
    }

    return response.json({ user: userWithoutPassword, token })
})


export default classesRouter