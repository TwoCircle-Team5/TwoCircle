import { userupdate } from '../api/certified/userupdate_api';
import { authCheck } from '../api/certified/authcheck_api';
import { checkAccount } from '../api/account/account_add_check';
import { purchaseHistory } from '../api/products/user/purchase_history_api';
import { purchaseOk } from '../api/products/user/purchase_ok_api';
import { purchaseCancel } from '../api/products/user/purchase_cancel_api';
import { updatePagination, displayPage } from './pagination.js';

export async function purchaseHandler() {
  const listItemContainerEl = document.querySelector('.list_item_container');
  const listItemSelectEl = document.querySelector('.list_item_list_select');
  const listItemConfirmEl = document.querySelector('.list_item_list_confirm');
  const listItemCancelEl = document.querySelector('.list_item_list_cancel');
  const itemModalEl = document.querySelector('.container_content_modal');
  const dateFilter1MonthEl = document.querySelector('.delivery_filter_month_1');
  const dateFilter3MonthEl = document.querySelector('.delivery_filter_month_3');
  const dateFilter6MonthEl = document.querySelector('.delivery_filter_month_6');
  const dateFilter12MonthEl = document.querySelector('.delivery_filter_month_12');
  const status1FilterEl = document.querySelector('.delivery_filter_status_1');
  const status2FilterEl = document.querySelector('.delivery_filter_status_2');
  const status3FilterEl = document.querySelector('.delivery_filter_status_3');
  const paginationContainer = document.querySelector('.list_item_pagination');
  const noListContainerEl = document.querySelector('.no_list_container');
  const noListSpanEl = document.querySelector('.no_list_span');

  let product_title = '';
  let product_price = 0;
  let product_time = '';
  let dealDone = false;
  let dealCanceled = false;
  let list_items = '';
  let detailId = '';
  let filtered_items = '';
  let sorted_items = '';
  let status = 0;
  let days = 100000000; // 날짜 필터용 (기본은 무한이므로 큰 숫자로)
  var button_active = {
    button1month: false,
    button3month: false,
    button6month: false,
    button12month: false,
  };
  let currentPage = 1;
  let itemsPerPage = 5;
  let itemLength = 0;

  
  status1FilterEl.style.cssText = 'background-color: #FF597B; border-color: #FF597B; color: #FFFFFF;';
  renderItemList();
  //targetPageLink = document.querySelectorAll('.list_item_pagination a[data-page="1"]');
  //console.log('링크 '+Array.for(targetPageLink));
  //var targetPageLinkHref = targetPageLink.href;
  //targetPageLinkHref.classList.add('active-link');
  

  //구매 상태 필터 이벤트
  status1FilterEl.addEventListener('click', (e) => {
    status = 1;
    statusFilter(status);
  });
  status2FilterEl.addEventListener('click', (e) => {
    status = 2;
    statusFilter(status);
  });
  status3FilterEl.addEventListener('click', (e) => {
    status = 3;
    statusFilter(status);
  });

  //날짜 필터 버튼 활성화 및 비활성화
  function toggleMonthFilter(filter_days) {
    if (this.classList.contains('active')) {
      days = 100000000;
      this.classList.remove('active');
      this.style.cssText = '';
    } else {
      dateFilter1MonthEl.classList.remove('active');
      dateFilter1MonthEl.style.cssText = '';
      dateFilter3MonthEl.classList.remove('active');
      dateFilter3MonthEl.style.cssText = '';
      dateFilter6MonthEl.classList.remove('active');
      dateFilter6MonthEl.style.cssText = '';
      dateFilter12MonthEl.classList.remove('active');
      dateFilter12MonthEl.style.cssText = '';
      days = filter_days;
      this.classList.add('active');
      this.style.cssText = 'background-color: #FF597B; border-color: #FF597B; color: #FFFFFF;';
    }
    renderItemList();
  }

  //날짜 필터 이벤트
  dateFilter1MonthEl.removeEventListener('click', toggleMonthFilter);
  dateFilter1MonthEl.addEventListener('click', function () {
    toggleMonthFilter.call(this, 30);
  });

  dateFilter3MonthEl.removeEventListener('click', toggleMonthFilter);
  dateFilter3MonthEl.addEventListener('click', function () {
    toggleMonthFilter.call(this, 90);
  });

  dateFilter6MonthEl.removeEventListener('click', toggleMonthFilter);
  dateFilter6MonthEl.addEventListener('click', function () {
    toggleMonthFilter.call(this, 180);
  });

  dateFilter12MonthEl.removeEventListener('click', toggleMonthFilter);
  dateFilter12MonthEl.addEventListener('click', function () {
    toggleMonthFilter.call(this, 365);
  });

  //한국 시간으로 변경하는 함수
  function getdate(date) {
    const new_date = new Date(date);
    var kor_date = new_date.toLocaleString('ko-KR');

    return kor_date;
  }

  //임시..
  // function modalOn() {
  //     itemModalEl.style.display = "flex";
  // }

  // function modalOff() {
  //     itemModalEl.style.display = "none";
  //     itemModalEl.innerHTML = "";
  // }

  //날짜 필터
  function dateFilter(filtered_items, days) {
    const oneDay = 24 * 60 * 60 * 1000;
    const now_date = new Date();
    const filteredItems = filtered_items.filter((filtered_item) => {
      const pay_date = new Date(filtered_item.timePaid);
      const timeDiff = Math.abs(now_date.getTime() - pay_date.getTime());
      const dayDiff = Math.ceil(timeDiff / oneDay);
      return dayDiff <= days;
    });
    filteredItems.sort((a, b) => new Date(b.timePaid) - new Date(a.timePaid));
    return filteredItems;
  }

  //구매 상태 필터
  function statusFilter(status) {
    switch (status) {
      case 1:
        if (listItemSelectEl.style.display === 'none') {
          listItemSelectEl.style.display = 'flex';
          listItemSelectEl.style.flexDirection = 'column';
        }
        if (listItemConfirmEl.style.display === 'none') {
          listItemConfirmEl.style.display = 'flex';
          listItemConfirmEl.style.flexDirection = 'column';
        }
        if (listItemCancelEl.style.display === 'none') {
          listItemCancelEl.style.display = 'flex';
          listItemCancelEl.style.flexDirection = 'column';
        }
        status1FilterEl.style.cssText = 'background-color: #FF597B; border-color: #FF597B; color: #FFFFFF;';
        status2FilterEl.style.cssText = '';
        status3FilterEl.style.cssText = '';
        break;
      case 2:
        listItemSelectEl.style.display = 'none';
        if (listItemConfirmEl.style.display === 'none') {
          listItemConfirmEl.style.display = 'flex';
          listItemConfirmEl.style.flexDirection = 'column';
        }
        listItemCancelEl.style.display = 'none';
        status1FilterEl.style.cssText = '';
        status2FilterEl.style.cssText = 'background-color: #FF597B; border-color: #FF597B; color: #FFFFFF;';
        status3FilterEl.style.cssText = '';
        break;
      case 3:
        listItemSelectEl.style.display = 'none';
        listItemConfirmEl.style.display = 'none';
        if (listItemCancelEl.style.display === 'none') {
          listItemCancelEl.style.display = 'flex';
          listItemCancelEl.style.flexDirection = 'column';
        }
        status1FilterEl.style.cssText = '';
        status2FilterEl.style.cssText = '';
        status3FilterEl.style.cssText = 'background-color: #FF597B; border-color: #FF597B; color: #FFFFFF;';
        break;
    }
    renderItemList();
  }

  //시간 정렬
  function sortByDate() {}
  //렌더링
  async function renderItemList() {
    showLoading();
    listItemSelectEl.innerHTML = '';
    listItemConfirmEl.innerHTML = '';
    listItemCancelEl.innerHTML = '';
    listItemContainerEl.appendChild(listItemSelectEl);
    listItemContainerEl.appendChild(listItemConfirmEl);
    listItemContainerEl.appendChild(listItemCancelEl);
    listItemContainerEl.appendChild(paginationContainer);
    const res = await purchaseHistory();
    list_items = res;

    filtered_items = dateFilter(list_items, days);
    if (filtered_items.length > 0) {
      noListContainerEl.style.display = "none";
      const liEls = filtered_items.map(function (item) {
        const listItemEl = document.createElement('li');

        listItemEl.classList.add('list_item');
        listItemEl.setAttribute('data-status', 'select');

        //상품이미지
        const imgEl = document.createElement('div');
        imgEl.classList.add('list_item_productInfo');
        var product_img = document.createElement('img');
        product_img.src = item.product.thumbnail;
        imgEl.append(product_img);

        //상품명
        const titleEl = document.createElement('div');
        titleEl.classList.add('list_item_orderNumber');

        //상품가격
        const priceEl = document.createElement('div');
        priceEl.classList.add('list_item_payAmount');

        //주문시간
        const timeEl = document.createElement('div');
        timeEl.classList.add('list_item_orderDate');

        //버튼
        const btnEl = document.createElement('div');
        btnEl.classList.add('list_item_btn');

        detailId = item.detailId;
        dealCanceled = item.isCanceled;
        dealDone = item.done;

        let result = item.product.title;

        if (item.product.title.includes('/')) {
          const index = item.product.title.indexOf('/');
          result = item.product.title.substring(0, index);
        }

        titleEl.textContent = result;
        priceEl.textContent = item.product.price + ' 원';
        timeEl.textContent = getdate(item.timePaid);
        const productInfoEl = document.createElement('div');
        productInfoEl.classList.add('list_item_info');
        productInfoEl.append(imgEl, titleEl);
        listItemEl.append(timeEl, productInfoEl, priceEl, btnEl);

        if (dealCanceled == true && dealDone == false) {
          btnEl.textContent = '구매 취소';
          listItemCancelEl.appendChild(listItemEl);
        }
        if (dealDone == true && dealCanceled == false) {
          btnEl.textContent = '구매 확정';
          listItemConfirmEl.appendChild(listItemEl);
        }
        if (dealDone == false && dealCanceled == false) {
          const btnOkEl = document.createElement('div');
          btnOkEl.classList.add('btn_ok');
          btnOkEl.textContent = '확정';
          const btnCancelEl = document.createElement('div');
          btnCancelEl.classList.add('btn_cancel');
          btnCancelEl.textContent = '취소';

          btnOkEl.addEventListener('click', (e) => {
            //구매 확정
            alert('구매가 확정되었습니다!');
            dealDone = true;
            detailId = item.detailId;
            purchaseOk({ detailId });
            btnOkEl.style.display = 'none';
            btnCancelEl.style.display = 'none';
            btnEl.textContent = '구매 확정';
            //listItemEl.setAttribute('data-status', 'confirm');
          });

          btnCancelEl.addEventListener('click', (e) => {
            //구매 취소
            alert('구매가 취소되었습니다.');
            dealCanceled = true;
            detailId = item.detailId;
            purchaseCancel({ detailId });
            btnOkEl.style.display = 'none';
            btnCancelEl.style.display = 'none';
            btnEl.textContent = '구매 취소';
            //listItemEl.setAttribute('data-status', 'cancel');
            //listItemEl.style.display = "none";
          });

          btnEl.append(btnOkEl, btnCancelEl);

          listItemSelectEl.appendChild(listItemEl);
        }
      

        hideLoading();
        return listItemEl;
      });
    }
    else {
      noListContainerEl.style.display = "flex";
    }
    hideLoading();
    switch (status) {
      case 1:
        break;
      case 2:
        listItemContainerEl.removeChild(listItemSelectEl);
        listItemContainerEl.removeChild(listItemCancelEl);
        if (listItemConfirmEl.children.length === 0) {
          noListContainerEl.style.display = "flex";
        }
        break;
      case 3:
        listItemContainerEl.removeChild(listItemSelectEl);
        listItemContainerEl.removeChild(listItemConfirmEl);
        if (listItemCancelEl.children.length === 0) {
          noListContainerEl.style.display = "flex";
        }
        break;
    }

    const listItems = listItemContainerEl.querySelectorAll('ul li');
    itemLength = listItems.length;
    updatePagination(itemLength, itemsPerPage, currentPage, paginationContainer);
    displayPage(currentPage, itemsPerPage, listItems);

    paginationContainer.addEventListener('click', (event) => {
      event.preventDefault();
      const link = event.target;

      if (link.classList.contains('page-link')) {
        const pageNum = parseInt(link.dataset.page, 10);
        currentPage = pageNum;
        updatePagination(itemLength, itemsPerPage, currentPage, paginationContainer);
        displayPage(pageNum, itemsPerPage, listItems);
      }
      if (link.textContent === '<<') {
        if (currentPage === 1) {
          return;
        }
        currentPage = 1;
        updatePagination(itemLength, itemsPerPage, currentPage, paginationContainer);
        displayPage(currentPage, itemsPerPage, listItems);
      }
      if (link.textContent === '<') {
        if (currentPage === 1) {
          return;
        }
        currentPage -= 1;
        updatePagination(itemLength, itemsPerPage, currentPage, paginationContainer);
        displayPage(currentPage, itemsPerPage, listItems);
      }
      if (link.textContent === '>') {
        if (currentPage === Math.ceil(itemLength / itemsPerPage)) {
          return;
        }
        currentPage += 1;
        updatePagination(itemLength, itemsPerPage, currentPage, paginationContainer);
        displayPage(currentPage, itemsPerPage, listItems);
      }
      if (link.textContent === '>>') {
        if (currentPage === Math.ceil(itemLength / itemsPerPage)) {
          return;
        }
        currentPage = Math.ceil(itemLength / itemsPerPage, currentPage);
        updatePagination(itemLength, itemsPerPage, currentPage, paginationContainer);
        displayPage(currentPage, itemsPerPage, listItems);
      }
    });
  }

  //로딩
  function showLoading() {
    document.getElementsByClassName('layerPopup')[0].style.display = 'block';
  }

  function hideLoading() {
    document.getElementsByClassName('layerPopup')[0].style.display = 'none';
  }
}