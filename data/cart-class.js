class Cart{
 cartItem;
 #localStorageKey;
 constructor(localStorageKey){
  this.#localStorageKey=localStorageKey;
  this.loadFromStorage();
 }


#loadFromStorage(){
  this.cartItem=JSON.parse(localStorage.getItem(this.#localStorageKey));
  if(!this.cartItem){
    this.cartItem=[
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
saveToStorage(){
  localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItem));
}
addToCart(productId,selectedValue){
  let matchingItem;
   this.cartItem.forEach((cartItem) => {
     if(cartItem.productId===productId){
       matchingItem=cartItem;
     }
   });
   if(matchingItem){
     matchingItem.quantity+=selectedValue;
   }
   else{
     this.cartItem.push({
       productId,
       quantity:selectedValue,
       deliveryOptionsId:'1'
     })
   }
   this.saveToStorage();
 }
 removeFromCart(productId){
  const newCart = [];
  this.cartItem.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
      newCart.push(cartItem);
    }
  });
  this.cartItem=newCart;
  this.saveToStorage();
}
removeFromCart(productId){
  const newCart = [];
  this.cartItem.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
      newCart.push(cartItem);
    }
  });
  this.cartItem=newCart;
  this.saveToStorage();
}
updateToCart(productId,updatedValue){
  this.cartItem.forEach((cartItem)=>{
    if(cartItem.productId===productId){
      cartItem.quantity=updatedValue;
    this.saveToStorage();
    }
  }); 
}
updateDeliveryOption(productId,deliveryOptionId){
  this.cartItem.forEach((cartItem)=>{
    if(cartItem.productId===productId){
      cartItem.deliveryOptionsId=deliveryOptionId;
      this.saveToStorage();
    }
  });
}
}

const cart=new Cart('cart-class');
const businessCart =new Cart('cart-business');
console.log(cart);

