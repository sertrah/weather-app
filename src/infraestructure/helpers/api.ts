import { fetchJSON } from "infraestructure/helpers";

const API_URL = `${process.env.REACT_APP_DOMAIN}`;

function call(
  path: string,
  options: { headers?: any; method?: string; body?: any } = {}
) {
  const url = `${API_URL}/${path}`;

  return fetchJSON(url, options).catch((error: any) => {
    return Promise.reject(error);
  });
}

const get = (path: string) => {
  return call(path, { method: "GET" });
};

export const api = { call, get };
