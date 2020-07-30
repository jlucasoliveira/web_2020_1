import React from 'react';
import aang from './aang.jpg';
import ozai from './ozai.gif';

const Hero = ({name, image}) => {
    return (
        <div style={{margin:20}}>
            <img src={image} alt={`pic of ${name}`} width="140"/><br/>
            <span>{name}</span>
        </div>
    );
};

const Enemy = ({name, image}) => {
    // Insira sua discussão filosófica aqui
    return <Hero name={name} image={image}/>
};

export default function Arena(){
    return (
        <div style={{display: 'inline-block'}}>
            <Hero name="Aang" image={aang}/>
            <Enemy name="Ozai" image={ozai}/>
        </div>
    );
};
