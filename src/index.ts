import MySQL from "./mysql/mysql";
import router from "./router/router";
import Server from "./server/server";

const server = Server.init(3000);
server.app.use(router);

// const mysql = new MySQL();

// MySQL.instance;

server.start(()=> {
    console.log('Servidor online, Puerto: 3000');
});