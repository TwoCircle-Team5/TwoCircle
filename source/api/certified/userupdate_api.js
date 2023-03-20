import { headers, url } from "../requests.js";

export async function userupdate(data) {
  try {
    const res = await fetch(url + "/auth/user", {
      method: "PUT",
      headers: {
        ...headers,
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
      body: JSON.stringify({
        displayName: data.displayName,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        profileImgBase64: data.profileImgBase64,
      }),
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
