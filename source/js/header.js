import { router } from '../../source/route';

export function headerHandler() {
  // 검색기능
  const search = document.querySelector('.search');
  const searchInput = document.querySelector('.search input');

  search.addEventListener('submit', (e) => {
    e.preventDefault();
    router.navigate(`product_search/${searchInput.value}`);
  });

  // 카트, 찜하기 개수
  const cartNum = document.querySelector('.cart_num');
  const heartNum = document.querySelector('.heart_num');

  if (localStorage.getItem('basket')) {
    cartNum.innerText = JSON.parse(localStorage.getItem('basket')).length;
  }
  if (localStorage.getItem('wish')) {
    heartNum.innerText = JSON.parse(localStorage.getItem('wish')).length;
  }
}
