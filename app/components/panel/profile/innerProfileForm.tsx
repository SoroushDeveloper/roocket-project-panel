import {Form, FormikProps} from "formik";

import Input from "@/app/components/shared/form/input";
import {ProfileFormValuesInterface} from "@/app/contracts/panel";

const InnerProfileForm = (props: FormikProps<ProfileFormValuesInterface>) => {
    return (
        <Form className="space-y-4 md:space-y-6">
            <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <Input type="text" name="name" label="Name"/>
                </div>
                <div>
                    <Input type="password" name="password" label="Password"/>
                </div>
                <div>
                    <Input type="password" name="confirmation" label="Password Confirmation"/>
                </div>
            </div>
            <div className="flex justify-center">
                <button type="submit"
                        className=" rounded flex items-center bg-none border-2 border-green-500 p-2 text-green-500 hover:bg-green-500 hover:text-gray-100 hover:dark:text-gray-900">
                    Update
                </button>
            </div>
        </Form>
    )
}

export default InnerProfileForm