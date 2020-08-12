import React, {useState, useEffect} from 'react';
import Axios from 'axios';

export default ({match:{params:{id}}, history}) => {
  const [disciplina, setDisciplina] = useState(
    {id:'', nome:'', curso:'', capacidade:''}
  );

  useEffect(() => {
    const loadDisciplina = async () => {
      try {
        const data = (await Axios.get(`http://localhost:3001/disciplinas/${id}`)).data;
        if (!data) return;
        setDisciplina(data);
      } catch (err) {console.error(err.message)}
    }
    loadDisciplina();
  }, [id]);

  const handlerInputs = ({target:{name, value}}) => {
    setDisciplina({...disciplina, [name]:value});
  }

  const submitData = async (e) => {
    try {
      e.preventDefault();
      await Axios.put(`http://localhost:3001/disciplinas/${id}`, disciplina);
      history.push('/list');
    } catch (err) {console.error(err);}
  }

  return (
    <>
      <h3>Editar disciplina</h3>
      <form onSubmit={submitData}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input className="form-control" name="nome" id="nome"
            defaultValue={disciplina.nome} required={true}
            onChange={handlerInputs}/>
        </div>
        <div className="form-group">
          <label htmlFor="curso">Curso</label>
          <input className="form-control" name="curso" id="curso"
            defaultValue={disciplina.curso} required={true}
            onChange={handlerInputs}/>
        </div>
        <div className="form-group">
          <label htmlFor="capacidade">Capacidade</label>
          <input className="form-control" name="capacidade" id="capacidade"
            defaultValue={disciplina.capacidade} required={true} min="0"
            onChange={handlerInputs} type="number"/>
        </div>
        <input type="submit" value="Editar" className="btn btn-primary"/>
      </form>
    </>
  );
}
// onChange={({target:{value}}) => setDisciplina({...disciplina, nome: value})}