import React, {useRef, useCallback, useState} from 'react';
import {connect} from 'react-redux';
import Input from '../components/Input';
import SignUpAction from '../store/actions/SignUp';

const SignUp = ({message, signUp}) => {
    const [warn, setWarn] = useState(false);
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        signUp(email, password);
        setWarn(true)

    }, [signUp]);

    return (
        <>
            <form onSubmit={onSubmit} style={{width: "40vw"}}>
                <Input lblName="Email" inputRef={emailRef} type="email"/>
                <Input lblName="Senha" inputRef={passwordRef} type="password"/>
                <input type="submit" value="Cadastrar-se" className="btn btn-primary"/>
            </form>
            {warn && <div className="alert alert-danger">
                {message}
            </div>}
        </>
    );
};

export default connect(
    // map State to Props
    ({AuthReducer}) => ({...AuthReducer}),
    // map Dispacth to Props
    (dispatch) => ({
        signUp(login, password){dispatch(SignUpAction(login, password))},
    })
)(SignUp);