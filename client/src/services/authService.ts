const baseUrl = 'https://localhost:44377/orion.api';

export const signUp = async (username: string, password: string) => {
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

export const signIn = async <T>(username: string, password: string) => {
  const res = await fetch(`${baseUrl}/user/signin`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({ username, password })
  });
  if (res.ok) {
    const data: Promise<T> = res.json();
    return data;
  }
  throw new Error('Wrong username or password.');
};
