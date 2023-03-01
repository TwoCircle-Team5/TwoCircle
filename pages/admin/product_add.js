import { productAdd } from "../../source/api/products/admin/product_add"

export function adminProductAdd(){
  const wrap = document.querySelector("#wrap")
  wrap.innerHTML = /*html*/`
    <div class="container">
      <div class="admin">
        <div>
          <p>제품이름</p>
          <input type="text" class="product_name" />
        </div>
        <div>
          <p>제품가격</p>
          <input type="text" class="product_price" />
        </div>
        <div>
          <p>제품 상세 설명</p>
          <input type="text" class="product_text" />
        </div>
        <div>
          <p>태그</p>
          <input type="text" class="product_tag" />
        </div>
        <div>
          <p>제품 사진</p>
          <input type="file" class="product_thumbnail" />
          <div class="img"></div>
        </div>
        <div>
          <p>제품 상세 사진</p>
          <input type="file" class="product_photo" />
          <div class="detail_img"></div>
        </div>
        <div>
          <p>제품 할인율</p>
          <input type="text" class="product_discount" />
        </div>
        <button type="button" class="product_registration">제품등록</button>
      </div>
    </div>`
    productAdd()
}
