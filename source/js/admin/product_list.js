import { allProduct } from '../../api/products/admin/allProduct_api.js';
import { productDelete } from '../../api/products/admin/product_delete.js';
import { updatePagination, displayPage } from '../pagination.js';

export async function adminProductList() {
  const data = await allProduct();
  renderList(data);
}

function renderList(data) {
  const listEl = document.querySelector('.product_admin_ul');
  const labelEl = document.querySelector('label');
  const deleteBtn = document.querySelector('.delete_btn');
  const paginationContainer = document.querySelector('.pagination');
  const dot = document.querySelector('.dot-wrap');
  let itemLength = 0;
  let currentPage = 1;
  let itemsPerPage = 10;

  const liEls = data.map((prd, idx) => {
    const liEl = document.createElement('li');
    liEl.classList.add('product_admin_li');
    liEl.innerHTML = /* html */ `
      <a href="./admin/${prd.id}" class="admin_list">
        <input type="checkbox" name="check" data-id=${prd.id} />
        <p>${idx + 1}</p>
        <div class="product_img">
          <img src="${
            prd.thumbnail ? prd.thumbnail : 'https://via.placeholder.com/100x100?text=NO+IMAGE'
          }" alt="썸네일" />
        </div>
        <div class="product_text">
          <p>${prd.title}</p>
          <span>${prd.description}</span>
        </div>
        <p>${prd.price} 원</p>
        <p class="sold">${prd.isSoldOut ? '<span class="sold_out">품절</span>' : '판매중'}</p>
      </a>
      `;

    return liEl;
  });
  listEl.innerHTML = '';
  listEl.append(...liEls);

  const listItems = document.querySelectorAll('.product_admin_li');
  console.log(listItems);
  itemLength = listItems.length;
  updatePagination(itemLength, itemsPerPage, currentPage, paginationContainer);
  displayPage(currentPage, itemsPerPage, listItems);

  // 페이지 클릭 이벤트
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
  // 전체체크
  labelEl.addEventListener('change', function () {
    const allCheck = labelEl.querySelector('input');
    const checkboxs = document.getElementsByName('check');
    checkboxs.forEach((checkbox) => {
      checkbox.checked = allCheck.checked;
    });
  });

  deleteBtn.addEventListener('click', async function () {
    const checkboxs = document.getElementsByName('check');
    const choseDelete = async () => {
      for (const checkbox of checkboxs) {
        if (checkbox.checked) {
          await productDelete(checkbox.dataset.id);
        }
      }
      const list = await allProduct();
      renderList(list);
    };
    choseDelete();
  });

  // 메인 진열 상품 개수 알기
  function countTags(data, tag) {
    return data.reduce((count, item) => {
      return item.tags.includes(tag) ? count + 1 : count;
    }, 0);
  }
  const mainTagCount = {
    bestCount: countTags(data, 'best'),
    mdCount: countTags(data, 'md'),
    newCount: countTags(data, 'new'),
  };
  localStorage.setItem('mainTagCount', JSON.stringify(mainTagCount));

  dot.style.display = 'none';
}
