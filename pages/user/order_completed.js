import { orderCompletedHandler } from "../../source/js/order_completed.js";

export async function orderCompletedRender() {
  const app = document.querySelector("#app");
  app.innerHTML = /* html */ `
  <div id="wrap_order_completed">
    <div class="container_order_completed">
      <div class="order_completed">
        <div class="dot-wrap">
          <div class="dot-spinner dot_loading"></div>
        </div>
        <div class="order_completed_inner">
          <!-- 상단 제목 -->
          <section class="title">
            <h1 class="title_text">주문이 완료되었습니다.</h1>
          </section>
          <!-- 주문내용 -->
          <section class="content">
            <h3 class="content_title">주문정보</h3>
            <div class="content_name">주문자<p class="name_text"></p></div>
            <div class="content_date">주문일자<p class="date_text"></p></div>
            <div class="content_info">주문정보
              <div class="content_info_price">
                <div class="price_info">
                  <p>결제금액</p>
                  <p class="price_text"></p>
                </div>
                <div class="price_info">
                  <p>주문리스트</p>
                  <p class="list_text"></p></div>
                </div>
            </div>
            <div class="content_text">주문 리스트 자세히 보기는 마이페이지/구매목록에서 확인해주세요</div>
            <div class="content_btn">
              <button class="content_mypagebtn">마이페이지</button>
              <button class="content_homebtn">홈으로</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
  `;
  orderCompletedHandler();
}
