import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export function compararSenhas(senha: string, senhaModel: string) {
    return bcrypt.compare(senha, senhaModel)
}

export function gerarToken(decodedToken: {}) {

    return jwt.sign(decodedToken, 'secret', {
        expiresIn: '1d'
    })
}