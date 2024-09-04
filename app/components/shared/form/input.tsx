import {ErrorMessage, Field} from "formik";
import React, {FC, useState} from "react";

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
            <label htmlFor={name}
                   className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${labelClassName ?? ''}`}>
                {label}
            </label>
            <Field id={name} name={name} type={type}
                   className={`${inputClassName ?? 'bg-gray-200 dark:bg-gray-800'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
            <ErrorMessage name={name} component="div"
                          className={`mt-2 p-1 text-center rounded-md opacity-75 bg-red-500 text-gray-100 dark:text-gray-900 text-sm ${errorClassName ?? ''}`}/>
        </>
    );

}

export default Input;