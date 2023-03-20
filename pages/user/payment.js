import { paymentHandler } from "../../source/js/payment.js";

// 렌더링
export async function paymentRender() {
  const app = document.querySelector("#app");
  app.innerHTML = /* html */ `
  <div id="wrap">
    <div class="wrap_container">
      <div class="payment">
        <div class="dot-wrap dot_loading">
          <div class="dot-spinner"></div>
        </div>
        <div class="payment_inner">
          <!-- 주문정보 -->
          <section class="inner_orderinfo">
            <!-- 주문 상품 상단 바 -->
            <div class="orderinfo_title_navbar">주문상품</div>
            <div class="orderinfo_navbar">
              <div class="navbar_productname">상품정보</div>
              <div class="navbar_option">상품이름</div>
              <div class="navbar_price">가격</div>
              <div class="navbar_quantity">수량</div>
              <div class="navbar_totalprice">총 금액</div>
            </div>
            <!-- 주문자 정보 -->
            <div class="orderinfo_title_orderer">주문자 정보</div>
            <div class="orderinfo_orderer">
              <div class="orderinfo_name"><p>이름</p><p class="orderinfo_name_text"></p></div>
              <div class="orderinfo_email"><p>이메일</p><p class="orderinfo_email_text"></p></div>
              <div class="orderinfo_account">
                <div class="account_text">계좌선택</div>
                <select class="account_select"></select>
                <button class="account_search">계좌조회</button>
              </div>
                <div class ="user_account_info">
                  <div class="bank">
                    <div class="bank_name"><p>은행</p><p class="bank_name_text"></p></div>
                    <div class="account_number"><p>계좌번호</p><p class="account_number_text"></p></div>
                    <div class="bank_balance"><p>잔액</p><p class="bank_balance_text"></p></div>
                  </div>
                  <div class="bank_card_wrap">
                    <div class="bank_card"></div>              
                  </div>
                <div>
            </div>
          </section>
          <!-- 결제 정보 요약 -->
          <section class="inner_summary">
            <div class="summary_info">
              <div class="info_paymentinfo">결제정보</div>
              <div class="info_totalprice"><p>총 구매금액</p><p class="info_totalprice_text"></p></div>
              <div class="info_totaldiscount"><p>총 할인금액</p><p class="info_totaldiscount_text"></p></div>
              <div class="info_totalpayment"><p>총 결제금액</p><p class="info_totalpayment_text"></p></div>
            </div>
            <div class="summary_btn">
              <button class="btn_payment">결제하기</button>
              <button class="btn_cancel">취소</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
  `;
  paymentHandler();
}
