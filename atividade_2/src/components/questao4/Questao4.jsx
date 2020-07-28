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
    // Insira sua discução filosófica aqui
    return <Hero name={name} image={image}/>
};

const Arena = (props) => {
    return (
        <div style={{display: 'inline-block'}}>
            <fieldset>
                <legend>Arena: {props.arena}</legend>
                {React.Children.map(props.children, personagem => {
                    return React.cloneElement(personagem, {...props})
                })}
            </fieldset>
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
