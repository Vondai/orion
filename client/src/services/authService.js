const baseUrl = 'https://localhost:44377/orion.api';

export const signUp = async (username, password) => {
    let res = await fetch(`${baseUrl}/user/signUp`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    let jsonResult = await res.json();

    return jsonResult;
};

export const signIn = async (username, password) => {
    let res = await fetch(`${baseUrl}/user/signin`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password })
    });

    let jsonResult = await res.json();

    if (jsonResult.username) {
        return jsonResult;
    }

    throw new Error('Invalid username or password.');
};