import { logout } from '../../api/certified/logout_api.js';
import { authCheck } from '../../api/certified/authcheck_api.js';
import { loading } from '../loading.js';

export async function admin() {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const auth = await authCheck(accessToken);
  const email = document.querySelector('.email');
  const logoutBtn = document.querySelector('.log_out');
  const menuLi = document.querySelector('.menu_list li');
  loading();

  // 로그아웃
  email.innerText = auth.email;
  logoutBtn.addEventListener('click', async () => {
    await logout(accessToken);
    localStorage.removeItem('accessToken');
    localStorage.removeItem("payment");
    location.href = '/';
  });
}