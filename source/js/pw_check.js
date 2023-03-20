import { pwCheckApi} from '../api/certified/pw_check_api';
import { authCheck } from '../api/certified/authcheck_api';
import { accountRender } from '../../pages/user/account';
import { userInfoRender } from '../../pages/user/user_information';
import { async } from 'q';

export async function pwCheck(url) {
  const inputPwEl = document.querySelector('.pw_check_section_input');
  const pwCheckBtnEl = document.querySelector('.pw_check_section_btn');
  
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const auth = await authCheck(accessToken);
  let id = auth.email;
  let pw_check = '';
  let login_check = false;
  let loginResult = '';
  inputPwEl.addEventListener('input', (e) => {
    pw_check = e.target.value;
  });

  pwCheckBtnEl.addEventListener('click', async (e) => {
    e.preventDefault();
    const body = {
      email: id,
      password: pw_check,
    };

    const res = await pwCheckApi('POST', body);
    // try {
    //     loginResult = await pwCheckApi("POST", body, login_check);
    //     console.log(loginResult);
    //     login_check = loginResult.status;
    //     console.log(login_check);
    // }
    // catch (error) {

    // }
    if (res.status === 200) {
      //alert('비밀번호 확인 성공!');
      if(url === "mypage/account"){
        accountRender()
      }else{
        userInfoRender()
      }
    } else {
      alert('비밀번호 확인이 잘못되었습니다.');
    }
  });
}
