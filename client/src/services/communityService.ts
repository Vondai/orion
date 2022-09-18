const baseUrl = 'https://localhost:44377/orion.api';

export const create = (title: string, description: string, token: string) => {
  return fetch(`${baseUrl}/community/create`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, description })
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getTop = () => {
  return fetch(`${baseUrl}/community/listing/top`, {
    headers: {
      'content-type': 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
};

export const getCommunityDetails = (communityName: string, token: string) => {
  return fetch(`${baseUrl}/community/${communityName}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => res.json());
};

export const getCommunityPosts = (communityName: string) => {
  return fetch(`${baseUrl}/post/get/${communityName}`).then((res) =>
    res.json()
  );
};

export const manageCommunity = async (
  communityName: string,
  token: string,
  action: string
) => {
  const body = {
    communityName,
    action
  };
  const res = await fetch(`${baseUrl}/communities`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  return res.json();
};

export const fetchCommunity = async (communityName: string, token: string) => {
  const res = await fetch(`${baseUrl}/communities/${communityName}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (res.status === 404) {
    throw new Error('Community not found.');
  }
  return res.json();
};
