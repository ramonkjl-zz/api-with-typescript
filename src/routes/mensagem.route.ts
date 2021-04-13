import { Router } from 'express'
import mensagemController from '../controllers/mensagem.controller'

const mensagemRoute = Router()

mensagemRoute.post('/:id', mensagemController.enviar)

export default mensagemRoute