const defaultMessage = ({ status, statusText }) =>
  statusText || `${status} error code occurred`;

export async function fetchJSON(url, options = {}) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  options.headers = options.headers
    ? {
        ...headers,
        ...options.headers
      }
    : headers;

  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, options);

  try {
    const json = await response.json();
    return response.ok
      ? json
      : Promise.reject({
          ...json,
          status: json.status || response.status,
          message: json.message || defaultMessage(response)
        });
  } catch (error) {
    return response.ok
      ? {}
      : Promise.reject({
          status: response.status,
          message: defaultMessage(response)
        });
  }
}
