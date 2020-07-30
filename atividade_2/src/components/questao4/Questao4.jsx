import React from 'react';
import aang from './aang.jpg';
import ozai from './ozai.gif';

const Hero = ({name, image, arena}) => {
    return (
        <div style={{margin:20}}>
            <img src={image} alt={`pic of ${name}`} width="140"/><br/>
            <span>{name}</span>
            <span>{arena}</span>
        </div>
    );
};

const Enemy = ({name, image, arena}) => {
    // Insira sua discussão filosófica aqui
    return <Hero name={name} image={image} arena={arena}/>
};

const Arena = (props) => {
    return (
        <div style={{display: 'inline-block'}}>
            {React.Children.map(props.children, personagem => {
                return React.cloneElement(personagem, {...props})
            })}
        </div>
    );
};

export default () => {
    return (
        <Arena arena="West Coast of the Earth Kingdom">
            <Hero name="Aang" image={aang}/>
            <Enemy name="Ozai" image={ozai}/>
        </Arena>
    );
};

export {Hero, Enemy};
