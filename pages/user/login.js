import { loginHandler } from "../../source/js/login";


export function loginRender() {
  const app = document.querySelector("#app");
  app.innerHTML = /* html */ `
  <section id="login" class="login_section">
    <div class="login_section_inner">
      <!-- 로그인 제목 -->
      <h1 class="login_section_title">로그인</h1>
      <form class="login_form">
        <!-- 이메일 입력 -->
        <input type="text" class="login_form_id" placeholder="email">
        <i class="icon_person">
          <img src="../../image/icon-person.png" alt="Person Icon">
        </i>
        <!-- 비빌번호 입력 -->
        <input type="password" class="login_form_pw" placeholder="password">
        <i class="icon_lock">
          <img src="../../image/icon-lock.png" alt="Lock Icon">
        </i>
        <!-- 로그인 버튼 -->
        <button class="login_form_btn btn">로그인</button>
        <a href="/signup">
          <div class="login_section_signup btn">회원가입</div>
        </a>
      </form>
      <!-- 회원가입 버튼 -->
    </div>
  </section>
  `;
  loginHandler()
}
