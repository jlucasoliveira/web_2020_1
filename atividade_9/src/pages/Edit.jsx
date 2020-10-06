import React, {useState, useEffect} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import Button from '../components/Button';
import Input from '../components/Input';

import DisciplinaService from '../services/DisciplinaService';

export default ({match:{params:{id}}, history}) => {
  const [load, setLoad] = useState(true);

  const initialValues = {nome: '', curso: '', capacidade: 0};
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
  
  const onSubmit = ({nome, curso, capacidade}, {setSubmitting}) => {
    DisciplinaService.edit(id, {nome, curso, capacidade}, (res) => {
      res?alert("Atualizado com sucesso!"):alert("Ocorreu um erro!");
      history.push('/list');
    });
    setSubmitting(false);
  }

  return (
    <>
      <h3>Editar disciplina</h3>
      {load && <h4>Carregando...</h4>}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {props => (
          <Form>
            {
              useEffect(() => {
                DisciplinaService.retrieve(id, ({nome, curso, capacidade}) => {
                  if (nome && curso && capacidade)
                    props.setValues({nome, curso, capacidade});
                  else {
                    alert(`id ${id} não encontrada!`);
                    history.push('/list');
                  }
                  setLoad(false);
                });
              }, [])
            }
            <Input name="nome"/>
            <Input name="curso"/>
            <Input name="capacidade" type="number" step="1"/>
            <Button value="Editar"/>
          </Form>
        )}
      </Formik>
    </>
  );
}
