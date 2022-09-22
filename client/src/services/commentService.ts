const baseUrl = 'https://localhost:44377/orion.api';

export const createComment = async <T>({
  comment,
  postId,
  token
}: {
  comment: string;
  postId: string;
  token: string;
}) => {
  const res = await fetch(`${baseUrl}/comments`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ comment, postId })
  });
  if (res.ok) {
    const data: Promise<T> = res.json();
    return data;
  }
  throw new Error('Something went wrong while creating your comment.');
};
