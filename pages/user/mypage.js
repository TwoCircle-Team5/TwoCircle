import { authCheck } from "../../source/api/certified/authcheck_api.js";

export function navRender() {
  const app = document.querySelector("#app");
  app.innerHTML = /*html*/ `
  <section class="mypage">
    <div class="inner">
      <div class="mypage_nav">
        <div class="mypage_title">
          <h2>마이페이지</h2>
        </div>

        <div class="shipping_info_area">
          <div class="shipping_info_title">쇼핑 정보</div>
          <ul class="shipping_info_list">
            <li class="item">
              <a class="item_purchase" href="/mypage/purchase" data-navigo>구매 목록 / 배송조회</a>
              <a class="item_wish_list" href="/mypage/wish" data-navigo>찜리스트</a>
            </li>
          </ul>
        </div>

        <div class="user_info_area">
          <div class="user_info_title">회원 정보</div>
          <ul class="user_info_list">
            <li class="item">
              <a class="item_info_change" href="/mypage/changeInfo" data-navigo>회원 정보 변경</a>
              <a class="item_info_account" href="/mypage/account" data-navigo>계좌 관리</a>
            </li>
          </ul>
        </div>
      </div>
      <div id="mypage" class="mypage_main"></div>
    </div>
  </section>`;
}

export async function mypageRender() {
  const mypage = document.querySelector("#mypage");
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const auth = await authCheck(accessToken);

  mypage.innerHTML = /*html*/ `
  <div>
    <div class="info_user">
      <div class="user_name">
        <span class="name">안녕하세요. <br />${auth.displayName} 님</span>
      </div>
    </div>

    <div class="progress order_progress">
      <div class="title_area">
        <span class="title"> 진행 중인 주문 </span>
      </div>

      <div class="order_list_area">
        <div class="list_wrap">
          <ul class="list">
            <li class="item">
              <span class="waiting_deposit">입금대기</span>
              <span class="amount">0</span>
            </li>
            <li class="item">
              <span class="complete_payment">결제완료</span>
              <span class="amount">0</span>
            </li>
            <li class="item">
              <span class="product_preparation">상품준비중</span>
              <span class="amount">0</span>
            </li>
            <li class="item">
              <span class="in_delivery">배송중</span>
              <span class="amount">0</span>
            </li>
            <li class="item">
              <span class="delivery_complete">배송완료</span>
              <span class="amount">0</span>
            </li>
            <li class="item">
              <span class="mypage_purchase_confirmation"
                >구매확정</span
              >
              <span class="amount">0</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="purchase recent_purchase">
      <div class="title_area">
        <span class="title"> 최근 주문 정보</span>
      </div>
      <div class="list_area">
        <div class="list_info">
          <div class="date_order_number">날짜 / 주문번호</div>
          <div class="product_name">상품명 / 옵션</div>
          <div class="product_price">금액 / 수량</div>
          <div class="order_status">주문 상태</div>
        </div>

        <ul class="recent_purchase_list">
          <li>
            <div class="date_order_number">
              <div class="date">2023.02.06</div>
              <div class="order_number">23000264743619</div>
            </div>

            <div class="product_item">
              <div class="product_item_img">
                <img
                  src="https://via.placeholder.com/200x200?text=NO+IMAGE"
                  alt="NO IMAGE"
                  class="img" />
              </div>
              <div class="product_item_wrap">
                <span class="product_item_name"
                  >블랙 54mm BASIC C1 베이직 동글이 안경테</span
                >
                <div class="product_item__option">옵션: 클리너</div>
              </div>
            </div>
            <div class="price_amount">
              <div class="price_amount__wrap">
                <span class="price">25000원 / 1개</span>
              </div>
            </div>
            <div class="status">
              <div class="status__wrap">
                <span class="status_current">배송 준비중</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="latest_view">
      <div class="latest_view_header">
        <span class="latest_view_title">최근 본 상품</span>
      </div>
      <div class="latest_view_list_wrap">
        <ul class="list">
          <li class="list_item">
            <div class="list_item_card">
              <a href="">
                <div class="img_wrap">
                  <img
                    src="https://via.placeholder.com/200x200?text=NO+IMAGE"
                    alt="블랙 54mm ROUNZ BASIC C1 라운즈베이직 동글이 안경테" />
                </div>
                <div class="list_item_info">
                  <div class="info_sub_wrap">
                    <span class="sub_title"
                      >ROUNZ BASIC<br />
                      ROUNZ BASIC C1</span
                    >
                  </div>
                  <div class="info_title_wrap">
                    <span class="title"
                      >블랙 54mm ROUNZ BASIC C1 라운즈베이직 동글이
                      안경테</span
                    >
                  </div>
                  <div class="info_price_wrap">
                    <span class="discount">44%</span>
                    <span class="price">25,000원</span>
                  </div>
                </div>
              </a>
            </div>
          </li>
          <li class="list_item">
            <div class="list_item_card">
              <a href="">
                <div class="img_wrap">
                  <img
                    src="https://via.placeholder.com/200x200?text=NO+IMAGE"
                    alt="블랙 54mm ROUNZ BASIC C1 라운즈베이직 동글이 안경테" />
                </div>
                <div class="list_item_info">
                  <div class="info_sub_wrap">
                    <span class="sub_title"
                      >ROUNZ BASIC<br />ROUNZ BASIC C1</span
                    >
                  </div>
                  <div class="info_title_wrap">
                    <span class="title"
                      >블랙 54mm ROUNZ BASIC C1 라운즈베이직 동글이
                      안경테</span
                    >
                  </div>
                  <div class="info_price_wrap">
                    <span class="price">25,000원</span>
                  </div>
                </div>
              </a>
            </div>
          </li>
          <li class="list_item">
            <div class="list_item_card">
              <a href="">
                <div class="img_wrap">
                  <img
                    src="https://via.placeholder.com/200x200?text=NO+IMAGE"
                    alt="블랙 54mm ROUNZ BASIC C1 라운즈베이직 동글이 안경테" />
                </div>
                <div class="list_item_info">
                  <div class="info_sub_wrap">
                    <span class="sub_title"
                      >ROUNZ BASIC <br />ROUNZ BASIC C1</span
                    >
                  </div>
                  <div class="info_title_wrap">
                    <span class="title"
                      >블랙 54mm ROUNZ BASIC C1 라운즈베이직 동글이
                      안경테</span
                    >
                  </div>
                  <div class="info_price_wrap">
                    <span class="discount">44%</span>
                    <span class="price">25,000원</span>
                  </div>
                </div>
              </a>
            </div>
          </li>
          <li class="list_item">
            <div class="list_item_card">
              <a href="">
                <div class="img_wrap">
                  <img
                    src="https://via.placeholder.com/200x200?text=NO+IMAGE"
                    alt="블랙 54mm ROUNZ BASIC C1 라운즈베이직 동글이 안경테" />
                </div>
                <div class="list_item_info">
                  <div class="info_sub_wrap">
                    <span class="sub_title"
                      >ROUNZ BASIC<br />ROUNZ BASIC C1</span
                    >
                  </div>
                  <div class="info_title_wrap">
                    <span class="title"
                      >블랙 54mm ROUNZ BASIC C1 라운즈베이직 동글이
                      안경테</span
                    >
                  </div>
                  <div class="info_price_wrap">
                    <span class="price">25,000원</span>
                  </div>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  `;
}
