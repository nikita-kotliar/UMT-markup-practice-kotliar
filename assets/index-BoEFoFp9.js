import{n as e,r as t,t as n}from"./rolldown-runtime-B97S5rRB.js";import{a as r,i,n as a,r as o,t as s}from"./vendor-DdbZEDoN.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var c=e((()=>{}));n((()=>{c(),i(),o();var e=t(a());s(),window.history.scrollRestoration=`manual`,window.scrollTo({top:0,behavior:`instant`});var n={success:`linear-gradient(135deg, #22c55e, #16a34a)`,error:`linear-gradient(135deg, #ef4444, #dc2626)`,warning:`linear-gradient(135deg, #f59e0b, #d97706)`,info:`linear-gradient(135deg, #6366f1, #4f46e5)`},l={_show(t,r,i=4e3){(0,e.default)({text:r,duration:i,close:!0,gravity:`top`,position:`right`,stopOnFocus:!0,style:{background:n[t]??n.info}}).showToast()},success(e,t){this._show(`success`,e,t?.duration)},error(e,t){this._show(`error`,e,t?.duration)},warning(e,t){this._show(`warning`,e,t?.duration)},info(e,t){this._show(`info`,e,t?.duration)}},u=`https://fireplace-backend.onrender.com/`;function d(){fetch(`${u}api/bouquets?_limit=1`).catch(()=>{})}setInterval(d,600*1e3);var f=document.querySelector(`.mobile-menu-wrapper`),p=document.querySelector(`.open-mobile-menu-btn`),m=document.querySelector(`.close-mobile-menu-btn`),h=document.querySelectorAll(`.mobile-menu-href-js`),g=document.querySelectorAll(`.header-button`);function _(){f.classList.remove(`active`),m.classList.remove(`active`),p.classList.remove(`unactive`),document.body.style.overflow=`visible`}g.forEach(e=>e.addEventListener(`click`,_)),h.forEach(e=>e.addEventListener(`click`,_)),m.addEventListener(`click`,_),p.addEventListener(`click`,()=>{f.classList.add(`active`),m.classList.add(`active`),p.classList.add(`unactive`),document.body.style.overflow=`hidden`}),window.addEventListener(`resize`,()=>{window.innerWidth>=1440&&_()});var v=document.getElementById(`main-bouquets-list`),y=document.getElementById(`bouquets-empty`),b=document.getElementById(`bouquets-error`),x=document.getElementById(`load-more-btn`),S=15,C=1,w=[],T=1;async function E(){let e=`${u}api/bouquets?_page=${C}&_limit=${S}`,t=await fetch(e);if(!t.ok)throw Error(`HTTP ${t.status}`);return t.json()}function D(e){return`
    <li class="list-item" data-id="${e.id}">
      <img src="${e.photoURL}" alt="${e.title}" class="flower image" fetchpriority="high" />
      <div class="text">
        <h3 class="flower-title">${e.title}</h3>
        <p class="flower-text">${e.description}</p>
        <p class="price">$${e.price}</p>
      </div>
    </li>`}function O(){v.innerHTML=w.map(D).join(``),y.classList.toggle(`hidden`,w.length>0),x.style.display=`none`,b.classList.add(`hidden`)}async function k(){try{b.classList.add(`hidden`);let e=C===1,t=await E();if(w=[...w,...t],O(),C++,!e){let e=v.querySelector(`.list-item`);e&&window.scrollBy({top:e.getBoundingClientRect().height,behavior:`smooth`})}t.length<S?(x.textContent=`All loaded`,x.disabled=!0):x.style.display=`block`}catch(e){console.error(`Failed to load bouquets:`,e),b.textContent=`Server is waking up, please try again in 30 seconds...`,b.classList.remove(`hidden`)}}x.addEventListener(`click`,k);async function A(e){let t=`${u}api/bouquets/${e}`,n=await fetch(t);if(!n.ok)throw Error(`HTTP ${n.status}`);return n.json()}var j=document.getElementById(`modal-backdrop`),M=document.getElementById(`modal-content`),N=document.getElementById(`modal`),P=document.getElementById(`close-modal-btn`);function F(){j.classList.add(`is-open`),document.body.style.overflow=`hidden`}function I(){j.classList.remove(`is-open`),document.body.style.overflow=`visible`,M.innerHTML=``,M.classList.remove(`about`,`form`),N.classList.remove(`about`,`form`),T=1,P._formBackHandler=null}j.addEventListener(`click`,e=>{if(e.target===j){if(P._formBackHandler){P._formBackHandler(),P._formBackHandler=null;return}I()}}),P.addEventListener(`click`,()=>{if(P._formBackHandler){P._formBackHandler(),P._formBackHandler=null;return}I()});function L(e){M.classList.remove(`form`),N.classList.remove(`form`),M.classList.add(`about`),N.classList.add(`about`),M.innerHTML=`
    <img src="${e.photoURL}" alt="${e.title}" class="flower-image" fetchpriority="high" />
    <div class="text">
      <h3 class="flower-title">${e.title}</h3>
      <p class="price">$${e.price}</p>
      <p class="flower-text">${e.description}</p>
      <div class="purchase-section">
        <button class="button animated-button buy-now-btn" aria-label="Add to cart" type="button">Buy now</button>
        <input type="number" class="quantity-input" value="1" min="1" max="9999" />
      </div>
    </div>
  `;let t=M.querySelector(`.buy-now-btn`),n=M.querySelector(`.quantity-input`);t.addEventListener(`click`,()=>{T=parseInt(n.value,10)||1,B(e)})}function R(e){M.classList.remove(`form`),N.classList.remove(`form`),M.classList.add(`about`),N.classList.add(`about`),M.innerHTML=`
    <img src="${e.photoURL}" alt="${e.title}" class="flower-image" fetchpriority="high" />
    <div class="text">
      <h3 class="flower-title">${e.title}</h3>
      <p class="price">$${e.price}</p>
      <p class="flower-text">${e.description}</p>
      <div class="purchase-section" style="justify-content:center;">
        <p style="font-weight:600;color:#ef4444;font-size:15px;">⚠️ Currently unavailable</p>
      </div>
    </div>
  `}function z(e){return/^[+]?[0-9\s()\-]{7,18}$/.test(e.trim())}function B(e){M.classList.remove(`about`),N.classList.remove(`about`),M.classList.add(`form`),N.classList.add(`form`),M.innerHTML=`
    <h2 class="modal-title">Order</h2>
    <form class="modal-form" id="modal-form" novalidate>
      <div class="form-group">
        <label class="modal-form-label" for="name">Name*</label>
        <input class="modal-form-input" id="name" type="text" name="name" placeholder="Ann" required />
        <span class="field-error hidden" id="name-error"></span>
      </div>
      <div class="form-group">
        <label class="modal-form-label" for="phone">Phone*</label>
        <input class="modal-form-input" id="phone" type="tel" name="phone" placeholder="+1 (555) 123-4567" required />
        <span class="field-error hidden" id="phone-error"></span>
      </div>
      <div class="form-group">
        <label class="modal-form-label" for="address">Address*</label>
        <input class="modal-form-input" id="address" type="text" name="address" placeholder="456 Floral Ave, Sydney NSW 2000 AU" required />
        <span class="field-error hidden" id="address-error"></span>
      </div>
      <div class="form-group">
        <label class="modal-form-label" for="comment">Message</label>
        <textarea class="modal-form-input" id="comment" name="comment" placeholder="Type your message..."></textarea>
      </div>
      <button class="button animated-button submit-btn" type="submit">Go to Checkout</button>
    </form>
  `;let t=M.querySelector(`#modal-form`);function n(e,n){let r=t.querySelector(`#${e}`),i=t.querySelector(`#${e}-error`);!r||!i||(r.classList.add(`input-error`),i.textContent=n,i.classList.remove(`hidden`))}function r(e){let n=t.querySelector(`#${e}`),r=t.querySelector(`#${e}-error`);!n||!r||(n.classList.remove(`input-error`),r.textContent=``,r.classList.add(`hidden`))}t.querySelectorAll(`.modal-form-input`).forEach(e=>{e.addEventListener(`focus`,()=>{e.closest(`.form-group`)?.querySelector(`.modal-form-label`)?.classList.add(`label-focused`)}),e.addEventListener(`blur`,()=>{e.closest(`.form-group`)?.querySelector(`.modal-form-label`)?.classList.remove(`label-focused`)})}),[`name`,`phone`,`address`].forEach(e=>{t.querySelector(`#${e}`)?.addEventListener(`input`,()=>r(e))}),t.addEventListener(`submit`,r=>{r.preventDefault();let i=new FormData(t),a=i.get(`name`).trim(),o=i.get(`phone`).trim(),s=i.get(`address`).trim(),c=!1;if(a||(n(`name`,`Please enter your name`),c=!0),o?z(o)||(n(`phone`,`Enter a valid phone number`),c=!0):(n(`phone`,`Please enter your phone number`),c=!0),s||(n(`address`,`Please enter your address`),c=!0),c){l.error(`Please fix the highlighted fields before submitting.`);return}let u={bouquet:{id:e.id,title:e.title,price:e.price},quantity:T,total:`$${(e.price*T).toFixed(2)}`,customer:{name:a,phone:o,address:s,comment:i.get(`comment`)||``}};console.log(`Order submitted:`,u),I(),l.success(`Order for "${e.title}" placed! We'll contact you soon.`,{duration:6e3})}),P._formBackHandler=()=>L(e)}v.addEventListener(`click`,async e=>{let t=e.target.closest(`.list-item`);if(!t)return;let n=t.dataset.id;P._formBackHandler=null;try{let e=await A(n);T=1,L(e),F()}catch(e){console.error(`Failed to fetch bouquet data:`,e),l.error(`Could not load bouquet details. Please try again.`)}});var V=[{photoURL:`https://ftp.goit.study/img/flowers/68498236a1003120869.png`,title:`Spring Elegance`,description:`A delicate blend of peonies, tulips, and roses — perfect for springtime gifting and bright smiles.`,price:35,isFallback:!0},{photoURL:`https://ftp.goit.study/img/flowers/68498236a1003120870.png`,title:`Berry Chic`,description:`A stylish composition of roses, seasonal greenery, and vibrant berries — a bold and elegant floral statement.`,price:40,isFallback:!0},{photoURL:`https://ftp.goit.study/img/flowers/68498236a1003120871.png`,title:`Lavender Dream`,description:`A rich bouquet with lavender, lisianthus, and roses — ideal for those who love deep hues and gentle fragrance.`,price:55,isFallback:!0},{photoURL:`https://ftp.goit.study/img/flowers/68498236a1003120872.png`,title:`Lavendin Hell`,description:`A dramatic arrangement of dark purple roses, calla lilies, and lush greenery — designed for bold personalities and unforgettable moments.`,price:75,isFallback:!0}];async function H(){try{let e=await fetch(`${u}api/bouquets?favorite=true&_limit=10`);if(!e.ok)throw Error(`HTTP ${e.status}`);let t=await e.json();return Array.isArray(t)?t:[]}catch{return[]}}function U(e){if(e.length>=4)return e.map(e=>({...e,isFallback:!1}));let t=4-e.length;return[...e.map(e=>({...e,isFallback:!1})),...V.slice(0,t)]}async function W(){let e=U(await H()),t=document.querySelector(`.gallery-swiper .swiper-wrapper`);t.innerHTML=e.map((e,t)=>`
      <li class="swiper-slide gallery-item" data-slide-index="${t}">
        <img src="${e.photoURL}" alt="${e.title}" class="image" />
        <div class="text">
          <h3 class="flower-title">${e.title}</h3>
          <p class="flower-text">${e.description}</p>
          <p class="price">$${e.price}</p>
        </div>
      </li>`).join(``),t.addEventListener(`click`,t=>{let n=t.target.closest(`.gallery-item`);if(!n)return;let r=e[parseInt(n.dataset.slideIndex,10)];r&&(P._formBackHandler=null,r.isFallback?(R(r),F(),l.warning(`"${r.title}" is currently not available in our store.`,{duration:5e3})):A(r.id).then(e=>{T=1,L(e),F()}).catch(e=>{console.error(`Failed to fetch gallery bouquet:`,e),l.error(`Could not load bouquet details. Please try again.`)}))}),new r(`.gallery-swiper`,{loop:!0,autoplay:{delay:4e3,disableOnInteraction:!1,pauseOnMouseEnter:!0},pagination:{el:`.gallery-dots`,clickable:!0},navigation:{nextEl:`.swiper-button-next`,prevEl:`.swiper-button-prev`},breakpoints:{0:{slidesPerView:1,spaceBetween:0},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:32}}})}var G=[{text:`"Flora made my anniversary unforgettable with their beautiful arrangement!"`,author:`Emma T.`},{text:`Absolutely stunning bouquet! It looked even better than the photo and arrived right on time.`,author:`Daniel R.`},{text:`The service was exceptional, and the flowers were fresh for over two weeks!`,author:`Olivia M.`},{text:`I ordered a last-minute birthday bouquet and was amazed — it was delivered within hours and looked gorgeous.`,author:`Sophie K.`},{text:`Every time I order from Flora, I know I'm getting something truly special. My go-to flower shop!`,author:`James L.`},{text:`The team helped me choose the perfect arrangement for my mom's birthday. She was in tears — the good kind!`,author:`Lena B.`}];async function K(){let e=G,t=document.querySelector(`.reviews-swiper .swiper-wrapper`);t.innerHTML=e.map(e=>`
      <li class="swiper-slide reviews-item">
        <p class="text">${e.text}</p>
        <p class="author">${e.author}</p>
      </li>`).join(``),new r(`.reviews-swiper`,{loop:!0,autoplay:{delay:5e3,disableOnInteraction:!1,pauseOnMouseEnter:!0},navigation:{nextEl:`.reviews-swiper .swiper-button-next`,prevEl:`.reviews-swiper .swiper-button-prev`},breakpoints:{0:{slidesPerView:1,spaceBetween:0},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:32}}})}k(),W(),K()}))();
//# sourceMappingURL=index-BoEFoFp9.js.map