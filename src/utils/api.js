
export const checkResponse = (res) => {
  // console.log(res);
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export default function request(urlEndpoint, options) {
  const BASE_URL = "https://norma.nomoreparties.space/api";
  const url =`${BASE_URL}/${urlEndpoint}`;
  return fetch(url, options).then(checkResponse)
}