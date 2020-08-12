import React, { useState } from 'react';
import Axios from 'axios';

export default ({history}) => {
  const [disciplina, setDisciplina] = useState(
    {nome: '', curso:'', capacidade: 0}
  );

  const handleInputs = ({target:{name, value}}) => {
    setDisciplina({...disciplina, [name]:value});
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await Axios.post('http://localhost:3001/disciplinas', disciplina);
      history.push('/list');
    } catch (e) {console.error(e.message);}
  }


  return (
    <>
      <h3>Criar Disciplina</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="dNome">Nome:</label>
            <input id="dNome" className="form-control" name="nome"
              defaultValue={disciplina.nome} onChange={handleInputs}/>
          </div>
          <div className="form-group">
            <label htmlFor="dCurso">Curso:</label>
            <input id="dCurso" className="form-control" name="curso"
              defaultValue={disciplina.curso} onChange={handleInputs}/>
          </div>
          <div className="form-group">
            <label htmlFor="dCap">Capacidade:</label>
            <input id="dCap" type="number" min="0" step="1" name="capacidade"
              className="form-control" defaultValue={disciplina.capacidade}
              onChange={handleInputs}/>
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Criar"/>
          </div>
        </form>
    </>
  );
};