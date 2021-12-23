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

export const getTop = () => {
    return fetch(`${baseUrl}/community/listing/top`, {
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(error => {
        console.log(error);
    })
}

export const getCommunityDetails = (communityName, token) => {
    return fetch(`${baseUrl}/community/${communityName}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(res => res.json());
}

export const getCommunityPosts = (communityName) => {
    return fetch(`${baseUrl}/post/get/${communityName}`)
    .then(res => res.json());
}

export const joinCommunity = (communityName, token) => {
    return fetch(`${baseUrl}/community/join`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(communityName)
    })
    .then(res => res.json())
    .catch(error => {
        console.log(error);
    });
}