import { headers, url } from "../requests.js";

/** 계좌 등록및 추가하는 함수 */
export async function addAccount(data) {
  const res = await fetch(url + "/account ", {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
}
