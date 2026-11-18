// Presentation enhancements only. No API or authentication changes.
(() => {
 const toggle=document.querySelector('.header-container .menu-toggle');
 const nav=document.querySelector('.header-container nav');
 if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));}
 const homeToggle=document.getElementById('menuToggle');
 if(homeToggle)homeToggle.addEventListener('click',()=>homeToggle.setAttribute('aria-expanded',String(document.getElementById('mainNav')?.classList.contains('open'))));
 if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){document.documentElement.classList.add('js-motion');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.menu-card,.about-text,.photo-frame,.contact-item').forEach(el=>{el.classList.add('reveal');io.observe(el)});}
 const summary=document.getElementById('your-order'),cartLink=document.querySelector('.mobile-order-link');
 if(summary&&cartLink&&'IntersectionObserver' in window)new IntersectionObserver(es=>cartLink.classList.toggle('at-summary',es[0].isIntersecting),{threshold:.1}).observe(summary);
 const categories=document.getElementById('cat-bar');
 if(categories)categories.addEventListener('click',e=>{const chip=e.target.closest('.cat-chip');if(!chip)return;categories.querySelectorAll('.cat-chip').forEach(el=>el.classList.toggle('on',el===chip));});
})();
