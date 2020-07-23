import React from 'react';

export const Aluno = ({nome, curso, cidade}) => {
  return (
    <div>
      <h3>{nome}</h3>
      <h3>{curso}</h3>
      <h3>{cidade}</h3>
    </div>
  );
};

export const Turma = () => {
  return (
    <Aluno nome="José Lucas Oliveira da Silva" curso="Ciências da Computação"
      cidade="Fortaleza"/>
  );
}
