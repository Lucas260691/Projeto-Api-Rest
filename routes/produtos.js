const express = require('express');
const router = express.Router();


// Lista todos os produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o Get dentro da rota de produtos'
    })
});

// Insere um produto
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o Post na rota de produtos'
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
        mensagem: 'Usando o Patch dentro da rota de produtos'
    })
});

// Deleta um produto
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o Delete dentro da rota de produtos'
    })
})

module.exports = router;