const { DisciplinaModel } = require("../models/DisciplinaModel");

class DisciplinaService {
    static async register(data) {
        try {
            return await DisciplinaModel.create(data);
        }catch( err ){console.error(err);}
    }

    static async update(_id, data) {
        try {
            const disciplina = await DisciplinaModel.findOneAndUpdate(_id, data, {"new": true});
            return disciplina?disciplina:null;
        }catch(err) {console.error(err);}
    }

    static async delete(_id) {
        try {
            const disciplina = await DisciplinaModel.findOneAndDelete(_id)
            return disciplina?true:false;
        }catch(err){console.error(err);}
    }

    static async list() {
        try {
            return await DisciplinaModel.find();
        }catch(err){console.error(err.message);}
    }

    static async retrieve(_id) {
        try{
            return await DisciplinaModel.findById(_id);
        }catch(err){console.error(err);}
    }
}

module.exports = {DisciplinaService};