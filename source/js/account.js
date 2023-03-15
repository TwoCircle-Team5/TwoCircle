import { addAccount } from "../api/account/account_add.js";
import { checkAccount } from "../api/account/account_add_check.js";
import { deleteAccount } from "../api/account/account_delete.js";
import { ableAccount } from "../api/account/account_able_check.js";
import shinhan from "../../static/image/shinhanbank_logo.png";
import kBank from "../../static/image/Kbank_logo.png";
import KBbank from "../../static/image/KBbank_logo.png";
import kakaoBank from "../../static/image/kakaobank_logo.png";
import NHBank from "../../static/image/NHbank_logo.png";
import hanaBank from "../../static/image/hanaBank_logo.png";
import wooriBank from "../../static/image/wooriBank_logo.png";

export function accountHandler() {
  const sectionEl = document.querySelector(".account");
  const dimmedLayer = document.querySelector(".dimmed_layer");
  const modal = document.querySelector(".pop_up");
  const closeBtnEl = document.querySelector(".close_btn");
  const bankSelectArea = document.querySelector(".bank_code_wrap");
  const signatureInputEl = document.querySelector(".signature_input");
  const phoneInputEl = document.querySelector(".phone_number_input");
  const addBtnEl = document.querySelector(".add_btn");
  const accountAddBtnEl = document.querySelector(".account_add_btn");
  const accountTerminateBtnEl = document.querySelector(
    ".account_terminate_btn"
  );
  const divEl = document.querySelector(".account_info_wrap");
  const bankAccountWrap = document.querySelector(".bank_account_wrap");

  /**은행 등록시 필요 정보담는 객체*/
  let accountInfo = {
    bankCode: "",
    accountNumber: "",
    phoneNumber: "",
    signature: false,
  };
  /**은행 해지시 필요 정보담는 객체*/
  let deleteCheckInfo = {
    accountId: "",
    signature: false,
  };

  let bankLogo = [
    { name: "KB국민은행", src: KBbank },
    { name: "신한은행", src: shinhan },
    { name: "우리은행", src: wooriBank },
    { name: "하나은행", src: hanaBank },
    { name: "케이뱅크", src: kBank },
    { name: "카카오뱅크", src: kakaoBank },
    { name: "NH농협은행", src: NHBank },
  ];

  (async () => {
    const banks = await ableAccount();
    
    renderSelectBank(banks);
    
  })();

  function renderSelectBank(banks) {
    const bankList = banks.map((bank) => {
      const logoWrap = document.createElement("div");
      logoWrap.classList = "bank_code";
      const logoList = bankLogo.find((logo) => logo.name === bank.name);

      //  const logo = banks.find((bank) => bank.name === logoList.name)

      const isDisabled = bank.disabled;
      logoWrap.innerHTML = /*html*/ `
                             ${
                               isDisabled
                                 ? `<input type="radio" name="bank" value=${bank.name} id=${bank.code} disabled>`
                                 : `<input type="radio" name="bank" value=${bank.name} id=${bank.code}>`
                             }
                             ${
                               isDisabled
                                 ? `<label for=${bank.code}> <div><img src=${logoList.src} alt=${logoList.name} class="isDisable" /></div> </label>`
                                 : `<label for=${bank.code}> <div><img src=${logoList.src} alt=${logoList.name}  /></div> </label>`
                             } 
                             `;
      return logoWrap;
    });
    bankSelectArea.banks = banks;
    bankSelectArea.append(...bankList);
  }

  function renderAccountInput(digits) {
    const divEl = document.createElement("div");
    const inputList = digits.map((digit) => {
      const digitInput = document.createElement("input");
      digitInput.className = "bank_account_input";
      digitInput.dataset.digit = digit;
      digitInput.inputMode = "numeric";
      digitInput.pattern = `^[0-9]{${digit}}$`;
      digitInput.placeholder = `${digit}자리`;
      digitInput.style.width = `calc(${digit}*2rem)`;
      return digitInput;
    });

    const accountLabel = document.querySelector(".bank_account");
    const validateMessage = document.querySelector(".validate_account_wrap");
    divEl.append(...inputList);
    bankAccountWrap.replaceChildren(accountLabel, divEl, validateMessage);
    // validateMessage.prepend(...inputList);
  }

  bankSelectArea.addEventListener("change", (e) => {
    const inputRadio = e.target;
    accountInfo.bankCode = inputRadio.id;
    const { digits } = bankSelectArea.banks.find(
      (bank) => bank.name === inputRadio.value
    );

    digits && renderAccountInput(digits);
  });

  bankAccountWrap.addEventListener("input", (e) => {
    const targetInput = e.target;

    const targetDigit = Number(targetInput.dataset.digit);
    const targetLength = targetInput.value.length;
    const accountInputs = Array.from(
      document.querySelectorAll(".bank_account_input")
    );

    const startInput = accountInputs.findIndex(
      (input) => input === targetInput
    );
    const nextInput = accountInputs.length - 1;

    if (targetDigit === targetLength && startInput < nextInput) {
      accountInputs[startInput + 1].focus();
      return;
    }

    const accountInputsValue = accountInputs.map((input) => {
      const value = input.value;
      console.log(value);
      return value;
    });

    const accountNumber = accountInputsValue.join("");
    accountInfo.accountNumber = accountNumber;
  });

  /**전화번호 입력 이벤트 함수*/
  phoneInputEl.addEventListener("input", (e) => {
    accountInfo.phoneNumber = e.target.value;
    validatePhoneTest(accountInfo.phoneNumber);
  });

  /** 서명 입력 이벤트 함수*/
  signatureInputEl.addEventListener("input", () => {
    if (signatureInputEl.value.length > 0) {
      accountInfo.signature = true;
    }
  });

  /** 계좌 추가하기 버튼  이벤트 함수*/
  addBtnEl.addEventListener("click", async () => {
    dimmedLayer.classList.add("_hidden");
    modal.classList.add("_hidden");
    addAccount(accountInfo);
    checkAccount();
    renderAccount();
  });

  /**계좌 추가하기 누를 시 모달창및 딤드레이어 나타나게 하기 */
  accountAddBtnEl.addEventListener("click", () => {
    dimmedLayer.classList.remove("_hidden");
    modal.classList.remove("_hidden");
  });

  /**close 버튼 누를시 딤드레이아웃및 모달창 사라지게 하기 */
  closeBtnEl.addEventListener("click", () => {
    dimmedLayer.classList.add("_hidden");
    modal.classList.add("_hidden");
  });

  accountTerminateBtnEl.addEventListener("click", () => {
    const checkedInputEl= document.querySelector(
      '.user_account_info input[type="radio"]:checked'
    );

    // const isChecked = accountTerminateBtnEl.dataset.checked
    const isChecked =  checkedInputEl.checked 
    if (isChecked) {
      
        const accountId   =checkedInputEl.id
        const bankName   =checkedInputEl.value
         renderModal(accountId, bankName)
      // renderModal(accounts);
    } else if (!isChecked) {
      const message = "해지할 계좌를 선택해 주세요.";
      alert(message);
    }
  });
  /**계좌 등록후 정보 총 계좌 금액 렌더링 */
  function renderTotalBalance(accounts) {
    const totalDivEl = document.createElement("div");

    totalDivEl.classList = "total_balance";

    totalDivEl.innerText = ` 총 잔액금액: ${accounts.totalBalance.toLocaleString(
      "ko-KR"
    )}원`;
    divEl.prepend(totalDivEl);
  }

  /**즉시 실행함수 */
  (async () => {
    const accounts = await checkAccount();
    renderAccount();
    renderTotalBalance(accounts);
  })();

  /**계좌 등록후 정보 화면에 계좌 정보 랜더링 하는 함수 */

  async function renderAccount() {
    const addAccounts = await checkAccount();

    const accountsWrapper = document.querySelector('.account_info_wrap');
    const renderedAccountListEl = document.querySelector('.account_list');
    
    const listEl = document.createElement("ul");
    listEl.className = 'account_list';

    const liEls = addAccounts.accounts.map((account) => {
      const liEl = document.createElement("li");

      liEl.dataset.id = account.id;
      liEl.dataset.bank_name = account.bankName;
      liEl.dataset.bank_code = account.bankCode;

      liEl.innerHTML = /*html*/ `
                    <div class ="user_account_info">
                      <input type="radio" name="bank" id=${account.id} value =${account.bankName}>
                      <label for=${account.id}>
                        <div class="bank_name">은행명: ${account.bankName}</div>
                      </label>
                      
                      <div class="account_number">계좌번호: ${account.accountNumber.replaceAll(
                        "X",
                        "*"
                      )}</div>
                      <div class="bank_name">계좌 잔액: ${account.balance.toLocaleString(
                        "ko-KR"
                      )}원</div>
                      
                    <div>
                      
      `;

      return liEl;
    });
  
    listEl.append(...liEls);
   
    if(renderedAccountListEl) {
      renderedAccountListEl.replaceChildren();
      renderedAccountListEl.append(...liEls);

   
      return;
    }

    accountsWrapper.append(listEl)

 
  }

  /*계좌 해지 버튼 누를시 나오는  서명하는 모달창*/
  function renderModal(accountId, bankName) {
   
    const modalDivEl = document.createElement("div");

  
    modalDivEl.dataset.id = accountId
    modalDivEl.classList = "modal";
    dimmedLayer.classList.remove("_hidden");
    modalDivEl.innerHTML = /*html*/ `
                                        <div class ="signature_wrap">
                                          <div class="title">계좌 해지</div>
                                          <button class="close_btn">X</button>
                                          <div class="warning_text"> ${bankName}계좌를 삭제하시겠습니까?</div>
                                          <span>서명</span> 
                                          <input type="text">
                                          <div class="error_text"></div>
                                          <div class="btn_wrap">
                                            <button class="account_signature_btn">계좌 해지</button>
                                          </div>
                                         
                                        </div>
                                          
      `;
    sectionEl.append(modalDivEl);
    sectionEl.addEventListener("click", clickHandler);
  }
  const clickHandler = (e) => {
    const modalDiv = e.target.closest(".account > .modal");
    if (!modalDiv) {
      return;
    }

    if (e.target.matches(".close_btn")) {
      closeHandler(modalDiv);
    }

    if (e.target.matches(".account_signature_btn")) {
      deleteAccountHandler(modalDiv);
    }
  };

  const closeHandler = (modalDiv) => {
    dimmedLayer.classList.toggle("_hidden");
    modalDiv.classList.toggle("_hidden");
  };

  const deleteAccountHandler = async (modalDiv) => {
    const targetId = modalDiv.dataset.id;
    const signatureInputEl = modalDiv.querySelector("input");
    const errorText = modalDiv.querySelector('.error_text')
    if (signatureInputEl.value.length > 0) {
      deleteCheckInfo.signature = true;
    }else {
      errorText.textContent = `서명 필요합니다.`
    }
    deleteCheckInfo.accountId = targetId;
    modalDiv.classList.add("_hidden");
    dimmedLayer.classList.add("_hidden");
    await deleteAccount(deleteCheckInfo);
  };
  /**유효성 검사 */
  const validatePhoneTest = (data) => {
    const validateWrap = document.querySelector(".validate_text");
    const validateText = document.createElement("span");
    const regExp = /(^01.{1})([0-9]{4})([0-9]{4})/g;

    validateWrap.innerHTML = "";

    const isValid = regExp.test(data);

    const message = isValid
      ? "올바른 전화번호 형식 입니다."
      : "잘못된 전화번호 형식 입니다.";
    validateText.classList.toggle("red", !isValid);
    validateText.classList.toggle("green", isValid);
    validateText.textContent = message;
    validateWrap.append(validateText);
  };
}
