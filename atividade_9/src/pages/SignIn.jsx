import React, {useRef, useCallback, useState} from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import {SignIn as SignInAction} from '../store/actions/Auth';

const SignIn = ({message, signIn}) => {
    const [warn, setWarn] = useState(false);
    const [load, setLoad] = useState(false);
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setLoad(true);

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        signIn(email, password, () => {
            setWarn(true);
            setLoad(false);
        });
    }, [signIn]);

    return (
        <>
            <h4>Logar</h4>
            {load && <h6>carregando...</h6>}
            <form onSubmit={onSubmit} style={{width: "40vw"}}>
                <Input lblName="Email" inputRef={emailRef} type="email"/>
                <Input lblName="Senha" inputRef={passwordRef} type="password"/>
                <input type="submit" value="Logar" className="btn btn-primary"/>
            </form>
            {warn && <div className="alert alert-danger">
                {message}
            </div>}
        </>
    );
}

export default connect(
    // map State to Props
    ({AuthReducer}) => ({...AuthReducer}),
    // map Dispatch to Props
    (dispatch) => ({
        signIn: (login, password, callback) => {dispatch(SignInAction(login, password, callback))}
    })
)(SignIn);
