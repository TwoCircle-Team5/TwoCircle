import { headers, url } from "../../requests.js";

export async function product(id) {
  try {
    const res = await fetch(url + "/products/" + id, {
      method: "GET",
      headers,
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
