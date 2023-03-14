import { headers, url } from "../requests.js";

export async function authCheck(accessToken) {
  if(!accessToken){
    return null
  } 
  const res = await fetch(url + "/auth/me", {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    }
  })
  if(res.status !== 200) {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("pwCheck")
    return null;
  }
  return await res.json();
}