
export const checkResponse = (res) => {
  // console.log(res);
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export default function request(urlEndpoint, options) {
  const BASE_URL = "https://norma.nomoreparties.space/api";
  const url =`${BASE_URL}/${urlEndpoint}`;
  return fetch(url, options).then(checkResponse)
}

//TODO: refactor login request
export const loginRequest = async form => {
  return await fetch('https://norma.nomoreparties.space/api/auth/login', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};