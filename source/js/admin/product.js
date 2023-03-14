import { product } from "../../api/products/admin/product.js";
import { productDelete } from "../../api/products/admin/product_delete.js";
import { router } from "../../route.js";



export async function adminProductHandler(id) {
  const data = await product(id);
  renderProduct(data);
}

function renderProduct(data) {
  const dot = document.querySelector(".dot-wrap");
  const adminWrap = document.querySelector('.admin_wrap');
  const titleEl = document.querySelector('.title');
  let tag = false;
  const mainTag = Array.from(data.tags).filter(ele => ['best', 'md', 'new'].includes(ele));
  const productTag = Array.from(data.tags).filter(ele => !mainTag.includes(ele));

  titleEl.innerHTML = /* html */ `
    <h2>${data.title}</h2>
    <div class="button_box">
      <button type="button" class="delete_btn">삭제하기</button>
      <a href="/admin/update/${data.id}">수정하기</a>
    </div>
  `;

  adminWrap.innerHTML = /* html */ `
    <div class="product_left">
      <div class="product_img">
        <img src=${data.thumbnail ? data.thumbnail : 'https://via.placeholder.com/400x400?text=NO+IMAGE'} alt=${data.description} />
      </div>
      <div class="product_text">
        <p><span>이름</span>${data.title}</p>
        <p><span>가격</span>${data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
        <p><span>설명</span>${data.description}</p>
        ${data.tags.includes('best') || data.tags.includes('md') || data.tags.includes('new') ?
      `
        <div class="main_tag_box">
          <span>메인상품 진열</span>
        </div>
        ` : ''}
        ${data.tags == '' ? '' :
      '<div class="tag_box"><span>태그</span></div>'
    }
        <p><span>매진</span>${data.isSoldOut ? '<span class="sold">매진중</span>' : '<span class="sale">판매중</span>'}</p>
        <p><span>할인율</span>${data.discountRate ? data.discountRate : 0}%</p>
      </div>
    </div>
    <div class="product_detail">
      <span>상세 이미지</span>
      <div class="product_detail_img">
        <img src=${data.photo ? data.photo : 'https://via.placeholder.com/400x650?text=NO+IMAGE'} alt="상세설명" />
      </div>
    </div>
  `;

  // 메인상품 진열
  if (data.tags.includes('best') || data.tags.includes('md') || data.tags.includes('new')) {
    const mainTagEl = document.querySelector('.main_tag_box');
    const divEl = document.createElement('div');
    divEl.classList = 'tag_box_list';
    const tags = mainTag.map((e) => {
      const pEl = document.createElement('p');
      pEl.innerText = e;
      return pEl;
    });
    divEl.append(...tags);
    mainTagEl.append(divEl);
  }

  // 태그
  if (Array.isArray(data.tags) && data.tags.length !== 0) {
    tag = true;
    const tagBox = document.querySelector('.tag_box');
    const divEl = document.createElement('div');
    divEl.classList = 'tag_box_list';
    const tags = productTag.map((e) => {
      const pEl = document.createElement('p');
      pEl.innerText = e;
      return pEl;
    });
    divEl.append(...tags);
    tagBox.append(divEl);
  } else if (!data.tags === '') {
    tag = false;
    const tagBox = document.querySelector('.tag_box');
    const pEl = document.createElement('p');
    pEl.innerText = data.tags;
    tagBox.append(pEl);
  }


  // 삭제하기
  const deleteBtn = document.querySelector('.delete_btn');
  deleteBtn.addEventListener('click', async function () {
    await productDelete(data.id);
    router.navigate("admin");
  });
  dot.style.display = "none";
}

