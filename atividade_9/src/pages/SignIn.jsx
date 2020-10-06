import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import Button from '../components/Button';
import Input from '../components/Input';

import { connect } from 'react-redux';
import {SignIn as SignInAction} from '../store/actions/Auth';

const SignIn = ({message, signIn}) => {
    const [warn, setWarn] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Digite um email válido!")
            .required("Campo obrigatório."),
        senha: Yup.string()
            .min(6, "A senha deve ter no minímo 6 caracteres!")
            .required("Campo obrigatório.")
    });
    return (
        <>
        <h4>Entrar</h4>
        <Formik initialValues={{email: "", senha: ""}} validationSchema={validationSchema}
            onSubmit={({email, senha}, {setSubmitting}) => {
                signIn(email, senha, () => {
                    setWarn(true);
                });
                setSubmitting(false);
            }}>
            { props => (
                <Form>
                    <Input name="email" type="email"/>
                    <Input name="senha" type="password"/>
                    <Button value="Entrar"/>
                </Form>
            )}
        </Formik>
        {warn && <div className={`alert alert-info`}>
                {message}
            </div>}
        </>
    );
};


export default connect(
    // map State to Props
    ({AuthReducer}) => ({...AuthReducer}),
    // map Dispatch to Props
    (dispatch) => ({
        signIn: (login, senha, callback) => {dispatch(SignInAction(login, senha, callback))}
    })
)(SignIn);
