const express = require('express');
const cors = require('cors');
const { connection } = require("./src/db/connection");
const routes = require("./src/routes");

const PORT_API = process.env.PORT_API || 3000;

class Server {
    constructor(server = express()) {
        this.middlewares(server);
        this.database();
        this.initializeServer(server);
        server.use(routes);
    }

    middlewares(server) {
        server.use(cors({ origin: '*' })); // Middleware para permitir requisições de qualquer origem
        server.use(express.json()); // Middleware para parsear JSON
    }

    async database() {
        try {
            await connection.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    initializeServer(server) {
        server.listen(PORT_API, () => {
            console.log(`Servidor rodando em http://localhost:${PORT_API}`)
        });
    }
}

module.exports = { Server };