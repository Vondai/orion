const baseUrl = "https://localhost:44377/orion.api";

export const create = (comment, postId, token) => {
  return fetch(`${baseUrl}/comment/create`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment, postId }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
};

export const get = (postId) => {
  return fetch(`${baseUrl}/comment/${postId}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};
