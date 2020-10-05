import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableRow from '../components/TableRow';
import DisciplinaService from '../services/DisciplinaService';

const List = ({auth, history, verified}) => {
  const [loading, setLoading] = useState(true);
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    if (auth.isLoaded && auth.isEmpty) {
      history.push('/signin');
      return;
    }
    DisciplinaService.list((disciplinas) => {setDisciplinas(disciplinas); setLoading(false)});
  }, [history, auth]);

  const montarLinhas = () => disciplinas.map((disciplina, i) => <TableRow key={i} {...disciplina} verified={verified}/>);
  
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

export default connect(
  // map State to Props
  (state) => ({
    auth: state.firebaseReducer.auth,
    ...state.AuthReducer
  }),
  // map Dispatch to Props
  (dispatch) => ({}) 
)(List);
