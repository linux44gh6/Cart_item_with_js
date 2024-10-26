function closeDrawer(){
    const drawer=document.getElementById('drawer')
    drawer.classList.add('translate-x-full') 
}
async function toggleDrawer() {
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
                ${product.new ? '<span class="absolute -top-5 -left-8 -rotate-45 bg-red-500 text-white text-xs font-bold px-2 py-1 order-5 rounded-full">NEW</span>' : ''}
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



function addToCart(id, name, price, image) {
    const drawer = document.getElementById('drawer'); 
    drawer.classList.remove('translate-x-full');
   

    const product = {
        id: id, 
        name: name,
        price: price,
        image: image
    };
    console.log(product);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const exist = cart.filter(item => item.id === product.id); 
    if (exist.length > 0) {
        alert('This product is already in your cart');
    } else {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} added to your cart`);
    }
}


window.onload = toggleDrawer;


function closeDrawer() {
    const drawer = document.getElementById('drawer');
    drawer.classList.add('translate-x-full'); 
}
