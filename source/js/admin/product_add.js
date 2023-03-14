import { productAdd } from "../../api/products/admin/product_add.js";
import { router } from "../../route.js";

export function productAddItem() {
  const nameEl = document.querySelector('.product_name');
  const priceEl = document.querySelector('.product_price');
  const textEl = document.querySelector('.product_text');
  const mainTagEl = document.querySelectorAll('[name="main_tag"]');
  const tagEl = document.querySelectorAll('[name="tag"]');
  const thumbnailBtn = document.querySelector('.thumbnail_btn');
  const thumbnailEl = document.querySelector('.product_thumbnail');
  const photoBtn = document.querySelector('.photo_btn');
  const photoEl = document.querySelector('.product_photo');
  const discountEl = document.querySelector('.product_discount');
  const registrationBtn = document.querySelector('.product_registration');
  const dot = document.querySelector(".dot-wrap");
  const mainTagCount = JSON.parse(localStorage.getItem('mainTagCount'));
  const bestCount = document.querySelector('.best_count');
  const mdCount = document.querySelector('.md_count');
  const newCount = document.querySelector('.new_count');

  let title = '';
  let price = '';
  let description = '';
  let tags = [];
  let thumbnailBase64 = '';
  let photoBase64 = '';
  let discountRate = '';

  nameEl.addEventListener('input', e => {
    title = e.target.value;
  });
  priceEl.addEventListener('input', e => {
    price = Number(e.target.value);
    if (isNaN(price)) {
      e.target.value = '';
    }
  });
  textEl.addEventListener('input', e => {
    description = e.target.value;
  });

  // 메인상품 진열
  bestCount.innerHTML = `(${mainTagCount.bestCount})`;
  mdCount.innerHTML = `(${mainTagCount.mdCount})`;;
  newCount.innerHTML = `(${mainTagCount.newCount})`;;
  mainTagEl.forEach(function (mainTag) {
    mainTag.addEventListener('change', function (event) {
      if (event.target.checked) {
        tags.push(event.target.id);
      } else {
        tags = tags.filter(ele => ele !== event.target.id);
      }
    });
  });


  // 태그
  tagEl.forEach(function (tag) {
    tag.addEventListener('change', function (event) {
      if (event.target.checked) {
        tags.push(event.target.dataset.id);
      } else {
        tags = tags.filter(ele => ele !== event.target.dataset.id);
      }
    });
  });

  // 제품 사진
  thumbnailBtn.addEventListener('click', () => {
    thumbnailEl.click();
  });
  thumbnailEl.addEventListener('change', event => {
    const file = thumbnailEl.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', e => {
      thumbnailBase64 = e.target.result;
      const img = document.querySelector('.thumbnail_img');
      img.innerHTML = /* html */ `
        <img src="${thumbnailBase64}" alt="썸네일" />
      `;
    });
  });

  // 제품 상세 사진
  photoBtn.addEventListener('click', () => {
    photoEl.click();
  });
  photoEl.addEventListener('change', event => {
    const file = photoEl.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', e => {
      photoBase64 = e.target.result;
      const img = document.querySelector('.photo_img');
      img.innerHTML = /* html */ `
        <img src="${photoBase64}" alt="상세이미지" />
      `;
    });
  });

  discountEl.addEventListener('input', e => {
    discountRate = e.target.value;
    if (isNaN(discountRate)) {
      e.target.value = '';
    }
  });

  registrationBtn.addEventListener('click', async () => {
    await productAdd({
      title,
      price,
      description,
      tags,
      thumbnailBase64,
      photoBase64,
      discountRate
    });

    router.navigate("admin");
  });
  dot.style.display = "none";

}

