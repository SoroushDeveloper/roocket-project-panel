import {Form, FormikProps} from "formik";

import Input from "@/app/components/shared/form/input";
import {LoginFormValuesInterface} from "@/app/contracts/auth";

const InnerLoginForm = (props: FormikProps<LoginFormValuesInterface>) => {
    return (
        <Form className="space-y-4 md:space-y-6">
            <div>
                <Input type="email" name="email" label="Email" inputClassName="bg-gray-300 dark:bg-gray-700"/>
            </div>
            <div>
                <Input type="password" name="password" label="Password" inputClassName="bg-gray-300 dark:bg-gray-700"/>
            </div>
            <button type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
            </button>
        </Form>
    )
}

export default InnerLoginForm