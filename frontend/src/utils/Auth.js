const BASE_URL = "https://api.reactmestofull.nosovp.nomoredomainsclub.ru";

function checkRes(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const register = ({email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then(checkRes)
};

export const login = ({email, password}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
  .then(checkRes)
};



export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkRes);
};