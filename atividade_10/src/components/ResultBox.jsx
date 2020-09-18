import React from 'react';
import { connect } from 'react-redux';

const ResultBox = ({operandos, type}) => {
    
    const soma = (a, b) => a + b;
    const mult = (a, b) => a * b;
    const maior =(a, b) => a > b?a:b;

    const content = () => {
        if (type === 'soma')
            return operandos.reduce(soma);
        else if (type === 'mult')
            return operandos.reduce(mult);
        else if (type === 'maior')
            return operandos.reduce(maior);
    }

    return (
        <div className="card" style={{marginRight: 15}}>
            <div className="card-header">{type.toUpperCase()}</div>
            <div className="card-body">
                <h4 className="card-title">{content()}</h4>
            </div>
        </div>
    );
}

export default connect(
    /* mapState */
    (state, ownProps) => ({
        operandos: state.operandos,
        type: ownProps.type
    })
)(ResultBox);