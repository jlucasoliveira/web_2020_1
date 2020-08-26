import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import API from '../utils/api';

const TableRow = ({_id, nome, curso, capacidade}) => {
  return (
    <>
      <tr>
        <td style={{textAlign: 'center'}}>{_id}</td>
        <td>{nome}</td>
        <td style={{textAlign: 'center'}}>{curso}</td>
        <td style={{textAlign: 'center'}}>{capacidade}</td>
        <td style={{textAlign: 'center'}}><Link to={`/edit/${_id}`}>Editar</Link></td>
        <td style={{textAlign: 'center'}}><Link to={`/delete/${_id}`}>Excluir</Link></td>
      </tr>
    </>
  );
}

export default () => {
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const loadDisciplinas = async () => {
      const data = (await API.get('/disciplinas')).data;
      if (!data) return;
      setDisciplinas(data);
    };
    loadDisciplinas();
  }, []);

  const montarLinhas = () => {
    return disciplinas.map(
      (disciplina, i) => {
        return <TableRow key={i} {...disciplina}/>
      }
    );
  }
  
  return (
    <>
      <span style={{fontSize: 24}}>Lista de disciplinas</span>
      <Link style={{float:"right"}} to="/create">Adicionar</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{textAlign: 'center'}}>ID</th>
            <th>Nome</th>
            <th style={{textAlign: 'center'}}>Curso</th>
            <th style={{textAlign: 'center'}}>Capacidate</th>
            <th colSpan='2' style={{textAlign: 'center'}}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {montarLinhas()}
        </tbody>
      </table>
    </>
  );
}
