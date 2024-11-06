
function Cart(){
   const cart={
    cartItem:undefined,
     loadFromStorage(){
      this.cartItem=JSON.parse(localStorage.getItem('cart-oop'));
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
    },
    loadFromStorage(){
      this.cartItem=JSON.parse(localStorage.getItem('cart-oop'));
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
    },
     saveToStorage(){
      localStorage.setItem('cart-oop',JSON.stringify(this.cartItem));
    },
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
       saveToStorage();
     },
     
   removeFromCart(productId){
    const newCart = [];
    this.cartItem.forEach((cartItem)=>{
      if(cartItem.productId!==productId){
        newCart.push(cartItem);
      }
    });
    this.cartItem=newCart;
    saveToStorage();
  },
  
   removeFromCart(productId){
    const newCart = [];
    this.cartItem.forEach((cartItem)=>{
      if(cartItem.productId!==productId){
        newCart.push(cartItem);
      }
    });
    this.cartItem=newCart;
    saveToStorage();
  },
   updateToCart(productId,updatedValue){
    this.cartItem.forEach((cartItem)=>{
      if(cartItem.productId===productId){
        cartItem.quantity=updatedValue;
        saveToStorage();
      }
    }); 
  },
  
   updateDeliveryOption(productId,deliveryOptionId){
    this.cartItem.forEach((cartItem)=>{
      if(cartItem.productId===productId){
        cartItem.deliveryOptionsId=deliveryOptionId;
        saveToStorage();
      }
    });
  }
  };
  return cart;
}
const cart=new Cart('cart-oop');
const cartbusiness= new Cart('cart-business');
cart.loadFromStorage();





