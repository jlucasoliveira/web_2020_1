import React, {useState, useEffect} from 'react';
import API from '../utils/api';

export default ({match:{params:{id}}, history}) => {
  const [disciplina, setDisciplina] = useState(
    {id:'', nome:'', curso:'', capacidade:''}
  );

  useEffect(() => {
    const loadDisciplina = async () => {
      try {
        const data = (await API.get(`/disciplinas/${id}`)).data;
        
        if (!data) {
          const mesgErr = `id ${id} não encontrada!`;
          alert(mesgErr);
          console.warn(mesgErr);
          history.push('/list');
          return;
        };

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
      await API.put(`/disciplinas/${id}`, disciplina);
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
