import { router } from "../../source/route.js";
import { loading } from "../../source/js/loading.js";

export async function productDetailHandler(id) {
  // DOM 요소 변수
  const stockEl = document.querySelector(".stock_text");
  let countTotalPriceEl = document.querySelector(".count_totalprice");
  let countEl = document.querySelector(".count");
  const minusBtnEl = document.querySelector(".btn_minus");
  const plusBtnEl = document.querySelector(".btn_plus");
  const heartBtnEl = document.querySelector(".btn_heart");
  const basketBtnEl = document.querySelector(".btn_basket");
  const purchaseBtnEl = document.querySelector(".productInfo_btn_purchase");
  const bigTagEl = document.querySelector(".bigtag");
  const midTagEl = document.querySelector(".midtag");
  const smallTagEl = document.querySelector(".smalltag");
  const discountEl = document.querySelector(".product_info_discount");
  const discountPriceEl = document.querySelector(".option_content_discount");
  const optionPriceEl = document.querySelector(".option_content_price");
  const productImgEl = document.querySelector(".container_content_productImg");
  const photoImgEl = document.querySelector(".photo");
  const codeEl = document.querySelector(".product_info_code");
  loading();
  const dot = document.querySelector(".dot-wrap");

  // 초기화
  const INITIAL_COUNT_VALUE = 1;
  let countTotalPrice = calculateTotalPrice(id.price, id.discountRate, INITIAL_COUNT_VALUE);
  const discountPrice = id.price - id.price * (id.discountRate * 0.01);

  // 제품 코드
  if (id.title.match(/\/(.*)/) !== null) {
    codeEl.innerHTML = `${id.title.match(/\/(.*)/)[1]}`;
  } else {
    codeEl.innerHTML = "";
  }

  // 할인율
  if (!id.discountRate) {
    discountPriceEl.innerHTML = formatPrice(id.price);
    optionPriceEl.style.display = "none";
  }
  discountPriceEl.innerHTML = formatPrice(countTotalPrice);
  countEl.value = INITIAL_COUNT_VALUE;
  countEl.innerHTML = countEl.value;

  // 제품 이미지
  if (id.thumbnail && typeof id.thumbnail === "string") {
    productImgEl.innerHTML = `<img src="${id.thumbnail}" alt="상품이미지">`;
  } else {
    productImgEl.innerHTML = `<img src="https://via.placeholder.com/200x200?text=NO+IMAGE" alt="상품이미지">`;
  }
  if (id.photo && typeof id.photo === "string") {
    photoImgEl.innerHTML = `<img src="${id.photo}" alt="상세이미지">`;
  } else {
    photoImgEl.innerHTML = `<img src="https://via.placeholder.com/200x200?text=NO+IMAGE" alt="상세이미지">`;
  }

  // 수량 버튼 이벤트 리스너
  minusBtnEl.addEventListener("click", () => {
    if (countEl.value > 1) {
      countEl.value--;
      countEl.innerHTML = countEl.value;
      countTotalPrice = calculateTotalPrice(id.price, id.discountRate, countEl.value);
      countTotalPriceEl.innerHTML = formatPrice(countTotalPrice);
    }
  });

  plusBtnEl.addEventListener("click", () => {
    countEl.value++;
    countEl.innerHTML = countEl.value;
    countTotalPrice = calculateTotalPrice(id.price, id.discountRate, countEl.value);
    countTotalPriceEl.innerHTML = formatPrice(countTotalPrice);
  });

  // 찜 버튼
  let wishList = JSON.parse(localStorage.getItem("wish")) ? JSON.parse(localStorage.getItem("wish")) : [];
  const isCartItem = wishList.find((wish) => wish.id === id.id);
  heartBtnEl.innerHTML = /*html*/ `
  <div class="favorite_icons">
    <i class="${isCartItem ? "fa-solid" : "fa-regular"
    } fa-heart favorite"></i><p class="favorite_text">찜</p>
  </div>
`;
  const favoriteEl = heartBtnEl.querySelector(".favorite");
  heartBtnEl.addEventListener("click", () => {
    const isCart = wishList.find((wish) => wish.id === id.id);
    const heartNum = document.querySelector(".heart_num");
    favoriteEl.classList.toggle("fa-regular", isCart);
    favoriteEl.classList.toggle("fa-solid", !isCart);
    if (isCart) {
      wishList = wishList.filter((wish) => wish.id !== id.id);
      localStorage.setItem("wish", JSON.stringify(wishList));
      if (localStorage.getItem("wish")) {
        heartNum.innerText = JSON.parse(localStorage.getItem("wish")).length;
      }
      return;
    }
    addItemToStorage(wishList, id);
    localStorage.setItem("wish", JSON.stringify(wishList));
    if (localStorage.getItem("wish")) {
      heartNum.innerText = JSON.parse(localStorage.getItem("wish")).length;
    }
  });

  // 품절 여부 출력
  stockEl.innerHTML = id.isSoldOut ? "품절" : "재고 있음";
  /// 할인율 출력
  discountEl.innerHTML = id.discountRate ? `할인율 ${id.discountRate}%` : "할인불가";

  // 태그 유무에 따른 태그 출력
  if (id.tags[0] === undefined) {
    smallTagEl.style.display = "none";
    midTagEl.style.display = "none";
    bigTagEl.style.display = "none";
  }
  if (id.tags[1] === undefined) {
    smallTagEl.style.display = "none";
    midTagEl.style.display = "none";
    bigTagEl.innerHTML = `${id.tags[0]}`;
    bigTagEl.style.color = "#181818";
  }
  if (id.tags[2] === undefined) {
    smallTagEl.style.display = "none";
    midTagEl.innerHTML = `${id.tags[1]}`;
    bigTagEl.innerHTML = `${id.tags[0]} >`;
    midTagEl.style.color = "#181818";
  }

  // 장바구니
  basketBtnEl.addEventListener("click", () => {
    addToBasket();

    alert("장바구니에 담겼습니다.");
  });

  // 구매하기
  purchaseBtnEl.addEventListener("click", () => {
    addToBasket();
    if (confirm("구매하시겠습니까?")) {
      router.navigate("/payment");
    } else {
      return;
    }
  });

  function calculateTotalPrice(price, discountRate, count) {
    const total = price * count * ((100 - discountRate) * 0.01);
    return Math.round(total);
  }

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  }

  // basket 로컬스토리지에 담기
  function addToBasket() {
    let getBasketItems = JSON.parse(localStorage.getItem("basket"));
    const cartNum = document.querySelector('.cart_num');

    if (!getBasketItems) {
      getBasketItems = [];
    }
    const existId = getBasketItems.find((item) => item.id === id.id);

    // 동일한 상품이 담겨 있다면 수량만 추가
    if (existId) {
      existId.count += parseInt(countEl.value);
      existId.totalPrice += countTotalPrice;
    } else {
      addItemToStorage(getBasketItems);
    }
    localStorage.setItem("basket", JSON.stringify(getBasketItems));
    if (localStorage.getItem('basket')) {
      cartNum.innerText = JSON.parse(localStorage.getItem('basket')).length;
    }
  }

  // 로컬스토리지로 데이터 담기
  function addItemToStorage(getStorage) {
    const itemEl = {
      id: id.id,
      count: countEl.value,
      price: id.price,
      totalPrice: countTotalPrice,
      thumbnail: id.thumbnail,
      title: id.title,
      discountRate: Number(id.discountRate),
      description: id.description,
      discountPrice: discountPrice,
    };
    getStorage.push(itemEl);
  }

  // 공유 버튼 클릭 이벤트
  const shareBtnEl = document.querySelector("#kakaotalk-sharing-btn");
  shareBtnEl.addEventListener("click", () => {
    shareMessage();
  });

  // 카카오톡 공유
  function shareMessage() {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "TwoCircle",
        description: "패스트캠퍼스 4기 프론트엔드 프로젝트",
        imageUrl: "https://avatars.githubusercontent.com/u/124231330?s=200&v=4",
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: "https://magical-babka-4591f3.netlify.app",
          webUrl: "https://magical-babka-4591f3.netlify.app",
        },
      },
      buttons: [
        {
          title: "웹사이트로 이동",
          link: {
            mobileWebUrl: "https://magical-babka-4591f3.netlify.app",
            webUrl: "https://magical-babka-4591f3.netlify.app",
          },
        },
      ],
    });
  }
  dot.style.display = "none";
}
