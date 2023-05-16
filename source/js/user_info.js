import { userupdate } from "../api/certified/userupdate_api";
import { authCheck } from "../api/certified/authcheck_api";
import { checkAccount } from "../api/account/account_add_check";
import { pwCheckApi } from "../api/certified/pw_check_api";

export async function userInfoHandler() {

    const imgUploadEl = document.querySelector(".upload_img");
    const newProfileEl = document.querySelector(".user_info_img");
    const picChangeBtnEl = document.querySelector(".user_info_picture_btn");
    const pwChangeBtnEl = document.querySelector(".user_info_pw_btn");
    const nameChangeBtnEl = document.querySelector(".user_info_name_btn");
    const changeModalEl = document.querySelector(".change_modal");
    const idEl = document.querySelector(".user_info_id_span");
    const nameEl = document.querySelector(".user_info_name_span");
    const pwEl = document.querySelector(".user_info_pw_span");
    const accountInformationEl = document.querySelector(".account_information_list");

    let displayName = "";
    let profileImgBase64 = "";

    let id = "";
    let name = "";
    let image = "";
    let user_accounts = "";

    //window.onload = async function () {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        const res = await authCheck(accessToken);
        id = res.email;
        name = res.displayName;
        image = res.profileImg;
        idEl.innerText = id;
        nameEl.innerText = name;
        if (image != null) {
            newProfileEl.src = image;
        }
        const res2 = await checkAccount();
        //const json = await res2.json();
        user_accounts = res2.accounts;

        const accountEls = user_accounts.map(function (account) {
            const accountEl = document.createElement('div');
            accountEl.classList.add("account_information_el");
            const nameEl = document.createElement('span');
            const accountNumberEl = document.createElement('span');
            accountNumberEl.classList.add("account_information_span");

            nameEl.textContent = account.bankName;
            accountNumberEl.textContent = account.accountNumber;
            accountEl.append(nameEl, accountNumberEl);
            accountInformationEl.appendChild(accountEl);

            return accountEl;
        })

    //}

    function modalOn() {
        changeModalEl.style.display = "flex";
    }

    function modalOff() {
        changeModalEl.style.display = "none";
        changeModalEl.innerHTML = "";
    }

    picChangeBtnEl.addEventListener("click", (e) => {
        imgUploadEl.click();
        imgUploadEl.addEventListener("change", (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.addEventListener('load', async (e) => {
                const imgURL = e.target.result;
                const newImage = new Image();
                profileImgBase64 = imgURL;

                newImage.addEventListener('load', () => {
                    newProfileEl.setAttribute('src', imgURL);
                });

                newImage.setAttribute('src', imgURL);
                await userupdate({ profileImgBase64 });
            });
            reader.readAsDataURL(file);
        });
    });

    pwChangeBtnEl.addEventListener("click", (e) => {
        modalOn();
        changeModalEl.innerHTML = /* HTML */`
        <div class="change_modal_box">
            <div class="pw_change_inner">
                <div class="pw_change_notice_section">
                    <h1>비밀번호 변경</h1>
                    <h4>안전한 비밀번호로 내정보를 보호하세요</h4>
                    <h4>다른 아이디/사이트에서 사용한 적 없는 비밀번호</h4>
                    <h4>이전에 사용한 적 없는 비밀번호가 안전합니다.</h4>
                </div>
                <div class="pw_change_section">
                    <input class="current_pw_input" placeholder="현재 비밀번호" type="password">
                    <input class="new_pw_input" placeholder="새 비밀번호" type="password">
                    <input class="new_pw_check_input" placeholder="새 비밀번호 확인" type="password">
                    <div class="pw_change_section_btn">
                        <button class="pw_change_cancel_btn">취소</button>
                        <button class="pw_change_ok_btn">확인</button>
                    </div>
                </div>
            </div>
        </div>
        `
        const inputCurrentPwEl = document.querySelector(".current_pw_input");
        const inputNewPwEl = document.querySelector(".new_pw_input");
        const inputNewPwCheckEl = document.querySelector(".new_pw_check_input");
        const pwChangeOkBtnEl = document.querySelector(".pw_change_ok_btn");
        const pwChangeCancelBtnEl = document.querySelector(".pw_change_cancel_btn");

        let id = "";
        let oldPassword = "";
        let newPassword = "";
        let newPassword_check = "";
        let pw_check = "";
        let pwChangeDone = false;

        inputCurrentPwEl.addEventListener("input", (e) => {
            pw_check = e.target.value;
        });

        inputNewPwEl.addEventListener("input", (e) => {
            newPassword = e.target.value;
        });

        inputNewPwCheckEl.addEventListener("input", (e) => {
            newPassword_check = e.target.value;
        });

        pwChangeOkBtnEl.addEventListener("click", async (e) => {
            e.preventDefault();
            const accessToken = JSON.parse(localStorage.getItem('accessToken'));
            const res = await authCheck(accessToken);
            id = res.email;

            const body = {
                email: id,
                password: pw_check
            }

            const json = await pwCheckApi("POST", body);

            if (json.status === 200) {
                if (newPassword != newPassword_check) {
                    alert("비밀번호 확인이 잘못되었습니다.");
                }
                else {
                    oldPassword = pw_check;
                    await userupdate({ oldPassword, newPassword });
                    alert("비밀번호 변경이 완료되었습니다.");
                    modalOff();
                }
            }
            else {
                alert("기존 비밀번호가 틀렸습니다.");
            }
        });
        pwChangeCancelBtnEl.addEventListener("click", async (e) => {
            modalOff();
        });
        window.onclick = function (event) {
            if (event.target == changeModalEl) {
                modalOff();
            }
        }
    });

    nameChangeBtnEl.addEventListener("click", async (e) => {
        modalOn();
        changeModalEl.innerHTML = /* HTML */`
        <div class="change_modal_box">
            <h1>이름 변경</h1>
            <span>변경하실 이름을 입력하세요. (이름은 한글만 가능합니다.)</span>
            <input class="new_name" placeholder="새 이름">
            <div class="new_name_section_btn">
                <button class="change_cancel_btn">취소</button>
                <button class="change_ok_btn">확인</button>
            </div>
        </div>
        `
        const changeCancelBtnEl = document.querySelector(".change_cancel_btn");
        const changeOkBtnEl = document.querySelector(".change_ok_btn");
        const inputNameEl = document.querySelector(".new_name");
        inputNameEl.addEventListener("input", (e) => {
            displayName = e.target.value;
        });
        changeCancelBtnEl.addEventListener("click", modalOff);

        changeOkBtnEl.addEventListener("click", async (e) => {
            if (validateName(displayName)) {
                await userupdate({ displayName });
                nameEl.innerText = displayName;
                modalOff();
            }
            else {
                alert('이름 형식이 유효하지 않습니다')
            }
        });
        window.onclick = function (event) {
            if (event.target == changeModalEl) {
                modalOff();
            }
        }
    });

    //이름 검사
    function validateName(name) {
        const regex = /^[가-힣]+$/;
        return regex.test(name);
    }
}