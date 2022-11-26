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
    const id = req.params.id_produto

    if(id === especial){
        res.status(200).send({
            mensagem: 'Você descobriu o id especial',
            id:id
        })
    }else{
        res.status(200).send({
            mensagem: 'Você passou um id'
        })
    }
});

// Altera um produto
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Altera um produto'
    })
});

// Deleta um produto
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Exclui produto'
    })
})

module.exports = router; 