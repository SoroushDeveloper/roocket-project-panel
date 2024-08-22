import {withFormik} from "formik";
import * as yup from 'yup';

import callApi from "@/app/helpers/callApi";
import ValidationError from "@/app/exceptions/validationError";
import {ArticleFormValuesInterface, ProfileFormValuesInterface} from "@/app/contracts/panel";
import InnerProfileForm from "@/app/components/panel/profile/innerProfileForm";
import Success from "@/app/components/toasts/success";
import Cookies from "universal-cookie";
import InnerCreateArticleForm from "@/app/components/panel/articles/innerCreateArticleForm";
import {Dispatch} from "react";
import Article from "@/app/models/article";
import Router from "next/router";

const profileFormValidationSchema = yup.object().shape({
    title: yup.string().required(),
    slug: yup.string().required(),
    category_id: yup.number().required(),
    is_published: yup.boolean().required(),
    keywords: yup.string(),
    description: yup.string(),
    summary: yup.string(),
    content: yup.string(),
    image_url: yup.string(),
})

interface ArticleFormProps {
}

const cookie = new Cookies;
const token = cookie.get('verifyToken');

const ProfileForm = withFormik<ArticleFormProps, ArticleFormValuesInterface>({
    mapPropsToValues: props => ({
        slug: '',
        title: '',
        category_id: 0,
        is_published: false,
        keywords: '',
        description: '',
        summary: '',
        content: '',
        image_url: '',
    }),
    validationSchema: profileFormValidationSchema,
    handleSubmit: async (values, {props, setFieldError}) => {
        console.log(values)
        try {
            const res = await callApi().post('/article', values, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            if (res.status === 200) {
                await Router.push('/panel/articles')
                Success('Article submitted successfully')
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                Object.entries(error.messages).forEach(([key, value]) => setFieldError(key, value as string))
            }
        }
    }
})(InnerCreateArticleForm)

export default ProfileForm