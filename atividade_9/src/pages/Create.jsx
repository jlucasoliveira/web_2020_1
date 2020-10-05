import React, { useEffect } from 'react';
import {useFormik} from 'formik';

import Input from '../components/Input';
import Button from '../components/Button';

import { connect } from 'react-redux';
import DisciplinaService from '../services/DisciplinaService';

const Create = ({history, auth, verified}) => {

  const validate = ({nome, curso, capacidade}) => {
    const errors = {};
    if (!nome)
      errors.nome = "Este campo é obrigatório";
    else if (nome.length > 30)
      errors.nome = "Dever ter no máximo 30 caracteres.";
    
    if (!curso) 
      errors.curso = "Este campo é obrigatório";
    else if (curso.length > 20)
      errors.curso = "Dever ter no máximo 20 caracteres.";
    
    if (!capacidade)
      errors.capacidade = "Este campo é obrigatório";
    else if (capacidade < 5)
      errors.capacidade = "Deve haver no mínimo 5 pessoas.";
    return errors;
  };
  
  const formik = useFormik({
    initialValues: {nome: '', curso: '', capacidade: 0},
    validate,
    onSubmit: ({nome, curso, capacidade}) => {
      DisciplinaService.create({nome, curso, capacidade}, (res) => {
        res?alert("Criado com sucesso!"):alert("Ocorreu um erro!");
        history.push('/list');
      });
    }
  });

  useEffect(() => {
    if (auth.isLoaded && auth.isEmpty) history.push('/signin');
  }, [history, auth]);

  return (
    verified?
    <>
      <h3>Criar Disciplina</h3>
      <form onSubmit={formik.handleSubmit}>
        <Input name="nome" formik={formik} />
        <Input name="curso" formik={formik} />
        <Input name="capacidade" type="number" step="1" formik={formik} />
        <Button value="Criar" />
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