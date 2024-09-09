import {withFormik} from "formik";
import * as yup from 'yup';

import {LoginFormValuesInterface} from "@/app/contracts/auth";
import InnerLoginForm from "@/app/components/auth/innerLoginForm";
import callApi from "@/app/helpers/callApi";
import ValidationError from "@/app/exceptions/validationError";
import Router from "next/router";

const loginFormValidationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().length(8),
})

interface LoginFormProps {
    setToken: (token: string) => void
}

const LoginForm = withFormik<LoginFormProps, LoginFormValuesInterface>({
    mapPropsToValues: props => ({
        email: '',
        password: '',
    }),
    validationSchema: loginFormValidationSchema,
    handleSubmit: async (values, {props, setFieldError}) => {
        try {
            const res = await callApi().post('/login', values);
            if (res.status === 200) {
                props.setToken(res.data.token);
                await Router.push('/panel')
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                Object.entries(error.messages).forEach(([key, value]) => setFieldError(key, value as string))
            }
        }
    }
})(InnerLoginForm)

export default LoginForm