import { router } from "../../route";
import { url, headers } from "../requests";

export async function pwCheckApi(method, data) {
  try {
    const res = await fetch(url + "/auth/login", {
      method,
      headers,
      body: JSON.stringify(data),
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}
