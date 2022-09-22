const baseUrl = 'https://localhost:44377/orion.api';

export const createPost = async <T>({
  title,
  content,
  communityName,
  token
}: {
  title: string;
  content: string;
  communityName: string;
  token: string;
}) => {
  const res = await fetch(`${baseUrl}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, content, communityName })
  });
  if (res.ok) {
    const data: Promise<T> = res.json();
    return data;
  }
  throw new Error('Something went wrong.');
};

export const fetchTrendingPosts = async <T>() => {
  const res = await fetch(`${baseUrl}/posts/`);
  if (res.ok) {
    const posts: Promise<T> = res.json();
    return posts;
  }
  throw new Error('Something went wrong.');
};

export const fetchById = async <T>(postId: string) => {
  const res = await fetch(`${baseUrl}/posts/${postId}`);
  if (res.ok) {
    const data: Promise<T> = res.json();
    return data;
  }
  throw new Error('Post does not exist.');
};
