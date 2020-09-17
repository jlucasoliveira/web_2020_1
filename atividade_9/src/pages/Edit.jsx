import React, {useState, useRef, useEffect, useCallback} from 'react';
import Input from '../components/Input';
import DisciplinaService from '../services/DisciplinaService';

export default ({match:{params:{id}}, history}) => {
  const [loading, setLoading] = useState(true);
  const nomeInputRef = useRef("");
  const cursoInputRef = useRef("");
  const capacidadeInputRef = useRef(0);
  
  useEffect(() => {
    DisciplinaService.retrieve(id, ({nome, curso, capacidade}) => {
      if (nome && curso && capacidade) {
        nomeInputRef.current.value = nome;
        cursoInputRef.current.value = curso;
        capacidadeInputRef.current.value = capacidade;
      } else {
        alert(`id ${id} não encontrada!`);
        history.push('/list');
      }
      setLoading(false);
    });
  }, [id, history]);

  const submitCallback = useCallback(async (e) => {
    e.preventDefault();
    const nome = nomeInputRef.current?.value;
    const curso = cursoInputRef.current?.value;
    const capacidade = capacidadeInputRef.current?.value;
    
    DisciplinaService.edit(id, {nome, curso, capacidade}, (res) => {
      res?alert("Atualizado com sucesso!"):alert("Ocorreu um erro!");
      history.push('/list');
    });
  }, [id, history]);

  return (
    <>
      <h3>Editar disciplina</h3>
      {loading && <h4>Carregando...</h4>}
      <form onSubmit={submitCallback}>
        <Input lblName="Nome" inputRef={nomeInputRef}/>
        <Input lblName="Curso" inputRef={cursoInputRef}/>
        <Input lblName="Capacidade" inputRef={capacidadeInputRef} type="number" min="0" step="1"/>
        <input type="submit" value="Editar" className="btn btn-primary"/>
      </form>
    </>
  );
}
