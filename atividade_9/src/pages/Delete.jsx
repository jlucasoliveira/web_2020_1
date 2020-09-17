import React from 'react';
import { Link } from 'react-router-dom';
import DisciplinaService from '../services/DisciplinaService';

export default ({match:{params:{id}}, history}) => {

    const deleteDisciplina = () => 
        DisciplinaService.delete(id, (res) => {
            res?alert("Apgado com sucesso!"):alert("Ocorreu um erro!");
            history.push('/list');
        });

    return (
        <>
            <h3>Realmente deseja remover este registro?</h3>
            <button className="btn btn-danger" onClick={deleteDisciplina}>Apagar</button>
            <Link to={'/list'} className="btn btn-link">voltar</Link>
        </>
    );
};