import { admin } from '../source/js/admin/admin';

export function adminWrap() {
  const wrap = document.querySelector('#wrap');
  wrap.innerHTML = /* html */ `
    <header>
      <div class="top">
        <h1 class="logo">
          <a href="/" data-navigo>
            <img src="/image/logo.png" alt="로고"/></a>
        </h1>
        <div class="top_inner">
          <span class="email">admin@naver.com</span>
          <span class="log_out">로그아웃</span>
        </div>
      </div>
    </header>
    <div class="admin_container">
       <div class="dot-wrap admin_dot">
        <div class="dot-spinner"></div>
      </div>
      <div class="menu">
        <ul class="menu_list">
          <li class="menu_prd_list"><a href="/admin" data-navigo>상품 리스트</a></li>
          <li class="menu_prd_add"><a href="/admin/product_add" data-navigo>상품추가</a></li>
          <li class="menu_user_list"><a href="/admin/user_list" data-navigo>회원 목록</a></li>
          <li class="menu_dashboard"><a href="/admin/dashboard" data-navigo>보고서</a></li>
        </ul>
      </div>
      <div id="admin"></div>
    </div>
  
  `;
  admin();
}
