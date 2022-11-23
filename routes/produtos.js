const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o Get dentro da rota de produtos'
    })
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o Post na rota de produtos'
    })
})

router.get('/:id_produto', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o Get de um produto exclusivo'
    })
})

module.exports = router;