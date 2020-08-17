const { DisciplinaModel } = require("../models/DisciplinaModel");

let _id = 0;
let disciplinas = [];

class DisciplinaService {
    static register(data) {
        const disciplina = new DisciplinaModel(
            _id++,
            data.nome, data.curso, data.capacidade
        );

        disciplinas.push(disciplina);
        return disciplina;
    }

    static update(_id, data) {
        for (let d of disciplinas)
            if (_id == d._id) {
                d.nome = data.nome;
                d.curso = data.curso;
                d.capacidade = data.capacidade;
                return d;
            }
        return null;
    }

    static delete(_id) {
        for (let i = 0; i < disciplinas.length; i++)
            if (disciplinas[i]._id == _id) {
                disciplinas.splice(i,1);
                return true;
            }
        return false;
    }

    static list() {
        return disciplinas;
    }

    static retrieve(_id) {
        for (let d of disciplinas) 
            if (_id == d._id)
                return d;
        return null;
    }
}

module.exports = {DisciplinaService};