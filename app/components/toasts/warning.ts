import {toast} from "react-toastify";

export default function Warning(message: string) {
    const warningToast = () => toast.warn(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    });
    warningToast();
}