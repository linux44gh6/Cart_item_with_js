function toggleDrawer() {
    const drawer = document.getElementById('drawer');
    drawer.classList.toggle('translate-x-full');
}

function addToCart(){
    const productName=document.getElementById('productName').innerText
const productPrice=document.getElementById('productPrice').innerText
const productImage=document.getElementById('productImage').src

const product={
    name:productName,
    price:productPrice,
    image:productImage
}
console.log(product);

let cart=JSON.parse(localStorage.getItem('cart'))||[]
cart.push(product)
localStorage.setItem('cart',JSON.stringify(cart))
alert(`${productName} added to your cart`)
}