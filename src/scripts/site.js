(()=>{var gliding=false;const amb=document.querySelector('.ambient');
const R=matchMedia('(prefers-reduced-motion: reduce)').matches, $=(q,c=document)=>[...c.querySelectorAll(q)];
// theme toggle
const tb=document.querySelector('.theme');const sync=()=>{tb.setAttribute('aria-pressed',document.documentElement.dataset.skin==='dark')};sync();tb.onclick=()=>{const d=document.documentElement;d.dataset.skin=d.dataset.skin==='dark'?'light':'dark';try{localStorage.setItem('skin',d.dataset.skin)}catch(e){}sync()};
// reveal with stagger
$('.h,.lede,.flow,.widgets>*,.grid>*,.steps>*,.role,.badges>*,.sb>*,.names,.edu,.end .cta').forEach(e=>{e.classList.add('rv');const sib=[...e.parentNode.children].indexOf(e);e.style.setProperty('--d',(Math.min(sib,6)*.07)+'s')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);count(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
$('.rv').forEach(e=>io.observe(e));
// count-up
function count(el){$('[data-n]',el).concat(el.dataset.n?[el]:[]).forEach(n=>{const t=+n.dataset.n,suf=n.dataset.s||'',t0=performance.now();const f=now=>{const k=Math.min(1,(now-t0)/1400),e=1-Math.pow(1-k,4);n.textContent=Math.round(t*e)+suf;if(k<1)requestAnimationFrame(f)};R?n.textContent=t+suf:requestAnimationFrame(f)})}
// scroll: hero window flattens, nav shrinks, active link
const app=document.querySelector('.stage'),nav=document.querySelector('nav'),links=$('.capsule a[href^="#"]');
const secs=links.map(a=>document.querySelector(a.getAttribute('href')));
function onScroll(){const y=scrollY;amb&&amb.style.setProperty('--sp',(y/Math.max(1,document.documentElement.scrollHeight-innerHeight)).toFixed(3));const r=app.getBoundingClientRect(),pr=Math.max(0,Math.min(1,1-(r.top-innerHeight*.2)/(innerHeight*.6)));
 app.style.setProperty('--pr',pr.toFixed(3));app.querySelector('.app').style.setProperty('--tilt',(22*(1-pr)).toFixed(2));
 nav.classList.toggle('shrink',y>40);
 if(!gliding){let cur=0;secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<innerHeight*.4)cur=i});links.forEach((a,i)=>a.classList.toggle('cur',i===cur))}}
let ticking=false;addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(()=>{ticking=false;onScroll()})}},{passive:true});onScroll();
// Eased in-page navigation: smooth, distance-aware, lands below the floating nav.
let navLock=0;
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
function glide(target){
  const navH=(document.querySelector('.capsule')?.offsetHeight||48)+28;
  const to=Math.max(0,Math.min(target.getBoundingClientRect().top+scrollY-(target.id==='top'?0:navH),document.documentElement.scrollHeight-innerHeight));
  const from=scrollY,dist=to-from;if(Math.abs(dist)<2)return;
  if(R){scrollTo(0,to);return}
  gliding=true;const dur=Math.min(1100,Math.max(520,Math.abs(dist)*.32)),t0=performance.now(),id=++navLock;
  document.documentElement.style.scrollBehavior='auto';
  const stop=()=>{navLock++;cleanup()},cleanup=()=>{gliding=false;removeEventListener('wheel',stop);removeEventListener('touchstart',stop);document.documentElement.style.scrollBehavior=''};
  addEventListener('wheel',stop,{passive:true,once:true});addEventListener('touchstart',stop,{passive:true,once:true});
  const step=now=>{if(id!==navLock)return;const k=Math.min(1,(now-t0)/dur);scrollTo(0,from+dist*ease(k));if(k<1)requestAnimationFrame(step);else{navLock++;cleanup();onScroll()}};
  requestAnimationFrame(step);
}
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||e.metaKey||e.ctrlKey)return;const id=a.getAttribute('href').slice(1);const t=id?document.getElementById(id):null;if(!t)return;
  e.preventDefault();links.forEach(l=>l.classList.toggle('cur',l.getAttribute('href')==='#'+id));glide(t);history.replaceState(null,'','#'+id);
  if(id!=='top'&&id!=='main'){t.setAttribute('tabindex','-1');t.focus({preventScroll:true})}});

// 3D tilt + glare
$('.tile,.wg,.badge').forEach(t=>{t.classList.add('tilt');const g=document.createElement('span');g.className='glare';t.appendChild(g);
 t.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||R)return;const b=t.getBoundingClientRect(),x=(e.clientX-b.left)/b.width,y=(e.clientY-b.top)/b.height,m=b.width>700?3:7;
  t.style.setProperty('--ry',((x-.5)*m)+'deg');t.style.setProperty('--rx',((.5-y)*m)+'deg');t.style.setProperty('--gx',x*100+'%');t.style.setProperty('--gy',y*100+'%')});
 t.addEventListener('pointerleave',()=>{t.style.setProperty('--rx','0deg');t.style.setProperty('--ry','0deg')})});
