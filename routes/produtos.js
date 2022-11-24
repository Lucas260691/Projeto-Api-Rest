const express = require('express');
const router = express.Router();


// Lista todos os produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Lista todos os produtos'
    })
});

// Insere um produto
router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        produto: req.body.preco
    }
    res.status(201).send({
        mensagem: 'Insere um produto',
        produtoCriado: produto
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