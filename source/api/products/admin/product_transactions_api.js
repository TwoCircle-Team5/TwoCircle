import { headers, url } from "../../requests.js";

export async function transactionDetail() {
  try {
    const res = await fetch(url + "/products/transactions/all", {
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
