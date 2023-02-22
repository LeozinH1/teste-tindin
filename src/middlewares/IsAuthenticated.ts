import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import AppError from '../errors/AppError'
import authConfig from '../config/auth'

interface TokenPayload {
    iat: number
    exp: number
    sub: string
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        
        verify(token, authConfig.jwt.secret, (err, decoded) => {
            if (err) throw new AppError('Failed to authenticate token.', 401)
        })


        return next()
    } catch {
        throw new AppError('Invalid JWT token', 401)
    }
}