import { headers, url } from "../../requests.js";

export async function purchaseOk(data) {
  try {
    const res = await fetch(url + "/products/ok", {
      method: "POST",
      headers: {
        ...headers,
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
      body: JSON.stringify({
        detailId: data.detailId,
      }),
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
