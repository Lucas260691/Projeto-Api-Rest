const express = require('express');
const router = express.Router();
const mysql = require('../mysql');

// Lista todos os produtos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error} )}
        conn.query(
            'SELECT * FROM produtos;',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error} )}
                return res.status(200).send({response: resultado})
            }
        ) 
    })
});

// Insere um produto
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error} )}
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                if(error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                })
            }
        )
    })

});

// Lista um produto pelo id específico
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM produtos WHERE id_produtos = ?;',
            [req.params.id_produto],
            (error, resultado, fields) => {
                if(error) { return res.status(500).send({ error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
});

// Altera um produto
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            `UPDATE produtos
                SET nome = ?,
                    preco = ?
             WHERE  id_produtos = ?`,
           [
                req.body.nome,
                req.body.preco,
                req.body.id_produtos,
           ],
            (error, resultado, fields) => {
                if(error) { return res.status(500).send({ error: error})}
                res.status(201).send({
                    mensagem: 'Produto alterado com sucesso'
                })
            }
        )
    })
});

// Deleta um produto
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Exclui produto'
    })
})

module.exports = router; 