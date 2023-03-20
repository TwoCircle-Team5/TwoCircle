import { headers, url } from "../../requests.js";

export async function productDelete(id) {
  try {
    const res = await fetch(url + "/products/" + id, {
      method: "DELETE",
      headers: {
        ...headers,
        masterKey: true,
      },
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