// interactive console data
const D={
 'Sync save':{m:'1 record · 2 triggers · 1 flow · 3 async jobs started',v:[[38,100],[18,150],[7940,10000],[1.4,6],[2,100],[1,50]],f:[['#ff453a','!','SOQL query inside a loop','<code>AccountTrigger.cls:42</code> runs once per record. Move it above the loop.'],['#ff9f0a','!','CPU time near limit','79% used in one save. Flow and trigger both recalculate rollups.'],['#30d158','✓','DML is bulkified','All 18 statements operate on collections.']]},
 '@future callout':{m:'Async · 1 HTTP callout through a Named Credential',v:[[4,200],[2,150],[1210,60000],[0.6,12],[1,100],[0,50]],f:[['#30d158','✓','Callout uses Named Credential','No secrets in Apex. Endpoint resolved at runtime.'],['#ff9f0a','!','No retry on timeout','A 504 drops the update. Consider a Queueable with backoff.']]},
 'SyncQueueable':{m:'Async · chained job with Transaction Finalizer',v:[[12,200],[6,150],[2400,60000],[2.1,12],[1,100],[1,50]],f:[['#30d158','✓','Finalizer attached','Failures are logged and the chain is resumed.'],['#30d158','✓','Within chain depth','1 enqueued job, well under the limit.']]},
 'Batch chunk 1 of 4':{m:'Batch · 200 records per execute',v:[[3,200],[4,150],[9800,60000],[3.6,12],[0,100],[0,50]],f:[['#30d158','✓','Selective query','Indexed filter on LastModifiedDate.'],['#ff9f0a','!','Heap grows per chunk','Stateful map keeps every Id. Store counts instead.']]},
 'Platform event':{m:'Event trigger · 1 subscriber',v:[[2,100],[1,150],[88,10000],[0.2,6],[0,100],[0,50]],f:[['#30d158','✓','Lightweight subscriber','Hands work off to a Queueable.']]}};
const fmt=(n,i)=>i===2?n.toLocaleString():i===3?n.toFixed(1):String(n);
const units=['of 100','of 150','of 10,000 ms','of 6 MB','of 100','of 50'];
function show(name){const d=D[name];if(!d)return;document.querySelector('.main h5').textContent=name;document.querySelector('.main h5+p').textContent=d.m;
 $('.lim>div').forEach((c,i)=>{const[v,max]=d.v[i];const lim=i===2?(max>10000?'of 60,000 ms':'of 10,000 ms'):i===3?`of ${max} MB`:i===0?`of ${max}`:units[i];
  c.querySelector('strong').innerHTML=`${fmt(v,i)} <small>${lim}</small>`;const pct=v/max*100;const bar=c.querySelector('.pb');bar.className='pb '+(pct>70?'o':['','g','','p','g',''][i]);bar.querySelector('s').style.width=Math.max(pct,1)+'%'});
 const box=document.querySelector('.find');$('.f',box).forEach(x=>x.classList.add('out'));
 setTimeout(()=>{$('.f',box).forEach(x=>x.remove());d.f.forEach(([c,ic,b,t])=>{const el=document.createElement('div');el.className='f out';el.innerHTML=`<i style="background:${c}">${ic}</i><div><b>${b}</b><p>${t}</p></div>`;box.appendChild(el);requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.remove('out')))})},R?0:250)}
$('.tx[role=button]').forEach(t=>t.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t.click()}}));
$('.tx').forEach(t=>t.addEventListener('click',()=>{const name=t.childNodes[t.childNodes.length-2].textContent.trim();if(!D[name])return;$('.tx').forEach(x=>x.classList.remove('on'));t.classList.add('on');show(name)}));
// segmented control with sliding pill
const seg=document.querySelector('.seg'),pill=document.createElement('i');pill.className='pill';seg.prepend(pill);
const place=s=>{pill.style.left=s.offsetLeft+'px';pill.style.width=s.offsetWidth+'px'};
$('span',seg).forEach(s=>s.addEventListener('click',()=>{$('span',seg).forEach(x=>x.classList.remove('on'));s.classList.add('on');place(s)}));
requestAnimationFrame(()=>place(seg.querySelector('.on')));
// bars fill from zero when visible
const bars=$('.pb s');bars.forEach(b=>{b.dataset.w=b.style.width;b.style.width='0'});
const bo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.w;bo.unobserve(e.target)}}),{threshold:.6});bars.forEach(b=>bo.observe(b));
// schedule switches
$('.sw').forEach(s=>s.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();s.click()}}));
$('.sw').forEach(s=>s.addEventListener('click',()=>{s.classList.toggle('on');s.setAttribute('aria-checked',s.classList.contains('on'));s.previousElementSibling.textContent=s.classList.contains('on')?'Active':'Paused'}));
})();
