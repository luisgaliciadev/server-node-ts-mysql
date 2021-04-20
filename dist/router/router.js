"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/categorias', (req, res) => {
    const query = `
        SELECT * FROM CATEGORIA
    `;
    mysql_1.default.ejecutarQuery(query, (err, categorias) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                categorias
            });
        }
    });
});
router.get('/categoria/:id', (req, res) => {
    const id = req.params.id;
    const escapeId = mysql_1.default.instance.cnn.escape(id);
    const query = `
        SELECT * FROM CATEGORIA WHERE cat_id = ${escapeId}
    `;
    mysql_1.default.ejecutarQuery(query, (err, categoria) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                categoria
            });
        }
    });
});
exports.default = router;
