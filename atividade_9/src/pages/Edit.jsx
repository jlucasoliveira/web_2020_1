import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import Button from '../components/Button';
import Input from '../components/Input';

import DisciplinaService from '../services/DisciplinaService';

export default ({match:{params:{id}}, history}) => {
  const [load, setLoad] = useState(true); 
  
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
    initialValues: {nome: "", curso: "", capacidade: 0},
    validate,
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
  }, [id, history, formik]);

  return (
    <>
      <h3>Editar disciplina</h3>
      {load && <h4>Carregando...</h4>}
      <form onSubmit={formik.handleSubmit}>
        <Input name="nome" formik={formik} />
        <Input name="curso" formik={formik} />
        <Input name="capacidade" type="number" step="1" formik={formik} />
        <Button value="Editar" />
      </form>
    </>
  );
}
