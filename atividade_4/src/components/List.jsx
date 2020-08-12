import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TableRow = ({id, nome, curso, capacidade}) => {
  return (
    <>
      <tr>
        <td style={{textAlign: 'center'}}>{id}</td>
        <td>{nome}</td>
        <td style={{textAlign: 'center'}}>{curso}</td>
        <td style={{textAlign: 'center'}}>{capacidade}</td>
        <td style={{textAlign: 'center'}}><Link to={`/edit/${id}`}>Editar</Link></td>
        <td style={{textAlign: 'center'}}><Link to={`/delete/${id}`}>Excluir</Link></td>
      </tr>
    </>
  );
}

export default () => {
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const loadDisciplinas = async () => {
      const data = (await axios.get('http://localhost:3001/disciplinas')).data;
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
      <h3>Lista de disciplinas</h3>
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
