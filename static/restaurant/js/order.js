// Yasir Broast - order page (database menu + real order saving)
let menu=[],cart={};const $=id=>document.getElementById(id);
const money=n=>'PKR '+Number(n).toLocaleString('en-PK');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ICONS={start:'fa-drumstick-bite',burg:'fa-hamburger',broas:'fa-drumstick-bite',sajj:'fa-fire',paki:'fa-utensils',chick:'fa-bowl-food',bbq:'fa-fire-flame-curved',chin:'fa-egg',rice:'fa-bowl-rice',sala:'fa-carrot',fast:'fa-burger',bever:'fa-glass-water'};
const icon=n=>{n=n.toLowerCase();const k=Object.keys(ICONS).find(k=>n.startsWith(k));return ICONS[k]||'fa-utensils'};
try{cart=JSON.parse(localStorage.getItem('yb_cart')||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem('yb_cart',JSON.stringify(cart))}catch(e){}};
const all=()=>menu.flatMap(c=>c.items);
const ctl=i=>cart[i.id]?`<span class="qty-ctl"><button type="button" data-d="-1" aria-label="Remove one">−</button>${cart[i.id]}<button type="button" data-d="1" aria-label="Add one">+</button></span>`:'<button type="button" class="add-btn" data-d="1"><i class="fas fa-plus"></i> Add</button>';

function draw(){
 const q=$('q').value.trim().toLowerCase();
 $('order-menu-container').innerHTML=menu.map((c,ci)=>{const it=c.items.filter(i=>!q||i.name.toLowerCase().includes(q));
  return it.length?`<div class="order-category" id="cat-${c.id}" style="animation-delay:${ci*.08}s"><h3><i class="fas ${icon(c.name)}"></i> ${esc(c.name)}</h3>${it.map(i=>`<div class="order-item" data-id="${i.id}"><div class="item-info"><span class="name">${esc(i.name)}</span><span class="price">${money(i.price)}</span></div>${ctl(i)}</div>`).join('')}</div>`:''}).join('')||'<p style="color:var(--text-muted)">Nothing matches your search. Try another word.</p>';
}
function basket(){
 const list=all();let t=0;const rows=Object.entries(cart).filter(([id])=>list.some(x=>x.id==id));
 $('cart-items').innerHTML=rows.length?rows.map(([id,q])=>{const i=list.find(x=>x.id==id),lt=i.price*q;t+=lt;return `<li class="cart-item"><div><strong>${esc(i.name)}</strong><br><small style="color:var(--text-muted)">${q} × ${money(i.price)}</small></div><span class="item-total">${money(lt)}</span></li>`}).join(''):'<li style="color:#777;text-align:center;padding:20px 0">Your cart is empty.</li>';
 $('total-price').textContent=money(t);
 if($('mobile-total'))$('mobile-total').textContent=money(t);
}
$('order-menu-container').addEventListener('click',e=>{
 const b=e.target.closest('[data-d]');if(!b)return;const row=b.closest('.order-item'),id=row.dataset.id,i=all().find(x=>x.id==id);
 cart[id]=Math.max(0,(cart[id]||0)+ +b.dataset.d);if(!cart[id])delete cart[id];
 row.lastElementChild.outerHTML=ctl(i);row.lastElementChild.classList.add('pop');save();basket();
 if(+b.dataset.d>0)toast('Added '+i.name);
});
$('q').addEventListener('input',draw);
$('cat-bar').addEventListener('click',e=>{const b=e.target.closest('.cat-chip');if(!b)return;$('q').value='';draw();document.getElementById('cat-'+b.dataset.id)?.scrollIntoView({behavior:'smooth',block:'start'})});
function toast(msg,type){const t=document.createElement('div');t.textContent=msg;
 t.className='design-toast'+(type==='error'?' error':'');
 document.body.appendChild(t);requestAnimationFrame(()=>t.style.transform='none');
 setTimeout(()=>{t.style.transform='translateX(150%)';t.style.opacity=0;setTimeout(()=>t.remove(),400)},2200)}
$('order-form').addEventListener('submit',async e=>{
 e.preventDefault();const out=$('order-result'),rows=Object.entries(cart).map(([id,quantity])=>({id:+id,quantity}));
 if(!rows.length){toast('Please add some items to your cart first!','error');return}
 const f=new FormData(e.target),btn=e.target.querySelector('.place-order-btn');btn.disabled=true;out.innerHTML='';
 const csrf=f.get('csrfmiddlewaretoken')||(document.cookie.match(/csrftoken=([^;]+)/)||[])[1]||'';
 try{
  const r=await fetch('/api/orders/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':csrf},body:JSON.stringify({customer_name:f.get('customer_name'),phone:f.get('phone'),address:f.get('address'),notes:f.get('notes'),items:rows})});
  const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||'Could not place your order. Please try again.');
  out.innerHTML=`<div class="order-ok"><i class="fas fa-circle-check"></i><h3 style="margin:8px 0">Order Placed!</h3><p>Reference: <b>${esc(d.reference)}</b><br>Total: ${money(d.total)}</p><p style="color:var(--text-muted);font-size:.85rem">We will call you to confirm.</p><a href="/track/?ref=${encodeURIComponent(d.reference)}">Track this order <i class="fas fa-arrow-right"></i></a></div>`;
  toast('Order placed! Total: '+money(d.total));cart={};save();basket();draw();e.target.reset();
 }catch(err){out.innerHTML=`<p class="order-err">${esc(err.message)}</p>`;toast(err.message,'error')}finally{btn.disabled=false}
});
for(let i=0;i<0;i++){const s=document.createElement('div'),z=(2+Math.random()*4)+'px';s.className='sizzle';s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${z};height:${z};animation-delay:${Math.random()*4}s;animation-duration:${3+Math.random()*3}s`;document.body.appendChild(s)}
fetch('/api/menu/').then(r=>r.json()).then(d=>{menu=d.categories.filter(c=>c.items.length);
 $('cat-bar').innerHTML=menu.map(c=>`<button type="button" class="cat-chip" data-id="${c.id}">${esc(c.name)}</button>`).join('');
 draw();basket();
}).catch(()=>{$('order-menu-container').innerHTML='<p class="order-err">Menu could not load. Please refresh the page.</p>'});
