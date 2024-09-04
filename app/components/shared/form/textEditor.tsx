import dynamic from 'next/dynamic';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import {FieldInputProps, FormikProps} from 'formik';

interface TextEditorProps {
    field: FieldInputProps<string>;
    form: FormikProps<any>;
}

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
});

const TextEditor: React.FC<TextEditorProps> = ({field, form}) => {
    const handleChange = (content: string) => {
        form.setFieldValue(field.name, content);
    };
    return (
        <ReactQuill
            value={field.value}
            onChange={handleChange}
            modules={{
                toolbar: [
                    [{'header': '1'}, {'header': '2'}, {'font': []}],
                    [{size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'},
                        {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image', 'video'],
                    ['clean']
                ],
            }}
            formats={[
                'header', 'font', 'size',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image', 'video'
            ]}
            className="bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    );
};

export default TextEditor;