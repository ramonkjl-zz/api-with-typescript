import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import usuarioRoute from './routes/usuario.route'
import mensagemRoute from './routes/mensagem.route'

export class App {
    private express: express.Application
    private port = 9000

    constructor() {
        this.express = express()
        this.middlewares()
        this.database()
        this.routes()
        this.listen()
    }

    public getApp(): express.Application {
        return this.express
    }

    private middlewares() {
        this.express.use(express.json())
        this.express.use(cors())
    }

    private listen() {
        this.express.listen(this.port, () => console.log(`Server running in port ${this.port}`))
    }

    private database() {
        mongoose.connect('mongodb+srv://ramon_teste:32251049@ramon.lxiex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
            .then(() => console.log("MongoDB is connect"))
            .catch(() => console.log("Connection with failed"))
    }

    private routes() {
        this.express.use('/usuarios', usuarioRoute)
        this.express.use('/mensagens', mensagemRoute)
    }
}
