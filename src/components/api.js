const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "b8df9e7d-b568-40ba-8f5a-580c29dc72c3",
    "Content-Type": "application/json",
  },
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка в then: ${res.status}`);
}

export function apiRequest(apiRequestConfig) {
  return fetch(`${apiConfig.baseUrl}/${apiRequestConfig.url}`, {
    method: `${apiRequestConfig.method}`,
    headers: apiConfig.headers,
    body: JSON.stringify(apiRequestConfig.body),
  }).then(handleResponse);
}

export function catchError(err) {
  console.log(`Ошибка в catch: ${err}`);
}
