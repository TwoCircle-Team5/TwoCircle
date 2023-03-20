import { headers, url } from "../../requests.js";

export async function allProduct() {
  try {
    const res = await fetch(url + "/products", {
      method: "GET",
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
