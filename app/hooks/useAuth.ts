import useSWR from "swr";
import callApi from "@/app/helpers/callApi";
import {useAppDispatch, useAppSelector} from "@/app/hooks/index";
import {selectVerifyToken, updateUser} from "@/app/store/auth";
import Cookies from "universal-cookie";

const useAuth = () => {
    const dispatch = useAppDispatch();
    const cookie = new Cookies;

    useAppSelector(selectVerifyToken);
    const {data, error} = useSWR('user-me', () => {
        return callApi().get('current-user', {
            headers: {
                Authorization: 'Bearer ' + cookie.get('verifyToken'),
            },
        });
    })

    // @ts-ignore
    dispatch(updateUser(data?.data?.name))

    return {user: data?.data?.name, error, loading: !data && !error}
}

export default useAuth;