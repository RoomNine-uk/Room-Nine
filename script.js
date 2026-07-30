const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];

window.addEventListener('load',()=>{
  setTimeout(()=>$('.page-loader')?.classList.add('is-gone'),450);
});

const header=$('.site-header');
const handleScroll=()=>header?.classList.toggle('scrolled',window.scrollY>40 || document.body.dataset.inner==='true');
window.addEventListener('scroll',handleScroll,{passive:true}); handleScroll();

const menuBtn=$('.menu-toggle'), mobileMenu=$('.mobile-menu');
const setMenuState=open=>{
  mobileMenu?.classList.toggle('open',open);
  document.body.classList.toggle('menu-open',open);
  if(menuBtn) menuBtn.textContent=open?'Close':'Menu';
};
menuBtn?.addEventListener('click',()=>setMenuState(!mobileMenu.classList.contains('open')));
$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>setMenuState(false)));
window.addEventListener('resize',()=>{if(window.innerWidth>980)setMenuState(false)},{passive:true});

// Hero slideshow
const frames=$$('.hero-frame'), dots=$$('.hero-dot');
let heroIndex=0, heroTimer;
function setHero(i){
  if(!frames.length)return;
  heroIndex=(i+frames.length)%frames.length;
  frames.forEach((f,n)=>f.classList.toggle('active',n===heroIndex));
  dots.forEach((d,n)=>d.classList.toggle('active',n===heroIndex));
}
function startHero(){heroTimer=setInterval(()=>setHero(heroIndex+1),5200)}
dots.forEach((d,i)=>d.addEventListener('click',()=>{clearInterval(heroTimer);setHero(i);startHero()}));
setHero(0);startHero();

// Reveal on scroll
const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}
}),{threshold:.12});
$$('.reveal').forEach(el=>io.observe(el));

// Work filters
$$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{
  $$('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const f=btn.dataset.filter;
  $$('.project-item').forEach(item=>{
    item.style.display=(f==='all'||item.dataset.category.includes(f))?'block':'none';
  });
}));

