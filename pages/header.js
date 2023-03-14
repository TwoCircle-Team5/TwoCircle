import { eventBadgeHandler } from '../source/js/event_badge';
import { headerHandler } from '../source/js/header';


export function headerRender() {
  const wrap = document.querySelector('#wrap');
  wrap.innerHTML = /*html*/ `
  <header>
      <div class="header_top">
        <div class="inner">
          <div class="header_top_right">
            <div class="header_login">
              <a href="/login" data-navigo>로그인</a>
              <a href="/signup" data-navigo>회원가입</a>
            </div>
            <div class="header_logout">
              <p class="login_name">ㅇㅇㅇ님, 안녕하세요</p>
              <p class="logout_btn">로그아웃</p>
            </div>
          </div>
        </div>
      </div>
      <div class="header">
        <div class="inner">
          <h1 class="logo">
            <a href="/" data-navigo>
              <img class="header_logo" src="../image/main_logo.svg" alt="로고" />
            </a>
          </h1>
          <form class="search">
            <input type="text" />
            <button>
              <img class="search_icon" src="../image/search_icon.svg" alt="검색" />
            </button>
          </form>
          <ul class="header_right">
            <li>
              <a id="mypageBtn" href="/mypage" data-navigo>
                <img src="../image/mypage_icon.svg" alt="마이페이지" />
              </a>
            </li>
            <li>
              <a href="/cart" data-navigo>
                <span class="cart_num">0</span>
                <img src="../image/cart_icon.svg" alt="장바구니" />
              </a>
            </li>
            <li>
              <a href="/mypage/wish" data-navigo>
                <span class="heart_num">0</span>
                <img src="../image/heart_icon.svg" alt="찜하기" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <nav>
        <div class="inner">
          <ul class="nav">
            <li>
              <a href="/product_list/안경테" data-navigo>안경테</a>
            </li>
            <li>
              <a href="/product_list/선글라스" data-navigo>선글라스</a>
            </li>
            <li>
              <a href="/product_list/고글" data-navigo>고글</a>
            </li>
            <li>
              <a href="/product_list/베스트" data-navigo>베스트</a>
            </li>
            <li>
              <a href="/product_list/신상품" data-navigo>신상품</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <section class="event">
      <div class="event_wrap">
        <div class="swiper-container event-swiper">
          <p class="team">TEAM5<br><span>23.01.30<br>~ ING</span></p>
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <a href="https://github.com/Nevacat" target="_blank">
                <img src="https://avatars.githubusercontent.com/u/110139098?v=4" alt="박희수 프로필">
                <p>박희수</p>
              </a>
            </div>
            <div class="swiper-slide">
              <a href="https://github.com/seon-mikim" target="_blank">
                <img src="https://avatars.githubusercontent.com/u/100131415?v=4" alt="김선미 프로필">
                <p>김선미</p>
              </a>
            </div>
            <div class="swiper-slide">
              <a href="https://github.com/jiyoon29" target="_blank">
                <img src="https://avatars.githubusercontent.com/u/71622691?v=4" alt="송지윤 프로필">
                <p>송지윤</p>
              </a>
            </div>
            <div class="swiper-slide">
              <a href="https://github.com/hyeon17" target="_blank">
                <img src="https://avatars.githubusercontent.com/u/83224463?v=4" alt="장현준 프로필">
                <p>장현준</p>
              </a>
            </div>
            <div class="swiper-slide">
              <a href="https://github.com/johnphjkr" target="_blank">
                <img src="https://avatars.githubusercontent.com/u/69203535?v=4" alt="박현준 프로필">
                <p>박현준</p>
              </a>
            </div>
          </div>
          <div class="swiper-scrollbar"></div>
        </div>
      </div>
      <div class="up_button">
        <a href="javascript:void(0)" class="resently">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16ZM8.00078 12.8C5.34981 12.8 3.20078 10.651 3.20078 8C3.20078 5.34903 5.34981 3.2 8.00078 3.2C10.6517 3.2 12.8008 5.34903 12.8008 8C12.8008 10.651 10.6517 12.8 8.00078 12.8Z"
              fill="url(#paint0_linear)"></path>
            <defs>
              <linearGradient id="paint0_linear" x1="1" y1="3.5" x2="14.5" y2="13" gradientUnits="userSpaceOnUse">
                <stop stop-color="#0076F7"></stop>
                <stop offset="0.484375" stop-color="#6E25DD"></stop>
                <stop offset="1" stop-color="#8837F5"></stop>
              </linearGradient>
            </defs>
          </svg>최근 본 상품</a>
        <button class="scroll_top">TOP</button>
      </div>
    </section>
    <div id="app"></div>
    <footer>
      <div class="footer_container">
        <div class="inner">
          <div class="footer_left">
            <h2><img src="../image/main_logo.svg" alt="Logo Image"/></h2>
            <p>
              <a href="#">개인정보처리방침</a>
              <a href="#">이용약관</a>
            </p>
            <p class="footer_txt">
              <b>(주)TwoCircle</b>
              <span>대표 : T.C.</span>
              <br />
              <span>대표전화 : 1234-1234</span>
              <span>팩스 : 02-1234-1234</span>
              <br />
              <span>사업자 주소 : 서울특별시 강남구 강남대로 투써클빌딩 3층</span>
              <br />
              <span>사업자등록번호 : 123-12-12345</span>
            </p>
          </div>
          <div class="footer_right">
            <div class="footer_cs">
              <h3>CS CENTER</h3>
              <h4>1234-1234</h4>
              <p>
                cs@twocircle.com
                <br />
                고객센터 : 평일 오전 10시 ~ 오후 5시
                <br />
                (설, 추석 당일 휴무)
              </p>
            </div>
            <div class="footer_bank">
              <h3>BANK INFO</h3>
              <h4>예금주 : (주)투써클</h4>
              <p class="footer_txt">
                국민은행 012123-02-00123
                <br />
                신한은행 012123-02-00123
                <br />
                하나은행 012123-02-00123
                <br />
                기업은행 012123-02-00123
              </p>
            </div>
            <div class="footer_sns_box">
              <h3>SNS</h3>
              <ul class="footer_sns">
                <li class="product_list_item">
                  <img src="../image/kcp_icon.png" alt="TwoCircle_logo" />
                </li>
                <li class="product_list_item">
                  <a href="https://www.facebook.com" class="facebook"> </a>
                </li>
                <li class="product_list_item">
                  <a href="https://www.instagram.com" class="insta"> </a>
                </li>
                <li class="product_list_item">
                  <a href="https://github.com/TwoCircle-Team5/TwoCircle" class="git">
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="footer_copy">
        <div class="inner">
          <p>©two circle. all right reserved</p>
        </div>
      </div>
    </footer>
  `;
  headerHandler()
  eventBadgeHandler()
}
