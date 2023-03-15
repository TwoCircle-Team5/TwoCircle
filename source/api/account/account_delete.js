import { headers, url } from "../requests.js";

export async function deleteAccount(data) {
  const res = await fetch(url + `/account`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  return json;
}
