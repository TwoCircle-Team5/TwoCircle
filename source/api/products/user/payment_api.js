import { headers, url } from "../../requests.js";

export async function payment(productId, accountId) {
  try {
    const res = await fetch(url + "/products/buy", {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
      body: JSON.stringify({
        productId: productId.id,
        accountId: accountId.id,
      }),
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
