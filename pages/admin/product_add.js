import { productAddItem } from "../../source/js/admin/product_add";

export function adminProductAdd() {
  const admin = document.querySelector("#admin");
  admin.innerHTML = /*html*/`
    <div class="container">
      <div class="title">
        <h2>상품추가</h2>
      </div>
      <div class="admin_wrap">
        <div class="admin_product_add">
          <div>
            <p>제품이름<b>*</b></p>
            <input type="text" class="product_name" />
          </div>
          <div>
            <p>제품가격<b>*</b></p>
            <input type="text" class="product_price" />
          </div>
          <div>
            <p>제품 상세 설명<b>*</b></p>
            <input type="text" class="product_text" />
          </div>
          <div>
            <p>메인상품 진열</p>
            <ul class="main_tag">
              <li>
                <input type="checkbox" id="best" name="main_tag" />
                <label for="best">핫한 상품<span class="best_count">()</span></label>
              </li>
              <li>
                <input type="checkbox" id="md" name="main_tag" />
                <label for="md">MD 추천 상품<span class="md_count">()</span></label>
              </li>
              <li>
                <input type="checkbox" id="new" name="main_tag" />
                <label for="new">신상품<span class="new_count">()</span></label>
              </li>
            </ul>
            <span>핫한 상품(6), MD 추천 상품(6), 신상품(12)까지만 보입니다.</span>
          </div>
          <div>
            <p>태그</p>
            <ul class="tag_list">
              <li>
                <input type="checkbox" id="glasses" name="tag" data-id="안경테" />
                <label for="glasses">안경테</label>
              </li>
              <li>
                <input type="checkbox" id="sunglasses" name="tag" data-id="선글라스" />
                <label for="sunglasses">선글라스</label>
              </li>
              <li>
                <input type="checkbox" id="goggles" name="tag" data-id="고글" />
                <label for="goggles">고글</label>
              </li>
              <li>
                <input type="checkbox" id="best_tag" name="tag" data-id="베스트" />
                <label for="best_tag">베스트</label>
              </li>
              <li>
                <input type="checkbox" id="new_tag" name="tag" data-id="신상품" />
                <label for="new_tag">신상품</label>
              </li>
            </ul>
          </div>
          <div>
            <p>제품 사진</p>
            <div class="button thumbnail_btn">
              <p>찾아보기</p>
            </div>
            <input type="file" class="product_thumbnail" />
            <span>1MB 이하의 사진만 가능합니다.</span>
          </div>
          <div>
            <p>제품 상세 사진</p>
            <div class="button photo_btn">
              <p>찾아보기</p>
            </div>
            <input type="file" class="product_photo" />
            <span>4MB 이하의 사진만 가능합니다.</span>
          </div>
          <div>
            <p>제품 할인율</p>
            <input type="text" class="product_discount" />
            <span class="percent">%</span>
          </div>
          <button type="button" class="product_registration">제품등록</button>
        </div>
        <div class="product_add_img">
          <div class="thumbnail_img"></div>
          <div class="photo_img"></div>
        </div>
      </div>
    </div>`;
  productAddItem();
}

