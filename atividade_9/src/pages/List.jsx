import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import TableRow from '../components/TableRow';
import DisciplinaService from '../services/DisciplinaService';

export default () => {
  const [loading, setLoading] = useState(true);
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    DisciplinaService.list((disciplinas) => {setDisciplinas(disciplinas); setLoading(false)});
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
      {loading && <h4>Carregando...</h4>}
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