// Project modal
const modal=$('.modal');
const modalData={
  unknown:{title:'Building Unknown London',body:'Ten years spent building Unknown London from an independent label into one of the UK’s biggest streetwear brands. Product, wholesale, campaigns, retail, events, operations and community, all built in-house.',callout:{eyebrow:'Inside the journey',title:'From sell-out drops to cultural world-building.',text:'Unknown isn’t just a clothing brand. It became a full ecosystem built around product, content, experiences and community, proving what happens when a label is treated like a cultural movement.'},stats:[{value:'10M+',label:'Revenue generated'},{value:'100,000',label:'Orders fulfilled'},{value:'3,000',label:'Tracksuits sold in 3 minutes'},{value:'50+',label:'Activations produced'},{value:'10',label:'Years building the brand'},{value:'UK',label:'One of the biggest streetwear brands in the country'}],images:[{src:'assets/images/building-unknown-heli.webp',caption:'3 City Helicopter Pop Up Tour',alt:'Unknown London helicopter pop up tour',wide:true},{src:'assets/images/hero-church-bus.webp',caption:'6 Cities in 6 days pop up bus tour',alt:'Unknown London six city pop up bus tour',wide:true},{src:'assets/images/hero-giveaway-crowd.webp',caption:'The Great British Giveaway Festival',alt:'The Great British Giveaway Festival'},{src:'assets/images/hero-club-crowd.webp',caption:'The Unknown Cypher',alt:'The Unknown Cypher'}]},
  'event-merch':{title:'Event Merchandise',body:'We can develop merch for your event, from tees to accessories to a fully custom collection.',images:[{src:'assets/images/you-and-me-merch.webp',caption:'You and Me / Josh Baker Amnesia Ibiza Merchandise',alt:'You and Me / Josh Baker Amnesia Ibiza merchandise'},{src:'assets/images/event-merchandise-tees.webp',caption:'Slawn x Unknown x Unknown T Cypher merch',alt:'Slawn x Unknown x Unknown T Cypher merch'},{src:'assets/images/product-development-chain.webp',caption:'Unknown London 8 Year Anniversary chains',alt:'Unknown London 8 Year Anniversary chains'},{src:'assets/images/hide-and-seek-festival-2026-grid.webp',caption:'Hide and Seek Festival 2026 Merch',alt:'Hide and Seek Festival 2026 merchandise grid',fit:'contain'}]},
  events:{title:'IRL Activations',body:'IRL is where brands become culture. We build pop-ups, parties, tours, screenings and high-energy community moments that people queue for, talk about and turn up for in serious numbers.',callout:{eyebrow:'In the real world',title:'Experiences that pull crowds, create talkability and travel beyond the room.',text:'From rapid-turnaround house parties to multi-city tours and internationally sold-out pop-ups, we build events with real-world presence. The goal is always the same: make the audience feel the moment and give the brand something unforgettable to own.'},stats:[{value:'25+',label:'Cities with parties and activations'},{value:'6 / 6',label:'Cities covered in a 6 day bus tour'},{value:'1000+',label:'People queues'},{value:'24H',label:'House party organised in just 24 hours'}],images:[{src:'assets/images/irl-01-tee-throw.webp',caption:'THE GREAT BRITISH GIVEAWAY & MERCEDES BENZ RAFFLE',alt:'The Great British Giveaway crowd during Mercedes Benz giveaway'},{src:'assets/images/irl-02-dj.webp',caption:'HOUSE PARTY ORGANISED IN 24 HOURS, 750 ATTENDEES',alt:'House party organised in 24 hours with 750 attendees'},{src:'assets/images/irl-03-ministry.webp',caption:'SLAWN X UNKNOWN T X UNKNOWN CYPHER WITH JME, AJ TRACY, TIFFANY CALVER, LEN, D DOUBLE, CHIP',alt:'Slawn x Unknown T x Unknown Cypher event'},{src:'assets/images/irl-04-church-queue.webp',caption:'BIRMINGHAM STOP OF BUS TOUR',alt:'Birmingham stop of the bus tour'},{src:'assets/images/irl-milan-baby-gang-simba.webp',caption:'MILAN - BABY GANG / SIMBA POP UP',alt:'Milan Baby Gang and Simba pop up crowd'},{src:'assets/images/irl-vrunk-pop-up.webp',caption:'SOLD OUT VRUNK POP UP',alt:'Sold out Vrunk pop up crowd'},{src:'assets/images/irl-chief-keef-party-paris.webp',caption:'SOLD OUT CHIEF KEEF PARTY PARIS',alt:'Sold out Chief Keef party Paris crowd'},{src:'assets/images/irl-hcw-world-cup-viewing.webp',caption:'SOLD OUT HCW X UNKNOWN WORLD CUP VIEWING',alt:'Sold out HCW x Unknown World Cup viewing'}]},
  product:{title:'Concept to Product',body:'Product strategy, design, tech packs, factory sourcing, sampling, manufacturing and final delivery across apparel, accessories, packaging and objects.',images:['assets/images/product-development-chain.webp','assets/images/you-and-me-merch.webp','assets/images/ed-hardy-chief-keef-rugs-stickers.webp','assets/images/product-process.webp']},
  content:{title:'Campaigns',body:'Editorial, film, social, lookbooks, international production and high-impact content built to move at the speed of culture.',images:[{slides:[{src:'assets/images/campaign-01-rocks.webp',alt:'18 person shoot in the Lake District'},{src:'assets/images/campaigns/lake-district-02.jpg',alt:'18 person shoot in the Lake District'},{src:'assets/images/campaigns/lake-district-03.jpg',alt:'18 person shoot in the Lake District'},{src:'assets/images/campaigns/lake-district-04.jpg',alt:'18 person shoot in the Lake District'},{src:'assets/images/campaigns/lake-district-05.jpg',alt:'18 person shoot in the Lake District'},{src:'assets/images/campaigns/lake-district-06.jpg',alt:'18 person shoot in the Lake District'},{src:'assets/images/campaigns/lake-district-07.jpg',alt:'18 person shoot in the Lake District'},{src:'assets/images/campaigns/lake-district-08.jpg',alt:'18 person shoot in the Lake District'},{src:'assets/images/campaigns/lake-district-09.jpg',alt:'18 person shoot in the Lake District'}],caption:'18 person shoot in the Lake District',alt:'18 person shoot in the Lake District',fit:'contain'},{slides:[{src:'assets/images/campaign-02-bike.webp',alt:'Vrunk collaboration campaign in Marseille'},{src:'assets/images/campaigns/marseille-02.jpg',alt:'Vrunk collaboration campaign in Marseille'},{src:'assets/images/campaigns/marseille-03.jpg',alt:'Vrunk collaboration campaign in Marseille'},{src:'assets/images/campaigns/marseille-04.jpg',alt:'Vrunk collaboration campaign in Marseille'},{src:'assets/images/campaigns/marseille-05.jpg',alt:'Vrunk collaboration campaign in Marseille'},{src:'assets/images/campaigns/marseille-06.jpg',alt:'Vrunk collaboration campaign in Marseille'}],caption:'Vrunk Collaboration shot in Marseille',alt:'Vrunk Collaboration shot in Marseille',fit:'contain'},{slides:[{src:'assets/images/campaign-03-washing-line.webp',alt:'SS23 shot and designed in Egypt with local models'},{src:'assets/images/campaigns/egypt-02.jpg',alt:'SS23 shot and designed in Egypt with local models'},{src:'assets/images/campaigns/egypt-03.jpg',alt:'SS23 shot and designed in Egypt with local models'},{src:'assets/images/campaigns/egypt-04.jpg',alt:'SS23 shot and designed in Egypt with local models'},{src:'assets/images/campaigns/egypt-05.jpg',alt:'SS23 shot and designed in Egypt with local models'},{src:'assets/images/campaigns/egypt-06.jpg',alt:'SS23 shot and designed in Egypt with local models'}],caption:'SS23 shot and designed in Egypt with local models',alt:'SS23 shot and designed in Egypt with local models',fit:'contain'},{slides:[{src:'assets/images/campaign-04-sofa.webp',alt:'AW24 House party shoot'},{src:'assets/images/campaigns/house-party-02.png',alt:'AW24 House party shoot'},{src:'assets/images/campaigns/house-party-03.png',alt:'AW24 House party shoot'},{src:'assets/images/campaigns/house-party-04.png',alt:'AW24 House party shoot'},{src:'assets/images/campaigns/house-party-05.png',alt:'AW24 House party shoot'},{src:'assets/images/campaigns/house-party-06.png',alt:'AW24 House party shoot'},{src:'assets/images/campaigns/house-party-07.png',alt:'AW24 House party shoot'}],caption:'AW24 House party shoot',alt:'AW24 House party shoot',fit:'contain'},{slides:[{src:'assets/images/campaign-05-puffer.webp',alt:'AW25 Studio Shoot'},{src:'assets/images/campaigns/aw25-lookbook-02.jpg',alt:'AW25 Studio Shoot'},{src:'assets/images/campaigns/aw25-lookbook-03.jpg',alt:'AW25 Studio Shoot'},{src:'assets/images/campaigns/aw25-lookbook-04.jpg',alt:'AW25 Studio Shoot'},{src:'assets/images/campaigns/aw25-lookbook-05.jpg',alt:'AW25 Studio Shoot'},{src:'assets/images/campaigns/aw25-lookbook-06.jpg',alt:'AW25 Studio Shoot'},{src:'assets/images/campaigns/aw25-lookbook-07.jpg',alt:'AW25 Studio Shoot'},{src:'assets/images/campaigns/aw25-lookbook-08.jpg',alt:'AW25 Studio Shoot'},{src:'assets/images/campaigns/aw25-lookbook-09.jpg',alt:'AW25 Studio Shoot'}],caption:'AW25 Studio Shoot',alt:'AW25 Studio Shoot',fit:'contain'},{slides:[{src:'assets/images/campaign-06-private-jet.webp',alt:'Velour collection Private Jet shoot'},{src:'assets/images/campaigns/private-jet-02.jpg',alt:'Velour collection Private Jet shoot'},{src:'assets/images/campaigns/private-jet-03.jpg',alt:'Velour collection Private Jet shoot'},{src:'assets/images/campaigns/private-jet-04.jpg',alt:'Velour collection Private Jet shoot'},{src:'assets/images/campaigns/private-jet-05.jpg',alt:'Velour collection Private Jet shoot'},{src:'assets/images/campaigns/private-jet-06.jpg',alt:'Velour collection Private Jet shoot'},{src:'assets/images/campaigns/private-jet-07.jpg',alt:'Velour collection Private Jet shoot'},{src:'assets/images/campaigns/private-jet-08.jpg',alt:'Velour collection Private Jet shoot'}],caption:'Velour collection Private Jet shoot',alt:'Velour collection Private Jet shoot',fit:'contain'}]},
  ai:{title:'Impossible Made Possible',body:'Hyper-realistic concept imagery and campaign worlds created without the cost and constraints of traditional international production.',images:['assets/images/horse-room.webp','assets/images/burning-car.webp','assets/images/bmw-dog.webp','assets/images/pink-car.webp']},
  logistics:{title:'Worldwide Distribution Centres.',body:"We've got every part of your journey covered.",images:[{src:'assets/images/logistics-warehouse-bw-landscape.webp',alt:'Worldwide distribution centre with boxed stock',wide:true}],network:true}
};
function initModalSliders(){
  $$('.modal-slider', modal).forEach(slider=>{
    const slides=$$('.modal-slide', slider);
    const dots=$$('.modal-slider-dot', slider);
    const prev=$('.modal-slider-prev', slider);
    const next=$('.modal-slider-next', slider);
    if(!slides.length)return;
    let index=Math.max(0, slides.findIndex(slide=>slide.classList.contains('active')));
    const setSlide=i=>{
      index=(i+slides.length)%slides.length;
      slides.forEach((slide,n)=>slide.classList.toggle('active',n===index));
      dots.forEach((dot,n)=>{
        dot.classList.toggle('active',n===index);
        dot.setAttribute('aria-pressed',String(n===index));
      });
    };
    prev?.addEventListener('click',()=>setSlide(index-1));
    next?.addEventListener('click',()=>setSlide(index+1));
    dots.forEach((dot,n)=>dot.addEventListener('click',()=>setSlide(n)));
    setSlide(index);
  });
}

