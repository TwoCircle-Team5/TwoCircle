import '../../scss/user/signup.scss';
import { signupHandler } from '../../source/js/signup';

export function signupRender() {
  const app = document.querySelector('#app');
  app.innerHTML = /* html */ `
  <section id="signup"class="signup_section">
    <div class="signup_section_inner">
      <!-- 회원가입 제목 -->
      <h1 class="signup_section_title">회원가입</h1>
      <!-- 회원가입 폼 -->
      <form class="signup_form">
        <!-- 이름 -->
        <div class="signup_form_name">
          <h3>이름<span class="asterisk">*</span></h3>
          <input type="text" class="signup_form_name_input" placeholder="홍길동">
        </div>
        <!-- 아이디(이메일) -->
        <div class="signup_form_id">
          <h3>이메일<span class="asterisk">*</span></h3>
          <input type="text" class="signup_form_id_input" placeholder="TwoCircle@team5.com">
        </div>
        <!-- 비밀번호 -->
        <div class="signup_form_pw">
          <h3>비밀번호<span class="asterisk">*</span></h3>
          <input type="password" class="signup_form_pw_input"
          placeholder="최소 8자 이상">
          <span class="signup_form_pw_error error"></span>
        </div>
        <!-- 비밀번호 확인 -->
        <div class="signup_form_check">
          <h3>비밀번호 확인<span class="asterisk">*</span></h3>
          <input type="password" class="signup_form_check_input" placeholder="비밀번호를 다시 입력해주세요.">
          <span class="signup_form_check_error error"></span>
        </div>
        <!-- 프로필 -->
        <div class="signup_form_profil">
          <h3>프로필</h3>
          <input class="upload_name" value="첨부파일" placeholder="첨부파일" disabled>
          <label for="file">파일찾기</label>
          <input type="file" id="file" class="signup_form_profil_input">
          <p class="signup_form_profil_alert">1MB 이하의 사진만 가능합니다.</p>
          <figure class="signup_form_profil_img"></figure>
        </div>
        <!-- 가입하기 버튼 -->
        <button class="signup_form_btn">가입하기</button>
      </form>
    </div>
  </section>
  `;

  // 회원가입 기능
  signupHandler()
}
