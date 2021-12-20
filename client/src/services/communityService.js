const baseUrl = 'https://localhost:44377/orion.api';

export const create = (title, description, token) => {
    return fetch(`${baseUrl}/community/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description })
    })
    .then(res => res.json())
    .catch(error => {
        console.log(error);
    });
}