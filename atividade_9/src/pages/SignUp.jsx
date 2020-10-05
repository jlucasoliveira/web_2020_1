import React, {useRef, useCallback, useState} from 'react';
import {connect} from 'react-redux';
import Input from '../components/Input';
import {SignUp as SignUpAction} from '../store/actions/Auth';

const SignUp = ({message, signUp}) => {
    const [warn, setWarn] = useState(false);
    const [load, setLoad] = useState(false);
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setLoad(true);
        
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        signUp(email, password, () => {
            if (message) {
                setWarn(true);
                setLoad(false);
            }
        });

    }, [signUp, message]);

    return (
        <>
            <h4>Cadastro</h4>
            {load && <h6>carregando...</h6>}
            <form onSubmit={onSubmit} style={{width: "40vw"}}>
                <Input lblName="Email" inputRef={emailRef} type="email"/>
                <Input lblName="Senha" inputRef={passwordRef} type="password"/>
                <input type="submit" value="Cadastrar-se" className="btn btn-primary"/>
            </form>
            {warn && <div className={`alert alert-info`}>
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
        signUp: (login, password, callback) => {dispatch(SignUpAction(login, password, callback))},
    })
)(SignUp);