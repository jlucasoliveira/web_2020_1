import React from 'react';
import Arena from '../questao1/Questao1';

const World = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
}

export default () => {
    return (
        <World>
            <Arena/>
            <Arena/>
            <Arena/>
        </World>
    );
}