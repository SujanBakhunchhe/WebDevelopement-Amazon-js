import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js"
import {  loadProductsFetch } from "../data/products.js";
import { loadFromCart } from "../data/cart.js";
// loadProducts(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
// });
async function loadPage(){
  
    //throw 'error1';
    await loadProductsFetch();
    await new Promise((resolve)=>{
      loadFromCart(()=>{
      resolve();
    });
  });

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
// Promise.all([
//  loadProductsFetch(), 
//   new Promise((resolve)=>{
//     loadFromCart(()=>{
//       resolve();
//     });
//   })
// ]).then(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
// });
// new Promise((resolve)=>{
//   loadProducts(()=>{
//     resolve();
//   });
// }).then(()=>{
//   return new Promise((resolve)=>{
//     loadFromCart(()=>{
//       resolve();
//     });
//   });
// }).then(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
// });

