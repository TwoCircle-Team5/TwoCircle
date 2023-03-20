import { adminProductList } from "../../source/js/admin/product_list";

export function adminPageRender() {
  const admin = document.querySelector("#admin");
  admin.innerHTML = /*html*/ `
    <div class="container">
      <div class="product_admin">
        <div class="title">
          <h2>상품 리스트</h2>
          <div class="button_box">
            <button type="button" class="delete_btn">
              삭제하기
            </button>
            <a href="/admin/product_add" class="select_add">추가하기</a>
          </div>
          <!-- <div class="search_box">
            <input type="text" placeholder="Search">
            <div class="button search"><a href="#">검색</a></div>
          </div> -->
        </div>
        <div class="admin_list_wrap">
          <div class="product_admin_top admin_list">
            <label htmlFor="all">
              <input type="checkbox" id="all" />
            </label>
            <p>No.</p>
            <p>이미지</p>
            <p>상품명</p>
            <p>가격</p>
            <p>품절여부</p>
          </div>
          <ul class="product_admin_ul"></ul>
          <div class="pagination"></div>
        </div>
        
      </div>
    </div>`;
  adminProductList();
}
