import { renderWishList } from "../../source/js/wish_list";

export function wishRender() {
  const wishList = JSON.parse(localStorage.getItem("wish"));
  const mypage = document.querySelector("#mypage");
  const isEmpty = wishList === null || wishList.length === 0;

  mypage.innerHTML = /*html*/ `
  <section class="wish_list">
    <div class="inner wish_inner">
      <div class="wish_wrap products">
        <div class="wish_header">
          <h2>찜 리스트</h2>
        </div>
        ${isEmpty
      ? /*html*/ `
        <div class ="wish_none">
          <div class="wish_icon">
          <img class="heart_img filter_icon" src="../../image/heart_img.png"/>
          </div>  
          <div class ="empty_text">찜 리스트가 비었습니다.</div>
          <div class="wish_btn">
            <a href="/" data-navigo >계속 쇼핑하기</a>
          </div>
        </div>
        `
      : /*html*/ `
        <ul class="list products_lists">
        </ul>
        `
    }
        
      </div>
    </div>
  </section>`;
  if(!isEmpty) {

    renderWishList(wishList);
  }
}
