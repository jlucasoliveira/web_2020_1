import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import Button from '../components/Button';
import Input from '../components/Input';

import {connect} from 'react-redux';
import {SignUp as SignUpAction} from '../store/actions/Auth';

const SignUp = ({message, signUp}) => {
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
        <h4>Cadastro</h4>
        <Formik initialValues={{email: "", senha: ""}} validationSchema={validationSchema}
            onSubmit={({email, senha}, {setSubmitting}) => {
                signUp(email, senha, () => {
                    if (message) setWarn(true);
                });
                setSubmitting(false);
            }}>
            { props => (
                <Form>
                    <Input name="email" type="email"/>
                    <Input name="senha" type="password"/>
                    <Button value="Cadastrar-se"/>
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
    // map Dispacth to Props
    (dispatch) => ({
        signUp: (login, senha, callback) => {dispatch(SignUpAction(login, senha, callback))},
    })
)(SignUp);