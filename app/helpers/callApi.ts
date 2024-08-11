import axios from "axios";

const callApi = () => {
    const axiosInstance = axios.create({
        baseURL: 'https://react-camp-api.roocket.ir/api/admin/'
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            return config;
        },
        err => Promise.reject(err)
    )

    axiosInstance.interceptors.response.use(
        res => {
            // manage validation
            return res;
        },
        err => Promise.reject(err)
    )

    return axiosInstance;
}

export default callApi;