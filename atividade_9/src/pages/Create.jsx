import React, { useRef, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import DisciplinaService from '../services/DisciplinaService';

const Create = ({history, auth, verified}) => {
  const nomeInputRef = useRef("");
  const cursoInputRef = useRef("");
  const capacidadeInputRef = useRef(0);

  const submitCallBack = useCallback((e) => {
    e.preventDefault();
    const nome = nomeInputRef.current?.value;
    const curso = cursoInputRef.current?.value;
    const capacidade = capacidadeInputRef.current?.value;
    
    DisciplinaService.create({nome, curso, capacidade}, (res) => {
      res?alert("Criado com sucesso!"):alert("Ocorreu um erro!");
      history.push('/list');
    });
  }, [history]);

  useEffect(() => {
    if (auth.isLoaded && auth.isEmpty) history.push('/signin');
  }, [history, auth]);

  return (
    verified?
    <>
      <h3>Criar Disciplina</h3>
      <form onSubmit={submitCallBack}>
        <Input lblName="Nome" inputRef={nomeInputRef} />
        <Input lblName="Curso" inputRef={cursoInputRef} />
        <Input lblName="Capacidade" inputRef={capacidadeInputRef} type="number" min="0" step="1"/>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Criar"/>
        </div>
      </form>
    </>:
    <div className="alert alert-warning">
      Para criar uma Disciplina você precisa verificar seu email!
    </div>
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
)(Create);