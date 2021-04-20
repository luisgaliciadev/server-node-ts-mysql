import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;
    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor() {
        console.log('Clase MySQL inicisializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'python_api'
        });
        this.conectarDB();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery( query: string, callback: Function) {
        this.instance.cnn.query(query, (err, results: object[], fields) => {
            if(err) {
                console.log('Error: ', err);
                return callback(err);
            }

            if(results.length === 0) {
                callback('El no gay registros.')
            } else {
                callback(null, results);
            }
        });
    }

    private conectarDB() {
        this.cnn.connect((err:mysql.MysqlError) => {
            if(err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('BD online')
        })
    }
}