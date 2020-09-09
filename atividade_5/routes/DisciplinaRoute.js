const express = require("express");
const { DisciplinaService } = require("../services/DisciplinaService");

const router = express.Router();

router.get('/', async (req, res) => {
    return res.json(await DisciplinaService.list());
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    return res.json(await DisciplinaService.retrieve(id));
});

router.post('/', async (req, res) => {
    const data = req.body;
    return res.status(201).json(await DisciplinaService.register(data));
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    return res.json(await DisciplinaService.update(id, data));
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const result = await DisciplinaService.delete(id)
    return res.json({'success': result});
});

module.exports = {router};