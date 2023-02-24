export function pruchaseRender() {
  const mypage = document.querySelector("#mypage");
  mypage.innerHTML = /*html*/ `
  <section class="container_content">
    <div class="container_content_title">
      <h2>주문/배송 조회</h2>
      <p>주문 내역을 클릭하면 상세 내역을 확인 하실 수 있으며, 주문 상태에 따라 <strong>취소/교환/반품 신청이 가능</strong> 합니다.
        <br>신청하신 취소/교환/반품 처리 내역은 <strong>'취소/교환/반품 내역'</strong> 메뉴에서 확인 가능합니다.
      </p>
    </div>

    <!-- 필터 -->
    <section class="container_content_delivery">
      <div class="delivery_type_text">배송구분</div>
      <div class="delivery_filter">
        <div class="delivery_filter_month">
          <button class="delivery_filter_month_1">1개월</button>
          <button class="delivery_filter_month_3">3개월</button>
          <button class="delivery_filter_month_6">6개월</button>
          <button class="delivery_filter_month_12">1년</button>
        </div>
        <div class="delivery_filter_calendar">
          <div class="calendar_start">2023-01-02
            <button>
              <span class="material-symbols-outlined">
                calendar_today
              </span>
            </button>
          </div>
          <div class="calendar_middle">~</div>
          <div class="calendar_end">2023-02-02
            <button>
              <span class="material-symbols-outlined">
                calendar_today
              </span>
            </button>
          </div>
          <button class="delivery_filter_calendar_btn">조회</button>
        </div>
      </div>
    </section>
    <!-- 구매 리스트 상단 바 -->
    <section class="container_content_list">
      <div class="list_bar">
        <div class="list_bar_productInfo">상품정보</div>
        <div class="list_bar_orderNumber">상품이름</div>
        <div class="list_bar_payAmount">결제금액</div>
        <div class="list_bar_orderDate">주문일시</div>
        <div class="list_bar_payMethod">확인/취소</div>
      </div>

      <!-- 구매 리스트 아이템 -->
      <div class="list_item_container">
        <ul class="list_item_list_select">
          <!-- <div class="list_item">
          <div class="list_item_productInfo"><img src="/image/g1.jpg" alt="선글라스"></div>
          <div class="list_itme_orderNumber">고글</div>
          <div class="list_item_payAmount">10000원</div>
          <div class="list_item_orderDate">2023-01-05</div>
          <div class="list_item_btn">
            <button class="btn_ok">확정</button>
            <button class="btn_cancel">취소</button>
          </div>
        </div> -->
        </ul>

        <ul class="list_item_list_confirm"></ul>
        <ul class="list_item_list_cancel"></ul>
      </div>

    </section>

    <!-- 상세 정보 창 -->
    <section class="container_content_modal">
      <div class="modal">
        <div class="modal_orderDate">주문날짜</div>
        <button class="modal_cancel">x</button>
      </div>
      <div class="modal_inner">
        <div class="modal_inner_image"><img src="/image/g10.jpg" alt="선글라스"></div>
        <div class="modal_inner_box">
          <div class="box_productName">상품이름</div>
          <div class="box_totalPrice">총 가격</div>
          <div class="box_totalQauntity">총 수량</div>
        </div>
        <div class="modal_inner_btn">
          <button class="btn_ok">구매확정</button>
          <button class="btn_cancel">구매취소</button>
        </div>
      </div>
    </section>
  </section>`;
}