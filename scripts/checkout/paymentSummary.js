import { products } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";


export function renderPaymentSummary(){
  let priceCents=0;
  let shippingPriceCents=0;
  cart.forEach((cartItem)=>{
    let matchingProduct;
    products.forEach((product)=>{
      if(product.id===cartItem.productId){
        matchingProduct=product;
      }
    });
    priceCents+=matchingProduct.priceCents*cartItem.quantity;


    let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if(cartItem.deliveryOptionsId===option.id){
        deliveryOption=option;
      }
    });
    shippingPriceCents+=deliveryOption.priceCents;
  });

  const priceBeforetax=priceCents+shippingPriceCents;
  const tax=priceBeforetax*0.1;
  const toatlPriceCents=priceBeforetax+tax;


  let html =  `
          <div class="payment-summary-title">
            Order Summary
          </div>
          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(priceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(priceBeforetax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(toatlPriceCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
  `;
  document.querySelector('.js-payment-summary').innerHTML=html;
  document.querySelector('.js-place-order').addEventListener('click',async ()=>{
   const response=await fetch('https://supersimplebackend.dev/orders',{
      method:'POST',
      headers:{
       'Content-Type':'application/json' 
      },
      body:JSON.stringify({
       cart:cart
      })
    });
   const order=await response.json();
   addOrder(order);
  window.location.href='orders.html';
  });
}
