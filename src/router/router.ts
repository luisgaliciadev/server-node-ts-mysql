import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/categorias', (req: Request, res: Response) => {
    const query = `
        SELECT * FROM CATEGORIA
    `;
    MySQL.ejecutarQuery(query, (err: any, categorias: object[])=> {
        if(err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                categorias
            });
        }
    });
});

router.get('/categoria/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const escapeId = MySQL.instance.cnn.escape(id)
    const query = `
        SELECT * FROM CATEGORIA WHERE cat_id = ${escapeId}
    `;
    MySQL.ejecutarQuery(query, (err: any, categoria: object[])=> {
        if(err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                categoria
            });
        }
    });
});

export default router;