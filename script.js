$(document).ready(function() {
    let currentProducts = products;
    let categories = new Set();
    let basket = [];
    let addToBasketButtons;
    const productsSection = document.querySelector(".products");
    let temp = true;
    const addToBasket = (e) => {
      const selectedId = parseInt(e.target.dataset.id);
    
      const key = currentProducts.findIndex((product) => product.id === selectedId);
    
      basket.push(currentProducts.at(key));
    
      const basketTotal = basket.reduce((sum, product) => {
        return (sum += product.price);
      }, 0);
          basketAmountSpan.innerHTML = `${basket.length}`;

      $(".basket__amount").addClass("active");
    };
    
    const renderProducts = (items) => {
      productsSection.innerHTML = "";
      for (let i = 0; i < items.length; i++) {
        const newProduct = document.createElement("div");
        newProduct.className = `products_item`;
        newProduct.innerHTML = `
        <img src="${items[i].image}" alt="product-image" />
        <p class="product__name">${items[i].name}</p>
        <p class="product_description">
       ${items[i].description}
        </p>
        <div class="product_price">
        <span class="price">${items[i].price.toFixed(2)} zł</span>
        </div>
        <div class="buttons">         <button data-id="${
          items[i].id
        }" class="cart-button"><span class="add-to-cart">Add to basket</span> <span class="added">Item added</span> <i class="fa fa-shopping-cart"></i> <i class="fa fa-square"></i> </button> </div>
`;
    
        productsSection.appendChild(newProduct);
      }
      addToBasketButtons = document.querySelectorAll(".cart-button");
      addToBasketButtons.forEach((btn) =>
        btn.addEventListener("click", addToBasket)
      );
    };
   
    
    const basketAmountSpan = document.querySelector(".basket__amount");
    
    const clearBasket = () => {
      basketAmountSpan.innerHTML = "Koszyk";
      $(".basket__amount").removeClass("active");
      basket = [];
    };
    

    $(".basket__amount").click(function(){
      clearBasket();
    })
    renderProducts(currentProducts);

          
    const cartButtons = document.querySelectorAll('.cart-button');

    cartButtons.forEach(button => {
    
    button.addEventListener('click',cartClick);

    });

    function cartClick(){
      if(temp == true){
     let button = this;
     button.classList.add('clicked');
     setTimeout( function(){ 
      $(button).removeClass("clicked");
      temp = true;
    } , 2500 );
    }
    temp = false;
  }
});