import {toast} from "react-toastify";

export default function Fail(message: string) {
    const errorToast = () => toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    });
    errorToast();
}