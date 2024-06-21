const BASE_URL = "http://localhost:3000/api/";

const request = async (endpoint, method = "GET", body = null, headers = {}) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  console.log("Request Config:", config);
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();
    console.log("dataaaa", data);
    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }
    return data;
  } catch (error) {
    console.error(`Error during ${method} request to ${endpoint}:`, error);
    throw error;
  }
};

export const get = (endpoint, headers = {}) =>
  request(endpoint, "GET", null, headers);
export const post = (endpoint, body, headers = {}) =>
  request(endpoint, "POST", body, headers);
export const put = (endpoint, body, headers = {}) =>
  request(endpoint, "PUT", body, headers);
export const del = (endpoint, headers = {}) =>
  request(endpoint, "DELETE", null, headers);
