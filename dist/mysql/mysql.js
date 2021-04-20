"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase MySQL inicisializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'python_api'
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error: ', err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El no gay registros.');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('BD online');
        });
    }
}
exports.default = MySQL;
