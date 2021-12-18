const baseUrl = 'https://localhost:5001/orion.api';

export const signUp = (username, password) => {
    return fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({username, password })
    })
    .then(res => res.json())
    .catch();
}