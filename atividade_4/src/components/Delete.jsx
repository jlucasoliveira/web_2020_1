import React from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';

export default ({match:{params:{id}}, history}) => {

    const deleteDisciplina = async () => {
        try {
            await API.delete(`/disciplinas/${id}`);
            history.push('/list');
        } catch(err) {console.error(err.message);}
    }

    return (
        <>
            <h3>Realmente deseja remover este registro?</h3>
            <button className="btn btn-danger" onClick={deleteDisciplina}>Apagar</button>
            <Link to={'/list'} className="btn btn-link">voltar</Link>
        </>
    );
};