const mongoose = require("mongoose");

const DisciplinaScheme = mongoose.Schema({
    nome : {type: String, required: true, max:150},
    curso : {type: String, required: true, max:150},
    capacidade : {type: Number, required: true},
});

const DisciplinaModel = mongoose.model('disciplinas', DisciplinaScheme);

module.exports = {DisciplinaModel};