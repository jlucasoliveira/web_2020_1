import React, { useEffect } from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import Input from '../components/Input';
import Button from '../components/Button';

import { connect } from 'react-redux';
import DisciplinaService from '../services/DisciplinaService';

const Create = ({history, auth, verified}) => {

  const validationSchema = Yup.object({
      nome: Yup.string()
        .max(30, "Dever ter no máximo 30 caracteres.")
        .required("Este campo é obrigatório"),
      curso: Yup.string()
        .max(20, "Dever ter no máximo 20 caracteres.")
        .required("Este campo é obrigatório"),
      capacidade: Yup.number()
        .min(5, "Deve haver no mínimo 5 pessoas.")
        .required("Este campo é obrigatório"),
  });
  
  const formik = useFormik({
    initialValues: {nome: '', curso: '', capacidade: 0},
    validationSchema,
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

  const { errors, touched } = formik;

  return (
    verified?
    <>
      <h3>Criar Disciplina</h3>
      <form onSubmit={formik.handleSubmit}>
        <Input name="nome" {...formik.getFieldProps("nome")} touched={touched["nome"]} error={errors["nome"]} />
        <Input name="curso" {...formik.getFieldProps("curso")} touched={touched["curso"]} error={errors["curso"]} />
        <Input name="capacidade" type="number" step="1" {...formik.getFieldProps("capacidade")}
          touched={touched["capacidade"]} error={errors["capacidade"]} />
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