const baseUrl = 'https://localhost:44377/orion.api';

export const createPost = (
  title: string,
  content: string,
  community: string,
  token: string
) => {
  return fetch(`${baseUrl}/post/create`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, content, community })
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const fetchTrending = async <T>() => {
  const res = await fetch(`${baseUrl}/posts/`);
  if (res.ok) {
    const posts: Promise<T> = res.json();
    return posts;
  }
  throw new Error('Something went wrong.');
};

export const getById = (postId: string) => {
  return fetch(`${baseUrl}/post/${postId}`)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
};
