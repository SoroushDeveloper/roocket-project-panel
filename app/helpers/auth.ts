import Cookies from "universal-cookie";

const storeLoginToken = async (token: string) => {
    await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token}),
    });
}

const removeLoginToken = async () => {
    let cookie = new Cookies();
    cookie.remove('verifyToken');
    await fetch('/admin/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export {storeLoginToken, removeLoginToken};