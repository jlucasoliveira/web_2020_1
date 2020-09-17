import Firebase from '../utils/Firebase';

export default {
    async list(callback) {
        let disciplinas = [];
        Firebase.collection('disciplinas')
        .onSnapshot(async (query) => {
            query.forEach((doc) => {
                const id = doc.id;
                const data = doc.data();
                disciplinas.push({id, ...data})
            });
            callback(disciplinas);
        });
    },

    retrieve(id, callback) {
        Firebase.collection('disciplinas')
        .doc(id).get().then((doc) => callback(doc.data()));
    },

    create(disciplina, callback) {
        Firebase.collection('disciplinas').add(disciplina)
        .then(()=> callback(true)).catch(() => callback(false));
    },

    edit(id, disciplina, callback) {
        Firebase.collection('disciplinas').doc(id)
        .set(disciplina).then(() => callback(true)).catch(() => callback(false));
    },

    delete(id, callback) {
        Firebase.collection('disciplinas').doc(id).delete()
        .then(() => callback(true)).catch(() => callback(false));
    }

}
