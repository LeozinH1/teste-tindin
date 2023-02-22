import mongoose from 'mongoose'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'
import { Users } from '../schemas/Users'

interface Request {
    email: string
    password: string
}

interface Response {
    user: Users
    token: string
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {

        const user = await Users.findOne({ where: { email } })

        if (!user) {
            throw new AppError('Incorrect email/password combination', 401)
        }

        if (password !== user.password) {
            throw new AppError('Incorrect email/password combination', 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.email,                        
            expiresIn,
        })

        return {
            user,
            token,
        }
    }
}

export default AuthenticateUserService