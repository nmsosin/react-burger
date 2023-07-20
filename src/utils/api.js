
export const checkResponse = (res) => {
  // console.log(res);
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export default function request(urlEndpoint, options) {
  const BASE_URL = "https://norma.nomoreparties.space/api";
  const url =`${BASE_URL}/${urlEndpoint}`;
  return fetch(url, options).then(checkResponse)
}

// token processing
export const refreshToken = () => {
  const BASE_URL = "https://norma.nomoreparties.space/api";
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkResponse)
}

export const fetchWithRefresh = async (urlEndpoint, options) => {
  const BASE_URL = "https://norma.nomoreparties.space/api";
  const url =`${BASE_URL}/${urlEndpoint}`;
  try {
    const res = await (fetch(url, options));
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch (url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};