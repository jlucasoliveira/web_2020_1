import React from 'react';
import aang from '../questao1/aang.jpg';
import ozai from '../questao1/ozai.gif';
import 'bootstrap/dist/css/bootstrap.css';


const Hero = ({name, image}) => {
    return (
        <div className="card" style={{width: '10vw'}}>
            <img src={image} alt={`pic of ${name}`} className="card-img-top"/><br/>
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
            </div>
        </div>
    );
};

const Enemy = ({name, image}) => {
    return <Hero name={name} image={image}/>
};

export default () => {
    return (
        <>
            <Hero name="Aang" image={aang}/>
            <Enemy name="Ozai" image={ozai}/>
        </>
    );
};