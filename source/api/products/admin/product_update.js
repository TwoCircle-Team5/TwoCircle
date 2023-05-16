import { headers, url } from "../../requests.js";

export async function product(id, data) {
  try {
    const res = await fetch(url + "/products/" + id, {
      method: "PUT",
      headers: {
        ...headers,
        masterKey: true,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
