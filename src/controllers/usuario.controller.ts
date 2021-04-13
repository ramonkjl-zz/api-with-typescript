import { Request, Response } from "express";
import usuarioModel from '../models/usuario.model'
import { compararSenhas, gerarToken } from "../utils";

class UsuarioController {

    public async cadastrar(req: Request, res: Response): Promise<Response> {
        const usuario = await usuarioModel.create(req.body)

        const resposta = {
            message: 'Usuário cadastrado com sucesso!',
            _id: usuario._id,
            nome: usuario.nome,
            senha: usuario.senha,
            avatar: usuario.avatar
        }

        return res.json(resposta)
    }

    public async autenticar(req: Request, res: Response) {
        const { nome, senha } = req.body

        const usuario = await usuarioModel.findOne({ nome })

        if (!usuario) {
            return res.status(400).send({ message: "Usuário não encontrado" })
        }

        const senhaValida = await compararSenhas(senha, usuario.senha)
        if (!senhaValida) {
            return res.status(400).send({ message: "Senha incorreta!" })
        }

        const decodedToken = {
            _id: usuario._id,
            nome: usuario.nome,
            avatar: usuario.avatar
        }

        return res.json({
            usuario,
            token: gerarToken(decodedToken)
        })
    }

}

export default new UsuarioController()