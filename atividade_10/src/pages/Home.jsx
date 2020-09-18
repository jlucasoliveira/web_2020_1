import React from 'react';
import './Home.css';
import Input from '../components/Input';
import ResultBox from '../components/ResultBox';

export default () => {
    return (
        <div className="container">
            <div className="">
                <Input idx={0}/>
                <Input idx={1}/>
            </div>
            <div className="line">
                <ResultBox type="soma"/>
                <ResultBox type="mult"/>
                <ResultBox type="maior"/>
            </div>
        </div>
    );
}