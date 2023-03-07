import { authCheck } from "../../source/api/certified/authcheck_api.js";
import { router } from "../../source/route.js";;

export async function orderCompletedHandler() {
  const auth = await authCheck(JSON.parse(localStorage.getItem("accessToken")));
  const item = JSON.parse(localStorage.getItem("payment"));
  const nameEl = document.querySelector(".name_text");
  const dateEl = document.querySelector(".date_text");
  const priceEl = document.querySelector(".price_text");
  const listEl = document.querySelector(".list_text");
  const myPageBtnEl = document.querySelector(".content_mypagebtn");
  const homeBtnEl = document.querySelector(".content_homebtn");

  nameEl.innerHTML = `${auth.displayName}`;
  dateEl.innerHTML = `${new Date().toLocaleDateString()}`;
  priceEl.innerHTML = `${
    item[item.length - 1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    "원"
  }`;
  listEl.innerHTML = `${item.length - 1}개의 상품을 주문하였습니다`;

  myPageBtnEl.addEventListener("click", () => {
    removeItemStorage();
    router.navigate("/mypage");
  });
  homeBtnEl.addEventListener("click", () => {
    removeItemStorage();
    router.navigate("/");
  });

  // 아무 페이지나 이동해도 removeItemStorage가 실행되게 하기
  const allLinks = document.querySelectorAll("a");
  allLinks.forEach((link) => {
    link.addEventListener("click", () => {
      removeItemStorage();
    });
  });

  // 뒤로가기 이벤트를 감지하는 함수
  window.onpopstate = function () {
    // 브라우저의 히스토리에서 현재 페이지를 제거
    window.history.pushState(null, null, window.location.href);
    // 사용자에게 경고창을 띄움
    alert("결제가 완료되었습니다.");
  };
  // 초기 페이지 로딩시 브라우저 히스토리에 현재 페이지를 추가
  window.history.pushState(null, null, window.location.href);

  function removeItemStorage() {
    localStorage.removeItem("basket");
    localStorage.removeItem("payment");
  }
}
