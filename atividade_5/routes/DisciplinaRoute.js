const express = require("express");
const { DisciplinaService } = require("../services/DisciplinaService");

const router = express.Router();

router.get('/', (req, res) => {
    return res.json(DisciplinaService.list());
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    return res.json(DisciplinaService.retrieve(id));
});

router.post('/', (req, res) => {
    const data = req.body;
    return res.status(201).json(DisciplinaService.register(data));
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const data = req.body;
    return res.json(DisciplinaService.update(id, data));
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const result = DisciplinaService.delete(id)
    return res.json({'success': result});
});

module.exports = {router};