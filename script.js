const products=[
{id:1,name:"Men's Casual Shirt",cat:"Men",price:2499,img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",sizes:["S","M","L","XL","XXL"],sale:false},
{id:2,name:"Women's Unstitched Suit",cat:"Women",price:3999,img:"https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80",sizes:["S","M","L","XL"],sale:false},
{id:3,name:"Boys T-Shirt",cat:"Boys",price:1299,img:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80",sizes:["2-3","4-5","6-7","8-10","12-14"],sale:true},
{id:4,name:"Girls Frock",cat:"Girls",price:1999,img:"https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=600&q=80",sizes:["2-3","4-5","6-7","8-10","12-14"],sale:false},
{id:5,name:"Men's Kurta",cat:"Men",price:2999,img:"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",sizes:["S","M","L","XL","XXL"],sale:false},
{id:6,name:"Women's Top",cat:"Women",price:1799,img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80",sizes:["S","M","L","XL"],sale:true},
{id:7,name:"Classic Sneakers",cat:"Shoes",price:3499,img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",sizes:["36","38","40","42","44"],sale:true},
{id:8,name:"A&M Classic Watch",cat:"Watches",price:4999,img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",sizes:["One Size"],sale:false},
{id:9,name:"Signature Eau de Parfum",cat:"Perfumes",price:4499,img:"https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",sizes:["50ml","100ml"],sale:false},
{id:10,name:"Kids Casual Set",cat:"Kids",price:2299,img:"https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80",sizes:["2-3","4-5","6-7","8-10"],sale:true},
{id:11,name:"Women's Dress",cat:"Women",price:3299,img:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",sizes:["S","M","L","XL"],sale:false},
{id:12,name:"Men's Polo Shirt",cat:"Men",price:2199,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",sizes:["S","M","L","XL"],sale:true},
{id:13,name:"Girls Casual Set",cat:"Girls",price:2499,img:"https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80",sizes:["2-3","4-5","6-7","8-10"],sale:false},
{id:14,name:"Boys Casual Shirt",cat:"Boys",price:1799,img:"https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80",sizes:["4-5","6-7","8-10","12-14"],sale:false},
{id:15,name:"Ladies Flats",cat:"Shoes",price:2899,img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",sizes:["36","37","38","39","40"],sale:false},
{id:16,name:"Fresh Blossom Perfume",cat:"Perfumes",price:3999,img:"https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",sizes:["50ml","100ml"],sale:true}
];

let activeFilter="All", cart=JSON.parse(localStorage.getItem("amCart")||"[]");

const money=n=>"Rs. "+n.toLocaleString("en-PK");
const $=s=>document.querySelector(s);

function productCard(p){
  return `<article class="product-card">
    <button class="heart" onclick="showToast('Added to wishlist ♡')">♡</button>
    <div class="product-image" style="background-image:url('${p.img}')"></div>
    <div class="product-info">
      <h3>${p.name}</h3>
      <div class="price">${money(p.price)} ${p.sale?'<span class="old">'+money(Math.round(p.price*1.2))+'</span>':''}</div>
      <div class="sizes">${p.sizes.map(s=>`<span>${s}</span>`).join("")}</div>
      <button class="add" onclick="addToCart(${p.id})">ADD TO CART</button>
    </div>
  </article>`;
}

function renderProducts(target="allProducts"){
  const q=($("#searchInput")?.value||"").trim().toLowerCase();
  let list=products.filter(p=>(activeFilter==="All"||p.cat===activeFilter||(activeFilter==="Sale"&&p.sale))&&(!q||p.name.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q)));
  const sort=$("#sortSelect")?.value||"newest";
  if(sort==="low")list.sort((a,b)=>a.price-b.price);
  if(sort==="high")list.sort((a,b)=>b.price-a.price);
  if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
  $("#"+target).innerHTML=list.map(productCard).join("")||`<div style="grid-column:1/-1;text-align:center;padding:40px">No products found.</div>`;
  if(target==="allProducts")$("#resultText").textContent=`Showing ${list.length} product${list.length===1?"":"s"}`;
}

function addToCart(id){
  const item=cart.find(x=>x.id===id);
  if(item)item.qty++;
  else cart.push({id,qty:1});
  saveCart(); updateCart(); openCart(); showToast("Product added to cart");
}
function saveCart(){localStorage.setItem("amCart",JSON.stringify(cart))}
function updateCart(){
  $("#cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
  $("#cartItems").innerHTML=cart.length?cart.map(x=>{
    const p=products.find(y=>y.id===x.id);
    return `<div class="cart-row"><div class="cart-thumb" style="background-image:url('${p.img}')"></div><div><h4>${p.name}</h4><div>${money(p.price)}</div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button> ${x.qty} <button onclick="changeQty(${p.id},1)">+</button></div></div><button class="icon-btn" onclick="removeCart(${p.id})">×</button></div>`
  }).join(""):`<div style="padding:40px 0;text-align:center;color:#777">Your cart is empty.</div>`;
  $("#cartTotal").textContent=money(cart.reduce((s,x)=>s+(products.find(p=>p.id===x.id).price*x.qty),0));
}
function changeQty(id,n){const x=cart.find(y=>y.id===id);if(!x)return;x.qty+=n;if(x.qty<=0)cart=cart.filter(y=>y.id!==id);saveCart();updateCart()}
function removeCart(id){cart=cart.filter(x=>x.id!==id);saveCart();updateCart()}
function openCart(){$("#cartDrawer").classList.add("open");$("#overlay").classList.add("show")}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("show")}
function showToast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}

function setFilter(filter){
  activeFilter=filter;
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===filter));
  renderProducts();
  document.querySelector("#shop").scrollIntoView({behavior:"smooth"});
}

document.addEventListener("DOMContentLoaded",()=>{
  renderProducts("newProducts");
  renderProducts();
  updateCart();

  document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>setFilter(b.dataset.filter)));
  document.querySelectorAll(".category-card").forEach(b=>b.addEventListener("click",()=>setFilter(b.dataset.category)));
  document.querySelectorAll("[data-filter-link]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();setFilter(a.dataset.filterLink)}));
  $("#sortSelect").addEventListener("change",()=>renderProducts());
  $("#searchBtn").addEventListener("click",()=>{setFilter("All")});
  $("#searchInput").addEventListener("keydown",e=>{if(e.key==="Enter"){setFilter("All")}});
  $("#cartBtn").addEventListener("click",openCart);
  $("#closeCart").addEventListener("click",closeCart);
  $("#overlay").addEventListener("click",closeCart);
  $("#checkoutBtn").addEventListener("click",()=>{
    if(!cart.length){showToast("Your cart is empty");return}
    $("#checkoutModal").classList.add("show");closeCart();
  });
  document.querySelectorAll("[data-close-modal]").forEach(b=>b.addEventListener("click",()=>$("#checkoutModal").classList.remove("show")));
  $("#checkoutModal").addEventListener("click",e=>{if(e.target.id==="checkoutModal")e.currentTarget.classList.remove("show")});
  $("#checkoutForm").addEventListener("submit",e=>{
    e.preventDefault();
    const order="AM-"+Date.now().toString().slice(-6);
    cart=[];saveCart();updateCart();$("#checkoutModal").classList.remove("show");
    showToast("Order "+order+" received — thank you!");
    e.target.reset();
  });
  $("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();showToast("Thanks for joining our newsletter!");e.target.reset()});
  $("#accountBtn").addEventListener("click",()=>showToast("Customer account feature ready to connect"));
  $("#trackLink").addEventListener("click",e=>{e.preventDefault();showToast("Order tracking can be connected to your order system")});
  $(".menu-btn").addEventListener("click",()=>$(".nav").classList.toggle("open"));
});
