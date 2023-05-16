import { headers, url } from "../../requests";

export async function searchProduct(data) {
  try {
    const res = await fetch(url + "/products/search", {
      method: "POST",
      headers: {
        ...headers,
      },
      body: JSON.stringify({ ...data }),
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
