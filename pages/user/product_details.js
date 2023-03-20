import { productDetail } from "../../source/api/products/common/product_detail_api.js";
import { productDetailHandler } from "../../source/js/product_details.js";

export async function productDetailRender(data) {
  const id = await productDetail(data.data.id);
  const app = document.querySelector("#app");
  app.innerHTML = /* html */ `
    <div class="wrap_container">
      <div class="product_detail">
        <div class="dot-wrap dot_loading">
          <div class="dot-spinner"></div>
        </div>
        <div class="product_detail_inner">
          <!-- 제품 태그 -->
          <div class="product_tag">
            <a class="bigtag" href="#">${id.tags[0]} ></a>
            <a class="midtag" href="#">${id.tags[1]} ></a>
            <a class="smalltag" href="#">${id.tags[2]}</a>
          </div>
          <div class="product_content">
            <!-- 제품 이미지 -->
            <div class="container_content_productImg"></div>
            <!-- 제품 정보 -->
            <div class="product_info">
              <div class="title">
              <div class="product_info_title">${id.title.replace(/\/.*/, "")}</div>
              <div class="product_info_code"></div>
            </div>
              <!-- 평점, 찜 유뮤, share -->
              <div class="product_info_option">
                <div class="option_stock">
                  <span class="stock_icon material-symbols-outlined">
                    storefront
                  </span>
                  <p class="stock_text"></p>
                </div>
                <div class="option_share">
                  <a id="kakaotalk-sharing-btn" href="javascript:shareMessage()"><span class="share_icon material-symbols-outlined">
                    share
                  </span></a>
                </div>
              </div>
              <div class="product_info_discount"></div>
              <!-- 제품 상세 이름, 제품 수량 추가 or 감소, 제품 가격 -->
              <div class="product_info_quantity">
                <div class="product_info_quantity_box">
                  <div class="box_option">${id.description}</div>
                  <div class="option_content">
                    <div class="option_content_btn">
                      <button class="btn_minus">-</button>
                      <div class="count"></div>
                      <button class="btn_plus">+</button>
                    </div>
                    <div class="option_price">
                      <div class="option_content_price">${id.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                      </div>
                      <div class="option_content_discount"></div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 총 상품 가격 -->
              <div class="product_info_count">
                <div class="count_totaltext">총 상품금액</div>
                <div class="count_totalprice">
                ${Math.round(id.price * ((100 - id.discountRate) * 0.01))
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                </div>
              </div>
              <!-- 찜, 장바구니, 구매 버튼 -->
              <div class="product_info_btn">
                <div class="info_btn_heart">
                  <button class="btn_heart"></button>
                </div>
                <div class="info_btn_basket">
                  <button class="btn_basket">
                    <span class="bag_icon material-symbols-outlined">
                      shopping_bag
                    </span>장바구니
                  </button>
                </div>
                <div class="btn_purchase"><button class="productInfo_btn_purchase">구매하기</button></div>
              </div>
            </div>
          </div>
          <div class="photo"></div>
        </div>
      </div>
    </div>
`;
  productDetailHandler(id);
}
