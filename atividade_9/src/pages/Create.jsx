import React, { useRef, useCallback } from 'react';
import Input from '../components/Input';
import DisciplinaService from '../services/DisciplinaService';

export default ({history}) => {
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


  return (
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
    </>
  );
}
