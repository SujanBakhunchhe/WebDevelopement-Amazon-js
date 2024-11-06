import {products} from '../../data/products.js';
import {cart,removeFromCart,updateToCart, updateDeliveryOption} from  '../../data/cart.js';
import {formatCurrency} from '../utils/money.js'
import { deliveryOptions } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
  let cartsummaryHTML='';
  cart.forEach((cartItem)=>{
    let matchingProduct;
    products.forEach((product)=>{
      if(product.id===cartItem.productId){
        matchingProduct=product;
      }
    });
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if(cartItem.deliveryOptionsId===option.id){
        deliveryOption=option;
      }
    });
   
    const today = dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const formatDate=deliveryDate.format('dddd, MMMM d');
    cartsummaryHTML +=`
            <div class="cart-item-container
            
          js-cart-item-container  
          js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${formatDate}
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                   ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <div class="product-quantity-container">
                      <select class="js-updated-value-${matchingProduct.id}">
                      <option selected value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      </select>
                    </div>
                    <span class="update-quantity-link link-primary 
                    js-update-quantity-link
                    " 
                    data-product-id="${matchingProduct.id}"> 
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsSummary(matchingProduct,cartItem)}
                  
        
                </div>
              </div>
            </div>
    `;
  });
  document.querySelector('.js-order-summary').innerHTML=cartsummaryHTML;
  document.querySelectorAll('.js-delete-link').forEach((link)=>{
    const {productId} = link.dataset;
    link.addEventListener('click',()=>{
      removeFromCart(productId);
      const container=document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
    });
  
  });
  
  document.querySelectorAll('.js-update-quantity-link').forEach((update)=>{
    const {productId} = update.dataset;
    
    update.addEventListener('click',()=>{
      const updatedValue = Number(document.querySelector(`.js-updated-value-${productId}`).value);
      updateToCart(productId,updatedValue);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
  
  function deliveryOptionsSummary(matchingProduct,cartItem){
    let HTML='';
  
    deliveryOptions.forEach((option)=>{
      const today = dayjs();
      const deliveryDate=today.add(option.deliveryDays,'days');
      const formatDate=deliveryDate.format('dddd, MMMM d');
      const priceString=option.priceCents===0?'Free':`$${formatCurrency(option.priceCents)}`
      const isChecked= option.id===cartItem.deliveryOptionsId;
      HTML +=`
          <div class="delivery-option js-delivery-option"
          data-product-id="${cartItem.productId}" data-delivery-option-id="${option.id}">
            <input type="radio" ${isChecked?'checked': ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${formatDate}
              </div>
              <div class="delivery-option-price">
                ${priceString} -Shipping
              </div>
            </div>
          </div>
        `;
    });
  return HTML;
  }
  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    const {productId,deliveryOptionId} = element.dataset;
    element.addEventListener('click',()=>{
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
  
}
