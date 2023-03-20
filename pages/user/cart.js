import { cartHandler, renderCartList } from "../../source/js/cart"

export function cartRender(){
  const app =document.querySelector("#app")
  const basketItem = JSON.parse(localStorage.getItem("basket"));
  const isEmpty = !basketItem?.length 
 
  app.innerHTML=/*html*/`
  <section class="cart">
    <div class="inner cart_inner">
      <div class="cart_wrap">
        <div class="cart_header">
          <h2 class="header">장바구니</h2>
          <div class="card_list_area">
            <ul class="card_list">
              <li class="item">장바구니</li>
              <li class="item">주문 / 결제</li>
              <li class="item">주문 완료</li>
            </ul>
          </div>
        </div>
        ${isEmpty ?/*html*/`
        <div class ="cart_none">
          <div class="cart_icon">
            <img class="filter_icon" src="../../image/cart_img.png" alt="cart_img">
          </div>  
          <div class ="empty_text">장바구니가 비었습니다.</div>
          <div class="cart_btn">
            <a href="/" data-navigo >계속 쇼핑하기</a>
          </div>
        </div>`
        :/*html*/`<div class="cart_area">
          <div class="cart_area_list_area">
            <div class="list_info">
              <div class="info_wrap">
                <div class="checkbox_wrap">
                  ${!isEmpty?'<input type="checkbox" class="info_total_checkbox" checked/>':''}
                </div>
                <div class="info_option_product">상품 / 옵션 정보</div>
                <div class="info_amount">수량</div>
                <div class="info_price">주문금액</div>
              </div>
            </div>
            <ul class="cart_list">
              
            </ul>
          </div>
          <div class="cart_total_price_area ">
 
          </div>
          <div class="btn_area">
          <div class="cancel_btn_wrap">
            <button class="cancel_btn">상품 취소하기</button>
          </div>
          <div class="purchase_btn_wrap">
            <a class="purchase_btn" href="/payment" data-navigo>구매하기</a>
          </div>`}
        
        </div>
      </div>
    </div>
  </section>`
  renderCartList()
  if(!isEmpty) {

    cartHandler()
  }
}
