import { headers, url } from "../requests.js";

export async function logout(accessToken) {
  const res = await fetch(url + "/auth/logout", {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    }
  });
  if (res.status === 200) {
    alert("๋ก๊ทธ์์!");
  }
  return res.json();
}