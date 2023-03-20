import { cartRender } from '../../pages/user/cart';

/**장바구니 로컬스토리지에 저장된 데이터 갖고오는 변수*/

export function cartHandler() {
  const ulEl = document.querySelector(".cart_list");
  const totalCheckbox = document.querySelector(".info_total_checkbox");
  
  const cancelBtn = document.querySelector(".cancel_btn");
  const purchaseBtn = document.querySelector(".purchase_btn");
  const basketItem = JSON.parse(localStorage.getItem("basket"));
  cancelBtn.addEventListener("click", () => {
    let cartItemList = [...basketItem];

    const selectedItemList = Array.from(document.querySelectorAll('.want_checkbox:checked')).map(
      (selectedInput) => selectedInput.closest('.cart_list_item').dataset.id
    );
    selectedItemList.forEach((id) => {
      cartItemList = cartItemList.filter((cartItem) => cartItem.id !== id);
    });

    localStorage.setItem('basket', JSON.stringify(cartItemList));
    cartRender();
  });

  totalCheckbox.addEventListener("change", (e) => {
    const checkBox = ulEl.querySelectorAll(".want_checkbox");
    const { checked } = e.target;

    checkBox.forEach((item) => {
      if (checked) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
  });

  purchaseBtn.addEventListener('click', () => {
    let cartItemList = [...basketItem];

    const isChecked = Array.from(document.querySelectorAll('.want_checkbox:checked'));
    if (isChecked) {
      const selectedItem = Array.from(document.querySelectorAll('.want_checkbox:checked')).map((selectedInput) => {
        const id = selectedInput.closest('.cart_list_item').dataset.id;
        return basketItem.find((item) => item.id === id);
      });

      localStorage.setItem('basket', JSON.stringify(selectedItem));
    }

    if (!isChecked) {
      const unSelectedItemList = Array.from(document.querySelectorAll('.want_checkbox')).map(
        (Unselected) => Unselected.closest('.cart_list_item').dataset.id
      );
      unSelectedItemList.forEach((id) => {
        cartItemList = cartItemList.filter((cartItem) => {
          cartItem.id !== id;
        });

        localStorage.setItem('basket', JSON.stringify(cartItemList));
      });
    }
  });
}

/**장바구니 리스트 렌더링 함수 */
export const renderCartList = () => {
  
  const ulEl = document.querySelector(".cart_list");
  const basketItem = JSON.parse(localStorage.getItem("basket"));
  const isEmpty = basketItem === null || basketItem.length === 0 
  console.log(basketItem)
    if(!isEmpty){

      const liEls = basketItem.map((item) => {
        const liEl = document.createElement("li");
       
        liEl.dataset.id = item.id;
        liEl.classList = "cart_list_item";
       
        liEl.innerHTML = /*html*/ `
                        <div class="cart_card">
                            <div class="want_checkbox_wrap">
                             ${!isEmpty ? `<input type="checkbox" class="want_checkbox" checked/>` : ''} 
                            </div>
                            <div class="img_wrap">
                              <img
                                src=${item.thumbnail}
                                alt="Item ThumbNail"
                                class="card_img" />
                            </div>
                            <div class="product_name_wrap">
                              <span class="name"
                                >${item.title}</span
                              >
                            </div>
                            <div class="product_total_wrap">
                              <button class="decrease_btn">-</button>
                              <span class="amount">${item.count}</span>
                              <button class="increase_btn">+</button>
                            </div>
    
                            <div class="price_wrap">
                              <span class="price">${Intl.NumberFormat('KO-KR').format(item.totalPrice)}원</span>
                            </div>
                          </div>                            
            `;

      return liEl;
    });
    ulEl.innerHTML = '';
    ulEl.append(...liEls);
  }

  renderTotalPrice();
  ulEl.addEventListener('click', clickHandler);
};

/**장바구니 총합계 렌더링 함수*/
const renderTotalPrice = () => {

  const basketItem = JSON.parse(localStorage.getItem("basket"));
  const totalPriceArea = document.querySelector(".cart_total_price_area");
  const isEmpty = !basketItem?.length
  if(!isEmpty) {
  totalPriceArea.classList.remove('_hidden')
  const divEl = document.createElement("div");
  divEl.classList = "area_wrap";
  divEl.innerHTML = /*html*/ `
                    <div class="cart_order_price">
                      <span class="order_price_text">주문금액</span>
                      <span class="price"></span>
                    </div>
                    <div class="cart_delivery_fee">
                      <span class="delivery_fee_text">배송비</span>
                      <span class="fee">0원</span>
                    </div>
                    <div class="cart_total_price">
                      <span class="total_price_text">총 결제금액</span>
                      <span class="price"></span>
                    </div>
                  </div>`;
    totalPriceArea.innerHTML = ""
    totalPriceArea.append(divEl);
  }
  
  getToTalPrice();
  
};

/** 장바구니 총 합계 구하는 함수*/
function getToTalPrice() {
  const basketItem = JSON.parse(localStorage.getItem('basket'));
  const isEmpty = basketItem === null || basketItem.length === 0;
  if (!isEmpty) {
    const totalPriceArea = document.querySelector('.cart_total_price_area');

    const initPrice = basketItem.reduce((prev, cur) => {
      return prev + cur.totalPrice;
    }, 0);

    let total = initPrice;

    let orderToTalPrice = totalPriceArea.querySelector('.cart_order_price .price');

    let cartToTalPrice = totalPriceArea.querySelector('.cart_total_price .price');

    orderToTalPrice.textContent = `${Intl.NumberFormat('KO-KR').format(total)}원`;
    cartToTalPrice.textContent = `${Intl.NumberFormat('KO-KR').format(total)}원`;
  }
}

const clickHandler = (e) => {
  const liEls = e.target.closest('.cart_list > li');
  if (!liEls) {
    return;
  }

  if (e.target.matches('.decrease_btn')) {
    decrease(liEls);
  }
  if (e.target.matches('.increase_btn')) {
    increase(liEls);
  }
};

const decrease = (liEls) => {
  const basketItem = JSON.parse(localStorage.getItem('basket'));
  const targetId = liEls.dataset.id;
  const targetItem = basketItem.find((item) => item?.id === targetId);
  const decreaseBtn = liEls.querySelector('.decrease_btn');
  const amountEl = liEls.querySelector('.amount');
  const priceEl = liEls.querySelector('.price');
  let amount = targetItem.count;
  const isDiscount = targetItem.discountRate;


     if (amount > 1 && isDiscount) {
        amount -= 1;
        amountEl.textContent = amount;
        const productPrice =  amount * (targetItem.price-targetItem.price*targetItem.discountRate/100)
        priceEl.textContent = `${Intl.NumberFormat("KO-KR").format(productPrice)}원`;
        targetItem.count = amount 
        targetItem.totalPrice =  productPrice;
        localStorage.setItem('basket',JSON.stringify(basketItem))  
        
     }else if (amount > 1 && isDiscount === 0) {
      amount -= 1;
        amountEl.textContent = amount;
        priceEl.textContent = `${(amount * targetItem.price)}원`;
        targetItem.count = amount 
        targetItem.totalPrice =  targetItem.count * targetItem.price;
        localStorage.setItem('basket',JSON.stringify(basketItem))  
     }
     cartHandler()
     getToTalPrice()
    
}
const increase = (liEls) => {
  const basketItem = JSON.parse(localStorage.getItem('basket'));
  const targetId = liEls.dataset.id;
  const targetItem = basketItem.find(item => item?.id === targetId)
  const increaseBtn = liEls.querySelector(".increase_btn")
  const amountEl = liEls.querySelector(".amount");
  const priceEl = liEls.querySelector(".price");
  let amount = targetItem.count 
  const isDiscount = targetItem.discountRate
  

      if(isDiscount) {
        amount += 1;
        const productPrice =  amount * (targetItem.price-targetItem.price*targetItem.discountRate/100)
        amountEl.textContent = amount;
        priceEl.textContent = `${Intl.NumberFormat("KO-KR").format(productPrice)}원`
        targetItem.count = amount 
        targetItem.totalPrice = productPrice
        localStorage.setItem('basket',JSON.stringify(basketItem)) 
      }else if (isDiscount === 0) {
        amount += 1;
        const productPrice = amount * targetItem.price
        amountEl.textContent = amount;
        priceEl.textContent = `${Intl.NumberFormat("KO-KR").format(productPrice)}원`;
        targetItem.count = amount 
        targetItem.totalPrice =  targetItem.count * targetItem.price;
        localStorage.setItem('basket',JSON.stringify(basketItem))  
      }
    cartHandler()
   getToTalPrice()
}
