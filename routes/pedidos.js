const express = require('express');
const router = express.Router();
const mysql = require('../mysql');

// Lista todos os pedidos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM pedidos;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    pedidos: result.map(pedido => {
                        return {
                            id_pedidos: pedido.id_pedidos,
                            id_produtos: pedido.id_produtos,
                            quantidade: pedido.quantidade,
                            request: {
                                tipo: 'GET',
                                descrição: 'Retorna os detalhes de um pedido específico',
                                url: 'http://localhost:3000/pedidos/' + pedido.id_pedidos
                            }
                        }
                    })
                }
                return res.status(200).send(response);
        }
     )
  })
});

// Insere um pedido
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error} )}
        conn.query(
            'INSERT INTO pedidos (id_produtos, quantidade) VALUES (?,?)',
            [req.body.id_produtos, req.body.quantidade],
            (error, result, field) => {
                conn.release();
                console.error(error)
                if(error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Pedido inserido com sucesso',
                    pedidoCriado: {
                        id_pedidos: result.id_pedidos,
                        id_produtos: req.body.id_produtos,
                        quantidade: req.body.quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os pedidos',
                            url: 'http://localhost:3000/pedidos'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    })
    
    
});

// Lista dados de um pedido
router.get('/:id_pedidos', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM pedidos WHERE id_pedidos = ?;',
            [req.params.id_pedidos],
            (error, result, fields) => {
                if(error) { return res.status(500).send({ error: error})}
                
                if(result.length == 0) {
                    return res.status(404).send({
                        mensagem:'Não foi encontrado pedido com este ID'
                    })
                }
                
                const response = {
                    pedido: {
                        id_pedidos: result[0].id_pedidos,
                        id_produtos: result[0].id_produtos,
                        quantidade: result[0].quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os pedidos',
                            url: 'http://localhost:3000/pedidos'
                        }
                    }
                }
                return res.status(200).send(response);
            }
        )
    })
});

// Deleta um pedido
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Pedido excluído'
    })
});

module.exports = router;