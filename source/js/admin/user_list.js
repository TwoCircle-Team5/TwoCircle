import { userlist } from "../../api/products/admin/user_list_api.js";

export async function userListHandler() {
  const users = await userlist();
  let userList = [...users];

  const liEl = userList.map((list, index) => {
    const listEl = document.createElement("div");
    listEl.classList.add("list");
    const numberEl = document.createElement("div");
    numberEl.classList.add("list_number");
    const nameEl = document.createElement("div");
    nameEl.classList.add("list_name");
    const emailEl = document.createElement("div");
    emailEl.classList.add("list_email");
    const profileEl = document.createElement("div");
    profileEl.classList.add("list_profile");

    numberEl.innerHTML = `${index + 1}`;
    nameEl.innerHTML = `${list.displayName}`;
    emailEl.innerHTML = `${list.email}`;
    profileEl.innerHTML = `<img src="${list.profileImg}" alt="프로필">`;

    listEl.append(numberEl, nameEl, emailEl, profileEl);
    return listEl;
  });
  const adminUserListEl = document.querySelector(".admin_userlist");
  adminUserListEl.append(...liEl);
}
