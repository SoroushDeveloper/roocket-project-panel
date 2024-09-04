import {ErrorMessage, Field} from "formik";
import React, {FC, useState} from "react";

interface RadioProps {
    id : string,
    name: string,
    label: string,
    inputClassName?: string,
    labelClassName?: string,
    errorClassName?: string,
    value: string|boolean|number,
}

const Radio: FC<RadioProps> = ({
                                   id,
                                   name,
                                   label,
                                   value,
                                   inputClassName,
                                   labelClassName,
                                   errorClassName,
                               }) => {
    return (
    <>    
        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <Field id={id} name={name} type="radio" value={value}
                   className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${inputClassName ?? ''}`}/>
            <label htmlFor={name}
                   className={`w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${labelClassName ?? ''}`}>
                {label}
            </label>
            <ErrorMessage name={name} component="div"
                          className={`mt-2 p-1 text-center rounded-md opacity-75 bg-red-500 text-gray-100 dark:text-gray-900 text-sm ${errorClassName ?? ''}`}/>
        </div>
        </>
    );

}

export default Radio;