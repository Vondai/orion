const baseUrl = 'https://localhost:44377/orion.api';

export const create = (title, content, community, token) => {
    return fetch(`${baseUrl}/post/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, community })
    })
    .then(res => res.json())
    .catch(error => {
        console.log(error);
    });
}

export const getAll = () => {
    return fetch(`${baseUrl}/post/all`)
    .then(res => res.json())
    .catch(error => {
        console.log(error);
    });
}