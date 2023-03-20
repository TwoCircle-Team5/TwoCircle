import { addAccount } from "../api/account/account_add.js";
import { checkAccount } from "../api/account/account_add_check.js";
import { deleteAccount } from "../api/account/account_delete.js";
import { ableAccount } from "../api/account/account_able_check.js";
import { bankLogo } from "./bankImage";

export function accountHandler() {
  const sectionEl = document.querySelector(".account");
  const dimmedLayer = document.querySelector(".dimmed_layer");
  const modal = document.querySelector(".pop_up");
  const closeBtnEl = document.querySelector(".close_btn");
  const bankSelectArea = document.querySelector(".bank_code_wrap");
  const addBtnEl = document.querySelector(".add_btn");
  const accountAddBtnEl = document.querySelector(".account_add_btn");
  const accountTerminateBtnEl = document.querySelector(
    ".account_terminate_btn"
  );
  const divEl = document.querySelector(".account_info_wrap");

  /**은행 등록시 필요 정보담는 객체*/
  let accountInfo = {
    bankCode: "",
    accountNumber: "",
    phoneNumber: "",
    signature: true,
  };
  /**은행 해지시 필요 정보담는 객체*/
  let deleteCheckInfo = {
    accountId: "",
    signature: false,
  };

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

  function renderInput(digits, name) {
    const cardTemplate = document.querySelector(".card_template");
    const containerEl = document.createElement("div");
    const imgWrapEl = document.createElement("div");
    const accountWrapEl = document.createElement("div");
    const imgEl = document.createElement("img");
    const bankNameTextEl = document.createElement("span");
    const accountLabel = document.createElement("div");
    const validateMessage = document.createElement("div");

    const phoneNumberWrap = document.createElement("div");
    const phoneNumberText = document.createElement("div");
    const phoneNumberInputEl = document.createElement("input");

    const bank = bankLogo.find((logo) => logo.name === name);

    containerEl.className = "bank_account_wrap";

    accountWrapEl.className = "input_wrap";
    accountLabel.className = "bank_account";
    accountLabel.textContent = "계좌번호";
    imgWrapEl.className = "bank_wrap";
    bankNameTextEl.textContent = `${bank.name}`;

    validateMessage.className = "validate_account_wrap";

    phoneNumberWrap.className = "phone_number_wrap";
    phoneNumberText.className = "phone_number";
    phoneNumberText.textContent = "전화번호";

    phoneNumberInputEl.className = "phone_number_input";
    phoneNumberInputEl.placeholder = "01012345678";

    cardTemplate.dataset.bank_name = bank.name;
    cardTemplate.style.backgroundColor = ` ${bank.card}`;
    imgEl.src = `${bank.svg}`;
    const inputList = digits.map((digit) => {
      const digitInput = document.createElement("input");
      digitInput.className = "bank_account_input";
      digitInput.dataset.digit = digit;
      digitInput.inputMode = "numeric";
      digitInput.pattern = `^[0-9]{${digit}}$`;
      digitInput.placeholder = `${digit}자리`;
      digitInput.style.width = `calc(${digit} * 1.5rem)`;

      return digitInput;
    });

    imgWrapEl.append(imgEl, bankNameTextEl);
    accountWrapEl.append(accountLabel, ...inputList);
    phoneNumberWrap.append(phoneNumberText, phoneNumberInputEl);
    containerEl.append(
      imgWrapEl,
      accountWrapEl,
      validateMessage,
      phoneNumberWrap
    );
    cardTemplate.replaceChildren(containerEl);
    cardTemplate.addEventListener("input", inputHandler);
  }

  bankSelectArea.addEventListener("change", (e) => {
    const inputRadio = e.target;
    accountInfo.bankCode = inputRadio.id;
    const { digits, name } = bankSelectArea.banks.find(
      (bank) => bank.name === inputRadio.value
    );

    digits, name && renderInput(digits, name);
  });

  const inputHandler = (e) => {
    const inputEl = e.target;
    if (!inputEl) {
      return;
    }

    if (e.target.matches(".bank_account_input")) {
      accountInput(inputEl);
    }
    if (e.target.matches(".phone_number_input")) {
      phoneNumberInput(inputEl);
    }
  };

  const accountInput = (inputEl) => {
    const targetDigit = Number(inputEl.dataset.digit);
    const inputLength = inputEl.value.length;
    const accountInputs = Array.from(
      document.querySelectorAll(".bank_account_input")
    );
    const startInput = accountInputs.findIndex((input) => input === inputEl);
    const nextInput = accountInputs.length - 1;

    if (targetDigit === inputLength && startInput < nextInput) {
      accountInputs[startInput + 1].focus();
      return;
    }

    const accountInputsValue = accountInputs.map((input) => {
      const value = input.value;

      return value;
    });

    const accountNumber = accountInputsValue.join("");
    accountInfo.accountNumber = accountNumber;
  };

  const phoneNumberInput = (inputEl) => {
    const phoneNumber = inputEl.value;
    accountInfo.phoneNumber = phoneNumber;
    // validatePhoneTest(accountInfo.phoneNumber);
  };

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
    const checkedInputEl = document.querySelector(
      '.user_account_info input[type="radio"]:checked'
    );

    // const isChecked = accountTerminateBtnEl.dataset.checked
    const isChecked = checkedInputEl;
    if (isChecked) {
      const accountId = checkedInputEl.id;
      const bankName = checkedInputEl.value;
      renderModal(accountId, bankName);
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

    const accountsWrapper = document.querySelector(".account_info_wrap");
    const renderedAccountListEl = document.querySelector(".account_list");

    const listEl = document.createElement("ul");
    listEl.className = "account_list";

    const liEls = addAccounts.accounts.map((account) => {
      const liEl = document.createElement("li");

      liEl.dataset.id = account.id;
      liEl.dataset.bank_name = account.bankName;
      liEl.dataset.bank_code = account.bankCode;

      liEl.innerHTML = /*html*/ `
                    <div class ="user_account_info">
                      <input type="radio" name="bank" id=${account.id} value =${
        account.bankName
      }>
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

    if (renderedAccountListEl) {
      renderedAccountListEl.replaceChildren();
      renderedAccountListEl.append(...liEls);

      return;
    }

    accountsWrapper.append(listEl);
  }

  /*계좌 해지 버튼 누를시 나오는  서명하는 모달창*/
  function renderModal(accountId, bankName) {
    const modalDivEl = document.createElement("div");

    modalDivEl.dataset.id = accountId;
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
    const errorText = modalDiv.querySelector(".error_text");
    if (signatureInputEl.value.length > 0) {
      deleteCheckInfo.signature = true;
    } else {
      errorText.textContent = `서명 필요합니다.`;
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
