import Navigo from 'navigo';
import { authCheck } from './api/certified/authcheck_api.js';
import { logout } from './api/certified/logout_api.js';

// 페이지
import { mainRender } from '../pages/user/main.js';
import { loginRender } from '../pages/user/login.js';
import { signupRender } from '../pages/user/signup';
import { navRender, mypageRender } from '../pages/user/mypage';
import { wishRender } from '../pages/user/wish_list';
import { purchaseRender } from '../pages/user/purchase_history';
import { cartRender } from '../pages/user/cart';
import { productDetailRender } from '../pages/user/product_details.js';
import { paymentRender } from '../pages/user/payment.js';
import { orderCompletedRender } from '../pages/user/order_completed.js';
import { accountRender } from '../pages/user/account';
import { productRender } from './js/product_list.js';
import { productListRender } from '../pages/user/product_list';
import { userInfoRender } from '../pages/user/user_information.js';
import { adminPageRender } from '../pages/admin/admin_product_list.js';
import { adminProductAdd } from '../pages/admin/product_add.js';
import { pwCheckRender } from '../pages/user/password_check.js';
import { headerRender } from '../pages/header.js';
import { adminWrap } from '../pages/admin_wrap.js';
import { searchListRender } from '../pages/user/product_search.js';
import { adminProduct } from '../pages/admin/product.js';
import { productUpdate } from '../pages/admin/product_update.js';
import { userListRender } from '../pages/admin/admin_userlist.js';
import { admin } from './js/admin/admin.js';
import { dashBoardRender } from '../pages/admin/admin_dashboard.js';
import { notFoundRender } from '../pages/notfound/404page.js';

// const userSystemPreferColorThemeQuery = "(prefers-color-scheme: dark)";
// const userSystemTheme = window.matchMedia(userSystemPreferColorThemeQuery).matches ? 'dark' : 'light';
// const userTheme = localStorage.getItem('mode')

// userTheme === 'dark' ? : ;

// function setDarkMode() {}

export const router = new Navigo('/');

router.hooks({
  before: async (done, match) => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    const auth = await authCheck(accessToken);
    headerRender();
    // 페이지 가드
    const onlyUserPages = [
      'mypage',
      'mypage/wish',
      'account',
      'payment',
      'mypage/changeInfo',
      'mypage/account',
      'admin',
      'admin/product_add',
    ];
    const onlyAdminPages = ['admin', 'admin/product_add', 'admin/user_list', 'admin/dashboard'];

    if (onlyUserPages.includes(match.url) && !auth) {
      router.navigate('login');
      done();
    }
    if ((match.url === 'login' || match.url === 'signup') && auth) {
      router.navigate('/');
      done();
    }
    // 관리자 페이지
    if (onlyAdminPages.includes(match.url) && auth.email != process.env.ADMIN) {
      alert('유용한 사용자가 아닙니다.');
      history.go(-1);
    }

    // 로그인 로그아웃시 헤더 변경
    const loginEl = document.querySelector('.header_login');
    const logoutEl = document.querySelector('.header_logout');
    const loginNameEl = document.querySelector('.login_name');
    const logoutBtn = document.querySelector('.logout_btn');
    if (auth) {
      loginEl.style.display = 'none';
      logoutEl.style.display = 'flex';
      loginNameEl.innerHTML = `${auth.displayName}님, 안녕하세요`;
      logoutBtn.addEventListener('click', async () => {
        await logout(accessToken);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('payment');
        loginEl.style.display = 'flex';
        logoutEl.style.display = 'none';
        router.navigate('/');
        done();
      });
    } else {
      loginEl.style.display = 'flex';
      logoutEl.style.display = 'none';
    }

    // 관리자
    if (auth && auth.email === process.env.ADMIN) {
      loginNameEl.innerHTML = /* html */ `
        <a href="/admin">관리자페이지로 이동</a>
      `;
    }
    done();
  },
  after: (match) => {
    window.scroll(0, 0);
  },
});
router
  .on({
    '/': () => {
      mainRender();
    },
    'login': () => {
      loginRender();
    },
    'signup': () => {
      signupRender();
    },
    'cart': () => {
      cartRender();
    },
    'mypage': () => {
      navRender();
      mypageRender();
    },
    'mypage/wish': () => {
      navRender();
      wishRender();
    },
    'mypage/purchase': () => {
      navRender();
      purchaseRender();
    },
    'mypage/changeInfo': (match) => {
      navRender();
      pwCheckRender(match.url);
    },
    'mypage/account': (match) => {
      navRender();
      pwCheckRender(match.url);
      accountRender();
    },
    'product_list/:id': (match) => {
      productListRender(match.data.id);
    },
    'product_search/:id': (match) => {
      searchListRender(match.data.id);
      productRender(match.data.id, []);
    },
    'order_completed': () => {
      orderCompletedRender();
    },
    'product_details/:id': (match) => {
      productDetailRender(match);
    },
    'payment': () => {
      paymentRender();
    },
    'order_completed': () => {
      orderCompletedRender();
    },
    'admin': () => {
      adminWrap();
      adminPageRender();
      const ativeNav = document.querySelector('.menu_prd_list');
      ativeNav.classList.add('now_page');
    },
    'admin/product_add': () => {
      adminWrap();
      adminProductAdd();
      const ativeNav = document.querySelector('.menu_prd_add');
      ativeNav.classList.add('now_page');
    },
    'admin/user_list': () => {
      adminWrap();
      userListRender();
      const ativeNav = document.querySelector('.menu_user_list');
      ativeNav.classList.add('now_page');
    },
    'admin/dashboard': () => {
      adminWrap();
      dashBoardRender();
      const ativeNav = document.querySelector('.menu_dashboard');
      ativeNav.classList.add('now_page');
    },
    'admin/:id': (match) => {
      adminWrap();
      adminProduct(match.data.id);
      const ativeNav = document.querySelector('.menu_prd_list');
      ativeNav.classList.add('now_page');
    },
    'admin/update/:id': (match) => {
      adminWrap();
      productUpdate(match.data.id);
      const ativeNav = document.querySelector('.menu_prd_list');
      ativeNav.classList.add('now_page');
    },
  })
  .notFound(() => {
    notFoundRender();
  })
  .resolve();
