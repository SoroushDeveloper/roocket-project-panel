import {withFormik} from "formik";
import * as yup from 'yup';

import callApi from "@/app/helpers/callApi";
import ValidationError from "@/app/exceptions/validationError";
import {ProfileFormValuesInterface} from "@/app/contracts/panel";
import InnerProfileForm from "@/app/components/panel/profile/innerProfileForm";
import Success from "@/app/components/toasts/success";
import Cookies from "universal-cookie";

const profileFormValidationSchema = yup.object().shape({
    name: yup.string(),
    password: yup.string().length(8),
    confirmation: yup.string()
        .when('password', (password: any, schema) =>
            password && password != ''
                ? schema.required('Please confirm your password').oneOf([yup.ref('password')], 'Passwords must match')
                : schema.notRequired()
        ),
})

interface ProfileFormProps {
    name: string,
}

const cookie = new Cookies;
const token = cookie.get('verifyToken');

const ProfileForm = withFormik<ProfileFormProps, ProfileFormValuesInterface>({
    mapPropsToValues: props => ({
        name: props.name,
    }),
    validationSchema: profileFormValidationSchema,
    handleSubmit: async (values, {props, setFieldError}) => {
        try {
            if (values.name && values.name != '') {
                const nameRes = await callApi().patch('/profile/update-info', {
                    name: values.name,
                }, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                });
                if (nameRes.status === 200) {
                    Success('Name updated successfully')
                }
            }
            if (values.password && values.password != '' && values.confirmation && values.confirmation != '') {
                const res = await callApi().patch('/profile/update-password',
                    {
                        password: values.password,
                        password_confirmation: values.confirmation
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + token,
                        }
                    });
                if (res.status === 200) {
                    Success('Password updated successfully')
                }
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                Object.entries(error.messages).forEach(([key, value]) => setFieldError(key, value as string))
            }
        }
    }
})(InnerProfileForm)

export default ProfileForm