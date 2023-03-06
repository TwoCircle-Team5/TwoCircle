import { router } from "../../source/route.js";
import { payment } from "../../source/api/products/user/payment_api.js";
import { authCheck } from "../../source/api/certified/authcheck_api.js";
import { checkAccount } from "../../source/api/account/account_add_check.js";

export async function paymentHandler() {
  const auth = await authCheck(JSON.parse(localStorage.getItem("accessToken")));
  const account = await checkAccount(auth);
  let banks = [...account.accounts];

  // 주문상품
  const orderNavBarEl = document.querySelector(".orderinfo_navbar");
  const item = JSON.parse(localStorage.getItem("basket"));
  let sum = 0;
  let originSum = 0;
  let lists = [...item];
  const liEl = lists.map((list) => {
    const orderInfoListEl = document.createElement("div");
    const listImage = document.createElement("div");
    const listOption = document.createElement("div");
    const discountPrice = document.createElement("div");
    const listQuantity = document.createElement("div");
    const listTotalPrice = document.createElement("div");

    orderInfoListEl.classList.add("orderinfo_list");
    listImage.classList.add("list_image");
    listOption.classList.add("list_option");
    discountPrice.classList.add("discount_price");
    listQuantity.classList.add("list_quantity");
    listTotalPrice.classList.add("list_totalprice");
    listImage.innerHTML = `<img src="${list.thumbnail}" alt="아이템">`;
    listOption.innerHTML = `${list.title.replace(/\/.*/, "")}`;
    discountPrice.innerHTML = `${formatPrice(list.discountPrice)}`;
    listQuantity.innerHTML = `${list.count}`;
    listTotalPrice.innerHTML = `${formatPrice(list.totalPrice)}`;
    sum += list.totalPrice;
    originSum += list.price * list.count;

    orderInfoListEl.append(
      listImage,
      listOption,
      discountPrice,
      listQuantity,
      listTotalPrice
    );
    return orderInfoListEl;
  });
  orderNavBarEl.after(...liEl);

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  }

  // 주문자 정보
  const orderNameEl = document.querySelector(".orderinfo_name_text");
  const orderEmailEl = document.querySelector(".orderinfo_email_text");
  const accountSelectEl = document.querySelector(".account_select");
  const accountSearchEl = document.querySelector(".account_search");
  const bankNameEl = document.querySelector(".bank_name_text");
  const accountNumberEl = document.querySelector(".account_number_text");
  const balanceEl = document.querySelector(".bank_balance_text");
  const payBtnEl = document.querySelector(".btn_payment");

  orderNameEl.innerHTML = `${auth.displayName}`;
  orderEmailEl.innerHTML = `${auth.email}`;

  banks.map((bank) => {
    const accountOptionEl = document.createElement("option");
    accountOptionEl.textContent = `${bank.bankName}`;
    accountOptionEl.value = `${bank.id}`;
    accountSelectEl.append(accountOptionEl);

    return accountOptionEl, bankNameEl, accountNumberEl, balanceEl;
  });

  let bankCheck = false;
  let selectedBank = null; // 선택된 계좌 정보를 저장할 변수
  accountSearchEl.addEventListener("click", () => {
    const selectedBankId = accountSelectEl.value; // 선택된 계좌 ID

    // banks 배열에서 선택된 계좌 정보를 찾음
    selectedBank = banks.find((bank) => bank.id === selectedBankId);
    bankCheck = true;

    if (selectedBank) {
      // 선택된 계좌 정보가 존재할 경우
      bankNameEl.innerHTML = `${selectedBank.bankName}`;
      accountNumberEl.innerHTML = `${selectedBank.accountNumber}`;
      balanceEl.innerHTML = `${formatPrice(selectedBank.balance)}`;
    } else {
      // 선택된 계좌 정보가 존재하지 않을 경우
      alert("계좌를 선택해주세요");
    }
  });

  // 결제정보
  const totalPriceEl = document.querySelector(".info_totalprice_text");
  const totalPaymentEl = document.querySelector(".info_totalpayment_text");
  const totalDiscountEl = document.querySelector(".info_totaldiscount_text");
  totalPriceEl.append(`${formatPrice(originSum)}`);
  totalPaymentEl.append(`${formatPrice(sum)}`);
  if (formatPrice(originSum - sum) === "0원") {
    totalDiscountEl.append("0원");
  } else {
    totalDiscountEl.append(`-${formatPrice(originSum - sum)}`);
  }

  payBtnEl.addEventListener("click", async () => {
    if (!bankCheck) {
      alert("계좌를 선택해주세요");
      return;
    }
    const arrList = [];
    const paymentList = [...lists];
    const liEl = paymentList.map((list) => {
      const order = {
        id: list.id,
        title: list.title,
        description: list.description,
        price: list.price,
        totalPrice: list.totalPrice,
        thumbnail: list.thumbnail,
      };

      if (list.count > 1) {
        for (let i = 0; i < list.count; i++) {
          arrList.push(order);
        }
      }
      return order;
    });

    if (arrList) {
      for (let i = 1; i < arrList.length; i++) {
        liEl.push(arrList[i]);
      }
    }

    liEl.push(sum);
    localStorage.setItem("payment", JSON.stringify(liEl));
    const data = JSON.parse(localStorage.getItem("payment"));
    const dataList = [...data];

    if (selectedBank.balance < sum) {
      alert("잔액이 부족합니다.");
      return;
    }
    dataList.pop();

    dataList.map(async (data) => {
      await payment(data, selectedBank);
    });
    router.navigate("order_completed");
  });

  const cancelBtnEl = document.querySelector(".btn_cancel");
  cancelBtnEl.addEventListener("click", () => {
    router.navigate("cart");
  });

  const allLinks = document.querySelectorAll("a");
  allLinks.forEach((link) => {
    link.addEventListener("click", () => {});
  });
}
