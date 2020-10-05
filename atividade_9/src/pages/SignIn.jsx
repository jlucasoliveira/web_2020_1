import React, {useRef, useCallback} from 'react';
import Input from '../components/Input';

export default () => {

    const emailRef = useRef("");
    const passwordRef = useRef("");

    const onSubmit = useCallback((e) => {
        e.preventDefault();



    }, []);

    return (
        <form onSubmit={onSubmit} style={{width: "40vw"}}>
            <Input lblName="Email" inputRef={emailRef} type="email"/>
            <Input lblName="Senha" inputRef={passwordRef} type="password"/>
            <input type="submit" value="Logar" className="btn btn-primary"/>
        </form>
    );
}
