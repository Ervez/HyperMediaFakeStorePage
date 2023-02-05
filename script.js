$(document).ready(function() {
    let currentProducts = products;
    let categories = new Set();
    let basket = [];
    let addToBasketButtons;
    const productsSection = document.querySelector(".products");
    
    const addToBasket = (e) => {
      const selectedId = parseInt(e.target.dataset.id);
    
      const key = currentProducts.findIndex((product) => product.id === selectedId);
    
      basket.push(currentProducts.at(key));
    
      const basketTotal = basket.reduce((sum, product) => {
        return (sum += product.price);
      }, 0);
    
      basketTotal > 0
        ? basketClearBtn.classList.add("active")
        : basketClearBtn.classList.remove("active");
    
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
        <button data-id="${
          items[i].id
        }" class="product_add_basket_btn">Add to basket</button>`;
    
        productsSection.appendChild(newProduct);
      }
      addToBasketButtons = document.querySelectorAll(".product_add_basket_btn");
      addToBasketButtons.forEach((btn) =>
        btn.addEventListener("click", addToBasket)
      );
    };
   
    
    const basketAmountSpan = document.querySelector(".basket__amount");
    const basketClearBtn = document.querySelector(".basket__clear_btn");
    
    const clearBasket = () => {
      basketAmountSpan.innerHTML = "Koszyk";
      basketClearBtn.classList.remove('active');
      $(".basket__amount").removeClass("active");
      basket = [];
    };
    
    basketClearBtn.addEventListener("click", clearBasket);
    renderProducts(currentProducts);
});