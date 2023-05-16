import { authCheck } from "../../source/api/certified/authcheck_api.js";
import { router } from "../../source/route.js";
import { loading } from "../../source/js/loading.js";

export async function orderCompletedHandler() {
  const auth = await authCheck(JSON.parse(localStorage.getItem("accessToken")));
  const item = JSON.parse(localStorage.getItem("payment"));
  const nameEl = document.querySelector(".name_text");
  const dateEl = document.querySelector(".date_text");
  const priceEl = document.querySelector(".price_text");
  const listEl = document.querySelector(".list_text");
  const myPageBtnEl = document.querySelector(".content_mypagebtn");
  const homeBtnEl = document.querySelector(".content_homebtn");
  loading();
  const dot = document.querySelector(".dot-wrap");

  // 결제 완료 시 나타나는 정보
  nameEl.innerHTML = `${auth.displayName}`;
  dateEl.innerHTML = `${new Date().toLocaleDateString()}`;
  priceEl.innerHTML = `${
    item[item.length - 1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    "원"
  }`;
  listEl.innerHTML = `${item.length - 1}개의 상품을 주문하였습니다`;

  // 마이페이지, 홈으로 이동 버튼
  myPageBtnEl.addEventListener("click", () => {
    removeItemStorage();
    router.navigate("/mypage");
  });
  homeBtnEl.addEventListener("click", () => {
    removeItemStorage();
    router.navigate("/");
  });

  // 모든 a태그를 가진 링크를 클릭시 removeItemStorage 실행
  const allLinks = document.querySelectorAll("a");
  allLinks.forEach((link) => {
    link.addEventListener("click", () => {
      removeItemStorage();
    });
  });

  // 뒤로가기 이벤트를 감지
  window.onpopstate = function () {
    // 브라우저의 히스토리에서 현재 페이지를 제거, 결제시 뒤로 갈 필요가 없으므로 추가 함
    window.history.pushState(null, null, window.location.href);
    // 사용자에게 알림 띄우기
    alert("결제가 완료되었습니다.");
  };
  // 초기 페이지 로딩시 브라우저 히스토리에 현재 페이지를 추가
  window.history.pushState(null, null, window.location.href);

  // 로컬스토리지 삭제
  function removeItemStorage() {
    localStorage.removeItem("basket");
    localStorage.removeItem("payment");
  }
  dot.style.display = "none";
}
