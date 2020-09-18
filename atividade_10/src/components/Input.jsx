import React from 'react';
import { connect } from 'react-redux';
import Operacao from '../store/actions/Operacao'

const Input = ({idx, mudarOperando}) => {

    const handleInput = ({target:{value}}) => {mudarOperando(Number(value), idx);};
    return (
        <>
            <strong>Número {idx + 1}</strong>
            <input type="number" onChange={handleInput}/>
            <br/>
        </>
    );
}

export default connect(null,
    /* mapActions*/
    (dispatch) => ({
        mudarOperando: (value, idx) => {dispatch(Operacao(value, idx));},
    })
)(Input);