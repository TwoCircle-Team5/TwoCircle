import { userInfo } from "os";
import { userInfoHandler } from "../../source/js/user_info";

{/* <!-- up 버튼 -->
<!-- <div class="up_button">
    <a href="javascript:window.scrollTo({top:0,behavior:'smooth'});"><img class="up_button_img"
            src="../../image/top.png"></a>
</div> --> */}
export function userInfoRender(){
  const mypage = document.querySelector("#mypage")
  mypage.innerHTML = /*html*/`
  <div class="user_info_inner">
    <span>기본 회원정보</span>
    <div class="user_info">
      <div class="user_info_picture">
        <span>사진</span>
        <div class="user_info_picture_section">
          <img class="user_info_img" src="../../image/default-profile.png">
          <div class="user_info_img_span">
            <span>회원님을 알릴 수 있는 사진을 등록해 주세요.</span>
            <span>등록된 사진은 회원님의 게시물이나 댓글들에 사용됩니다.</span>
          </div>
        </div>
        <input type="file" class="upload_img" accept="image/*">
        <button class="user_info_picture_btn">사진 변경</button>
      </div>
      <div class="user_info_id">
        <span>아이디</span>
        <span class="user_info_id_span">example</span>
      </div>
      <div class="user_info_pw">
        <span>비밀번호</span>
        <span class="user_info_pw_span">********</span>
        <button class="user_info_pw_btn">비밀번호 변경</button>
      </div>
      <div class="user_info_name">
        <span>이름(실명)</span>
        <span class="user_info_name_span">홍길동</span>
        <button class="user_info_name_btn">이름수정</button>
      </div>
    </div>
    <div class="change_modal"></div>
    <span>계좌정보</span>
    <div class="account_information">
      <ul class="account_information_list">
      </ul>
    </div>
  </div>`
  userInfoHandler();
}

{/* <!--<span>OO은행</span>
        <span class="account_information_span">2000-01-01</span> --> */}
  
