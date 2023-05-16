import { signUp } from '../../source/api/certified/signup_api';

export function signupHandler() {
  const signUpForm = document.querySelector('.signup_form');

  let profileImgBase64 = '';

  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // 비밀번호 확인
    const pwCheck = e.target[3].value;
    // 전송 할 Body
    const body = {
      // 각 Input에 해당하는 Value
      email: e.target[1].value,
      password: e.target[2].value,
      displayName: e.target[0].value,
      profileImgBase64,
    };
    // 비밀번호가 일치하면 전송
    if (body.password.length < 7) {
      return alert('비밀번호가 옳바르지 않습니다.');
    }
    if (body.password != pwCheck) {
      return alert('비밀번호가 일치하지 않습니다.');
    }
    return signUp('POST', body);
  });

  // 비밀번호 일치 확인

  const pw = document.querySelector('.signup_form_pw_input');
  const pwCheck = document.querySelector('.signup_form_check_input');

  // 비밀번호
  pw.addEventListener('input', (e) => {
    const err = document.querySelector('.signup_form_pw_error');
    const inputBox = document.querySelector('.signup_form_pw_input:focus');
    if (e.target.value.length > 7) {
      err.textContent = '사용 가능한 비밀번호 입니다.';
      err.style.color = '#2DB400';
      inputBox.style.border = '1px solid #2DB400';
    } else {
      err.textContent = '8자 이상의 비밀번호를 입력하세요.';
      err.style.color = 'var(--pink-color)';
      inputBox.style.border = '1px solid var(--pink-color)';
    }
  });

  // 비밀번호 일치 여부
  pwCheck.addEventListener('input', (e) => {
    const err = document.querySelector('.signup_form_check_error');
    const inputBox = document.querySelector('.signup_form_check_input:focus');
    if (e.target.value === pw.value && e.target.value) {
      err.textContent = '비밀번호가 일치합니다.';
      err.style.color = '#2DB400';
      inputBox.style.border = '1px solid #2DB400';
    } else if (e.target.value != pw.value || !e.target.value) {
      err.textContent = '비빌번호가 일치하지 않습니다!';
      err.style.color = 'var(--pink-color)';
      inputBox.style.border = '1px solid var(--pink-color)';
    }
  });

  // 이미지 파일 업로드
  const uploadName = document.querySelector('.upload_name');
  const inputImgEl = document.querySelector(".signup_form_profil_input[type='file']");
  const figureEl = document.querySelector('.signup_form_profil_img');
  inputImgEl.addEventListener('change', () => {
    const file = inputImgEl.files[0];
    if (file.size <= 1000000) {
      uploadName.setAttribute('value', file.name);
      figureEl.style.border = '1px solid #2DB400';
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', (e) => {
        const imgEl = document.createElement('img');
        imgEl.src = e.target.result;
        profileImgBase64 = e.target.result;
        figureEl.innerHTML = '';
        figureEl.append(imgEl);
      });
    } else {
      figureEl.innerHTML = '';
      figureEl.style.border = '1px solid var(--pink-color)';
    }
  });
}
