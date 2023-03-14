import { headers, url } from "../requests.js";

export async function checkAccount(data) {
  try {
    const res = await fetch(url + "/account ", {
      method: "GET",
      headers: {
        ...headers,
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
