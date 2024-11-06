export let cart;
loadFromStorage();
export function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'));
  if(!cart){
    cart=[
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionsId:'1'
    
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:2,
        deliveryOptionsId:'3'
      }
    ];
  }
}
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,selectedValue){
 let matchingItem;
  cart.forEach((cartItem) => {
    if(cartItem.productId===productId){
      matchingItem=cartItem;
    }
  });
  if(matchingItem){
    matchingItem.quantity+=selectedValue;
  }
  else{
    cart.push({
      productId,
      quantity:selectedValue,
      deliveryOptionsId:'1'
    })
  }
  saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
      newCart.push(cartItem);
    }
  });
  cart=newCart;
  saveToStorage();
}

export function updateToCart(productId,updatedValue){
// let matchingItem;
//   cart.forEach((cartItem)=>{
//     if(cartItem.productId===productId){
//       matchingItem=cartItem;
//     }
//   });
//   matchingItem.quantity=updatedValue;
//   saveToStorage();
  cart.forEach((cartItem)=>{
    if(cartItem.productId===productId){
      cartItem.quantity=updatedValue;
      saveToStorage();
    }
  }); 
}
export function updateDeliveryOption(productId,deliveryOptionId){
  cart.forEach((cartItem)=>{
    if(cartItem.productId===productId){
      cartItem.deliveryOptionsId=deliveryOptionId;
      saveToStorage();
    }
  });
}
export function loadFromCart(fun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
    console.log(xhr.response);
    fun();
  });
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}