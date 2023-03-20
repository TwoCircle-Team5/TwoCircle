import { searchProduct } from "../api/products/user/product_search";
import { loading } from "./loading";


function sleep (ms=500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    },ms);
  })
}


export async function productRender(searchs, tag) {
  const body = {

    "searchText": searchs,
    "searchTags": [...tag]
  };
  const search = await searchProduct(body);
  loading()
  await sleep();
  rendProduct(search)
}

// 상품목록 렌더링 과정
function rendProduct(products) {
  const ulEl = document.querySelector(".products_lists");
  const productSection = document.querySelector(".products")
  const dot = document.querySelector(".dot-wrap")
  if(products.length === 0 ){
    productSection.innerHTML = /*html*/`
      <div class="no_result">
        <img src="../image/icon_exclamation.png" alt="느낌표 이미지">
        <p class="no_result_ment">검색된 결과가 없습니다.</p>
        <p class="no_result_try">검색어를 정확하게 다시 입력해주세요.</p> 
      </div>
    `
  }else{
    let wishList  = JSON.parse(localStorage.getItem('wish')) ?? [];
    const liEls = products.map((product) => {
      const isCartItem = wishList.find(wishItem => wishItem.id === product.id);
     
      const liEl = document.createElement("li");
      liEl.dataset.id = product.id;
      const titleCode = product.title.split("/");
      liEl.innerHTML = /*html*/ `
                  <a href="/product_details/${product.id}" data-navigo class="product">
                    <div class="product_img">
                      ${
                        product.thumbnail === null
                          ? `<img src=${"https://via.placeholder.com/200x200?text=NO+IMAGE"} alt="product">`
                          : `<img src=${product.thumbnail} alt="product">`
                      }
                      <div class="icons">
                        <i class="${
                          isCartItem ? "fa-solid" : "fa-regular"
                        } fa-heart"></i>
                      </div>
                    </div>
                    <p class="product_name">${titleCode[0]}</p>
                    <p class="product_code">${
                      titleCode[1] ??  titleCode[0]
                    }</p>
                    <p class="product_discription">${product.description}</p>
                    <p class="product_price">${product.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                    ${
                      product.discountRate
                        ? `<span class="product_price_sale">${product.discountRate}%</span>`
                        : ""
                    }

                  </div>
                  </p>
                </a>`;
    const iconsEl = liEl.querySelector(".icons");

    iconsEl.addEventListener("click", (e) => {
      e.preventDefault();
      const iEl = e.target;

      const isCartItem = wishList.find(wishItem => wishItem.id === product.id);
      
      // 찜하기 개수
      const heartNum = document.querySelector('.heart_num');
      
      iEl.classList.toggle('fa-regular', isCartItem)
      iEl.classList.toggle('fa-solid', !isCartItem)
      if(isCartItem) {
        wishList = wishList.filter(wishItem => wishItem.id !== product.id);

          localStorage.setItem("wish", JSON.stringify(wishList));
          heartNum.innerText = JSON.parse(localStorage.getItem('wish')).length;
          return;
        }

        const wish = {
          id: product.id,
          price: product.price,
          code: titleCode[1] !== undefined ? titleCode[1] : titleCode[0],
          thumbnail: product.thumbnail,
          title: titleCode[0],
          discountRate: product.discountRate,
          description: product.description,
          
        };
        wishList.push(wish)  

        localStorage.setItem("wish", JSON.stringify(wishList));
        if (localStorage.getItem('wish')) {
          heartNum.innerText = JSON.parse(localStorage.getItem('wish')).length;
        }

      });

      return liEl;

    });
    dot.style.display = "none"
    ulEl.innerHTML = "";
    ulEl.append(...liEls);
  }
}