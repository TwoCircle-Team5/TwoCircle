import { notFoundHandler } from '../../source/js/404page.js';
export function notFoundRender() {
  const app = document.querySelector('#app');
  app.innerHTML = /*html*/ `
  <div id="wrap">
    <div class="wrap_container">
      <div class="notfound">
        <div class="title">존재하지 않는 페이지 입니다</div>
        <div class="info">3초후 메인페이지로 이동합니다</div>
        <div class="clock"></div>
      </div>
    </div>
  </div>
  `;
  notFoundHandler();
}