async function loadProducts() {
    const response = await fetch('../public/data.json');
    const data = await response.json();
    console.log(data);

    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; 

    data.forEach(product => {
        const card = document.createElement('div');
        card.className = 'max-w-xs rounded shadow-lg p-2 bg-gray-200';
        
        card.innerHTML = `
            <div class="relative">
                <img class="w-full h-38 object-fill rounded-md" src="${product.image}" alt="${product.name}">
                <span class="absolute -top-5 -left-8 -rotate-45 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>
            </div>
            <div>
                <h3 class="font-bold text-lg text-gray-800">${product.name}</h3>
                <p class="text-gray-600 text-sm">$<span>${product.price}</span>/each</p>
                <p class="text-gray-700 text-sm mt-2">${product.description}</p>
            </div>
            <div class="flex flex-col space-y-2 mt-2">
                <button onclick="addToCart('${product.id}', '${product.name}', '${product.price}', '${product.image}')" class="bg-red-500 text-white font-bold py-2 px-4 rounded">Add to Order</button>
                <button class="border border-red-500 text-red-500 font-bold py-2 px-4 rounded">Customize</button>
            </div>
        `;

        productContainer.appendChild(card); 
    });
}

function toggleDrawer() {
    const drawer = document.getElementById('drawer');
    drawer.classList.toggle('translate-x-full');
    showCartItem();
}

function closeDrawer() {
    const drawer = document.getElementById('drawer');
    drawer.classList.add('translate-x-full');
}

function addToCart(id, name, price, image) {
    const product = { id, name, price, image };
    console.log("Adding product:", product);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(item => item.id === id); 

    if (!exists) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Item added to the cart');
    } else {
        console.log('Item already exists in the cart');
    }

    cartQuantity();
    toggleDrawer(); // Show drawer with updated cart
}

function cartQuantity() {
    const cartItem = document.getElementById('cartQuantity');
    const getLocal = localStorage.getItem('cart'); 

    if (getLocal) {
        const cartArray = JSON.parse(getLocal); 
        const length = cartArray.length; 
        cartItem.innerText = length; 
    } else {
        cartItem.innerText = 0; 
    }
}

function showCartItem() {
    const getLocal = localStorage.getItem('cart');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    cartItemsContainer.innerHTML = '';

    if (getLocal) {
        const cartArray = JSON.parse(getLocal);

        cartArray.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = ' p-2 rounded my-2 flex  relative border border-white mb-5';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-md">
                <div class="px-2">
                    <h4 class=" font-semibold text-white">${item.name}</h4>
                    <p class="text-white  translate-x-24">$${item.price}</p>
                </div>
               <div class="absolute -top-3 pb-2 ps-1 w-6 rounded-md h-6  left-[90%] bg-white">
                <button onclick="removeFromCart('${item.id}')" class="text-red-500 font-bold"><i class="fa-solid fa-trash"></i></button>
               </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'text-gray-500 text-center';
        emptyMessage.innerText = 'Your cart is empty.';
        cartItemsContainer.appendChild(emptyMessage);
    }
}

// Load products on page load
window.onload = () => {
    loadProducts();
    cartQuantity(); // Initialize cart quantity on page load
};