function openModal(key){
  if(!modal||!modalData[key])return; const d=modalData[key];
  modal.dataset.project=key;
  $('#modal-title').textContent=d.title; $('#modal-body').textContent=d.body;
  const g=$('.modal-images');
  const network=d.network?`<div class="logistics-network">
    <div class="network-map-bg"></div>
    <svg class="network-lines" viewBox="0 0 1000 520" aria-hidden="true">
      <defs><filter id="routeGlow"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <path id="route-usa" d="M460 203 C365 130 255 152 170 234"/>
      <path id="route-nl" d="M460 203 C478 183 494 181 510 192"/>
      <path id="route-cn" d="M510 192 C612 148 676 178 730 250"/>
      <path id="route-jp" d="M730 250 C775 216 812 216 840 239"/>
      <circle class="route-particle" r="4" filter="url(#routeGlow)"><animateMotion dur="4.7s" repeatCount="indefinite"><mpath href="#route-usa"/></animateMotion></circle>
      <circle class="route-particle" r="4" filter="url(#routeGlow)"><animateMotion dur="2.2s" repeatCount="indefinite"><mpath href="#route-nl"/></animateMotion></circle>
      <circle class="route-particle" r="4" filter="url(#routeGlow)"><animateMotion dur="5.2s" repeatCount="indefinite"><mpath href="#route-cn"/></animateMotion></circle>
      <circle class="route-particle" r="4" filter="url(#routeGlow)"><animateMotion dur="2.9s" repeatCount="indefinite"><mpath href="#route-jp"/></animateMotion></circle>
    </svg>
    <div class="network-node usa" data-label="USA"></div><div class="network-node uk" data-label="UK"></div><div class="network-node nl" data-label="NETHERLANDS"></div><div class="network-node cn" data-label="CHINA"></div><div class="network-node jp" data-label="JAPAN"></div>
    <div class="network-copy"><span>GLOBAL DISTRIBUTION NETWORK</span><strong>5 hubs.<br>Worldwide reach.</strong><div class="network-stats"><b>UK</b><b>NETHERLANDS</b><b>USA</b><b>CHINA</b><b>JAPAN</b></div></div>
  </div>`:'';
  const feature=(d.callout||d.stats||d.highlights||d.pills||d.partnerPills)?`<section class="modal-feature-block">
    ${d.callout?`<div class="modal-callout"><div><span class="modal-section-kicker">${d.callout.eyebrow||'Overview'}</span><h3>${d.callout.title||''}</h3></div><p>${d.callout.text||''}</p></div>`:''}
    ${d.stats?`<div class="modal-stats-grid">${d.stats.map(stat=>`<div class="modal-stat"><strong>${stat.value}</strong><span>${stat.label}</span></div>`).join('')}</div>`:''}
    ${d.highlights?`<div class="modal-highlight-grid">${d.highlights.map(item=>`<article class="modal-highlight"><h4>${item.title}</h4><p>${item.text}</p></article>`).join('')}</div>`:''}
    ${(d.pills||d.partnerPills)?`<div class="modal-chip-groups">${d.pills?`<div><span class="modal-chip-label">Built across</span><div class="modal-chip-cloud">${d.pills.map(pill=>`<span class="modal-chip">${pill}</span>`).join('')}</div></div>`:''}${d.partnerPills?`<div><span class="modal-chip-label">Selected collaborations</span><div class="modal-chip-cloud is-collab">${d.partnerPills.map(pill=>`<span class="modal-chip">${pill}</span>`).join('')}</div></div>`:''}</div>`:''}
  </section>`:'';
  g.innerHTML=network+feature+d.images.map(item=>{
    const image=typeof item==='string'?{src:item,alt:d.title}:item;
    const classes=['modal-figure'];
    if(image.wide) classes.push('wide');
    if(image.fit==='contain') classes.push('is-contain');
    const media=image.slides?.length
      ? `<div class="modal-slider" data-slide-count="${image.slides.length}"><div class="modal-slider-track">${image.slides.map((slide,n)=>`<div class="modal-slide ${n===0?'active':''}"><img src="${slide.src}" alt="${slide.alt||image.alt||d.title}"></div>`).join('')}</div><div class="modal-slider-ui"><button class="modal-slider-prev" type="button" aria-label="Previous image">←</button><div class="modal-slider-dots">${image.slides.map((_,n)=>`<button class="modal-slider-dot ${n===0?'active':''}" type="button" aria-label="Go to image ${n+1}" aria-pressed="${n===0?'true':'false'}"></button>`).join('')}</div><button class="modal-slider-next" type="button" aria-label="Next image">→</button></div></div>`
      : `<img src="${image.src}" alt="${image.alt||d.title}">`;
    return `<figure class="${classes.join(' ')}">${media}${image.caption?`<figcaption>${image.caption}</figcaption>`:''}</figure>`;
  }).join('');
  initModalSliders();
  modal.classList.add('open');document.body.style.overflow='hidden';
}
$$('[data-project]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();openModal(el.dataset.project)}));
$('.modal-close')?.addEventListener('click',()=>{modal.classList.remove('open');document.body.style.overflow=''});
modal?.addEventListener('click',e=>{if(e.target===modal){modal.classList.remove('open');document.body.style.overflow=''}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal?.classList.contains('open')){$('.modal-close').click()}});

// Contact tabs and mailto forms
$$('.form-tab').forEach(tab=>tab.addEventListener('click',()=>{
  $$('.form-tab').forEach(t=>t.classList.remove('active'));tab.classList.add('active');
  $$('.form-panel').forEach(p=>p.classList.toggle('active',p.id===tab.dataset.target));
}));
$$('.mailto-form').forEach(form=>form.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(form), lines=[];
  for(const [k,v] of data.entries()) lines.push(`${k}: ${v}`);
  const subject=form.dataset.subject||'Room Nine enquiry';
  window.location.href=`mailto:callum@roomnine.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}));

// Footer date
$$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());


// Talent roster filters
$$('[data-talent-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  $$('[data-talent-filter]').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const filter=btn.dataset.talentFilter;
  $$('[data-talent-category]').forEach(card=>{
    card.classList.toggle('is-hidden',filter!=='all'&&card.dataset.talentCategory!==filter);
  });
}));
