import { product } from "../../api/products/admin/product_update.js";

export function productUpdateHandler(id) {
  const nameEl = document.querySelector('.product_name');
  const priceEl = document.querySelector('.product_price');
  const textEl = document.querySelector('.product_text');
  const mainTagEl = document.querySelectorAll('[name="main_tag"]');
  const tagEl = document.querySelectorAll('[name="tag"]');
  const thumbnailEl = document.querySelector('.thumbnail_img');
  const thumbnailBtn = document.querySelector('.thumbnail_btn');
  const thumbnailUpdate = document.querySelector('.product_update_img');
  const photoEl = document.querySelector('.photo_img');
  const photoBtn = document.querySelector('.photo_btn');
  const photoUpdate = document.querySelector('.detail_update_img');
  const soldoutEl = document.querySelector('.soldout_btn');
  const discountEl = document.querySelector('.product_discount');
  const product_update = document.querySelector('.product_update');
  const dot = document.querySelector(".dot-wrap");
  let title = '';
  let price = '';
  let description = '';
  let tags = [];
  let thumbnailBase64 = '';
  let photoBase64 = '';
  let isSoldOut = '';
  let discountRate = '';

  (async () => {
    const data = await product(id);
    renderProduct(data);
  })();

  function renderProduct(data) {
    title = nameEl.value = data.title;
    price = priceEl.value = data.price;
    description = textEl.value = data.description;
    const mainTags = Array.from(data.tags).filter(ele => ['best', 'md', 'new'].includes(ele));
    const productTags = Array.from(data.tags).filter(ele => !mainTags.includes(ele));

    // 메인상품 진열
    mainTags.forEach((mainTag) => {
      const checkbox = Array.from(mainTagEl).find(ele => ele.id === mainTag);
      if (checkbox) {
        checkbox.checked = true;
        tags.push(mainTag);
      }
    });

    // 태그
    productTags.forEach((tag) => {
      const checkbox = Array.from(tagEl).find(ele => ele.dataset.id === tag);
      if (checkbox) {
        checkbox.checked = true;
        tags.push(tag);
      }
    });

    if (data.thumbnail !== null) {
      thumbnailEl.innerHTML = /* html */ `
        <img src=${data.thumbnail} alt="ThumbNail" />
      `;
    } else {
      thumbnailEl.innerHTML = /* html */ `
        <img src="https://via.placeholder.com/200x200?text=NO+IMAGE" alt="NO IMAGE" />
      `;
    }

    if (data.photo !== null) {
      photoEl.innerHTML = /* html */ `
        <img src=${data.photo} alt="PHOTO" />
      `;
    } else {
      photoEl.innerHTML = /* html */ `
        <img src="https://via.placeholder.com/200x250?text=NO+IMAGE" alt="NO IMAGE" />
      `;
    }

    isSoldOut = data.isSoldOut;
    if (isSoldOut) {
      soldoutEl.innerText = '매진';
      soldoutEl.classList.add('sold');
    } else {
      soldoutEl.innerText = '판매중';
    }

    discountRate = discountEl.value = data.discountRate;
  }


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


  // 제품 사진 찾기
  thumbnailBtn.addEventListener('click', () => thumbnailUpdate.click());
  thumbnailUpdate.addEventListener('change', event => {
    const file = thumbnailUpdate.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', e => {
      thumbnailBase64 = e.target.result;
      const img = document.querySelector('.product_img img');
      img.src = thumbnailBase64;
    });
  });

  // 제품 상제 사진
  photoBtn.addEventListener('click', () => photoUpdate.click());
  photoUpdate.addEventListener('change', event => {
    const file = photoUpdate.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', e => {
      photoBase64 = e.target.result;
      const img = document.querySelector('.product_detail_img img');
      img.src = photoBase64;
    });
  });

  soldoutEl.addEventListener('click', e => {
    if (isSoldOut) {
      isSoldOut = false;
      soldoutEl.innerText = '판매중';
      soldoutEl.classList.remove('sold');
    } else {
      isSoldOut = true;
      soldoutEl.innerText = '매진';
      soldoutEl.classList.add('sold');
    }
  });

  discountEl.addEventListener('input', e => {
    discountRate = e.target.value;
    if (isNaN(discountRate)) {
      e.target.value = '';
    }
  });


  product_update.addEventListener('click', async function () {
    await product(id, {
      title,
      price,
      description,
      tags,
      thumbnailBase64,
      photoBase64,
      isSoldOut,
      discountRate
    });
  });
  dot.style.display = "none";
}

