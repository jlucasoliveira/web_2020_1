import React, {useState} from 'react';
import {useFormik} from 'formik';
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
        password: Yup.string()
            .min(6, "A senha deve ter no minímo 6 caracteres!")
            .required("Campo obrigatório.")
    });

    const formik = useFormik({
        initialValues: {email: "", password: ""},
        validationSchema,
        onSubmit: ({email, password}) => {
            signUp(email, password, () => {
                if (message) setWarn(true);
            });
        }
    });

    const {errors, touched} = formik;

    return (
        <>
            <h4>Cadastro</h4>
            <form onSubmit={formik.handleSubmit} style={{width: "40vw"}}>
                <Input name="email" type="email" {...formik.getFieldProps("email")} touched={touched['email']}
                    error={errors['email']}/>
                <Input name="senha" type="password" {...formik.getFieldProps("password")} touched={touched['password']}
                    error={errors['password']}/>
                <Button value="Cadastrar-se"/>
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