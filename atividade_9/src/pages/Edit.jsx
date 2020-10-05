import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import Button from '../components/Button';
import Input from '../components/Input';

import DisciplinaService from '../services/DisciplinaService';

export default ({match:{params:{id}}, history}) => {
  const [load, setLoad] = useState(true);
  
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
      DisciplinaService.edit(id, {nome, curso, capacidade}, (res) => {
        res?alert("Atualizado com sucesso!"):alert("Ocorreu um erro!");
        history.push('/list');
      });
    }
  });
  
  useEffect(() => {
    DisciplinaService.retrieve(id, ({nome, curso, capacidade}) => {
      if (nome && curso && capacidade)
        formik.setValues({nome, curso, capacidade});
      else {
        alert(`id ${id} não encontrada!`);
        history.push('/list');
      }
      setLoad(false);
    });
  }, [id]);

  const { errors, touched } = formik;

  return (
    <>
      <h3>Editar disciplina</h3>
      {load && <h4>Carregando...</h4>}
      <form onSubmit={formik.handleSubmit}>
        <Input name="nome" {...formik.getFieldProps("nome")} touched={touched["nome"]} error={errors["nome"]} />
        <Input name="curso" {...formik.getFieldProps("curso")} touched={touched["curso"]} error={errors["curso"]} />
        <Input name="capacidade" type="number" step="1" {...formik.getFieldProps("capacidade")}
          touched={touched["capacidade"]} error={errors["capacidade"]} />
        <Button value="Editar" />
      </form>
    </>
  );
}
