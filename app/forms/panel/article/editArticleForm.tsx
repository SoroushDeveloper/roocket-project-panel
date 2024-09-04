import {withFormik} from "formik";
import * as yup from 'yup';

import callApi from "@/app/helpers/callApi";
import ValidationError from "@/app/exceptions/validationError";
import {ArticleFormValuesInterface} from "@/app/contracts/panel";
import Success from "@/app/components/toasts/success";
import Cookies from "universal-cookie";
import InnerEditArticleForm from "@/app/components/panel/articles/innerEditArticleForm";
import Router from "next/router";

const editArticleFormValidationSchema = yup.object().shape({
    title: yup.string().required(),
    slug: yup.string().required(),
    category_id: yup.number().required(),
    is_published: yup.boolean().required(),
    keywords: yup.string().nullable(),
    description: yup.string().nullable(),
    summary: yup.string().nullable(),
    content: yup.string().nullable(),
    image_url: yup.string().nullable(),
})

interface ArticleFormProps {
    article: ArticleFormValuesInterface,
}

const cookie = new Cookies;
const token = cookie.get('verifyToken');

const EditArticleForm = withFormik<ArticleFormProps, ArticleFormValuesInterface>({
    mapPropsToValues: props => ({
        slug: props.article.slug,
        title: props.article.title,
        category_id: props.article.category_id,
        is_published: props.article.is_published,
        keywords: props.article.keywords,
        description: props.article.description,
        summary: props.article.summary,
        content: props.article.content,
        image_url: props.article.image_url,
    }),
    validationSchema: editArticleFormValidationSchema,
    handleSubmit: async (values, {props, setFieldError}) => {
        try {
            const res = await callApi().patch('/article/' + props.article.slug, values, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            if (res.status === 200) {
                await Router.push('/panel/articles')
                Success('Article updated successfully')
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                Object.entries(error.messages).forEach(([key, value]) => setFieldError(key, value as string))
            }
        }
    }
})(InnerEditArticleForm)

export default EditArticleForm