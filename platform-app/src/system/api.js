import { CONFIG } from "./config";

export const API = {
  postRequest: (url, body, callback) => {
    return fetch(CONFIG.url + url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        callback(res);
      });
  },
};
