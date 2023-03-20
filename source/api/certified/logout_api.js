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
    alert("로그아웃!");
    localStorage.removeItem("pwCheck")
  }
  return res.json();
}