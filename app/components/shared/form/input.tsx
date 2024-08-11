import {ErrorMessage, Field} from "formik";
import {FC} from "react";

interface InputProps {
    name: string,
    label: string,
    type?: string,
    inputClassName?: string,
    labelClassName?: string,
    errorClassName?: string,
}

const Input: FC<InputProps> = ({
                                   name,
                                   label,
                                   type = 'text',
                                   inputClassName,
                                   labelClassName,
                                   errorClassName,
                               }) => {
    return (
        <>
            <label htmlFor={name} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClassName ?? ''}`}>
                {label}
            </label>
            <Field id={name} name={name} type={type}
                   className={`mt-1 bg-gray-100 dark:bg-gray-900 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${inputClassName ?? ''}`}/>
            <ErrorMessage name={name} className={`text-red-500 text-sm ${errorClassName ?? ''}`} component="div"/>
        </>
    );

}

export default Input;