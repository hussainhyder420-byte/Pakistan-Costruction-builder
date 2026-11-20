/* ===== FIREBASE: paste your keys below to enable Firestore. Leave apiKey empty to use localStorage (works out of the box). ===== */
const firebaseConfig={
  apiKey: "AIzaSyCDdbwCs1TE6pmcPniiJrw7TV5mGYCfY5o",
  authDomain: "pakistan-construction-builder.firebaseapp.com",
  projectId: "pakistan-construction-builder",
  storageBucket: "pakistan-construction-builder.firebasestorage.app",
  messagingSenderId: "345813999484",
  appId: "1:345813999484:web:b9475e8e23918cf03ecef9"
};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const E=s=>String(s??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const PAGE=document.body.dataset.page,WA='923048844922';
const art=t=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="800" height="500" fill="#0F172A"/><g fill="#D97706" fill-opacity=".35"><rect x="120" y="170" width="140" height="330"/><rect x="290" y="90" width="190" height="410"/><rect x="510" y="210" width="170" height="290"/></g><text x="400" y="460" text-anchor="middle" font-family="Arial" font-size="30" fill="#fff">${E(t)}</text></svg>`);
const U=i=>`https://images.unsplash.com/${i}?w=900&q=70`;
const mk=(id,title,category,city,area,specs,status,desc,img,d)=>({id,title,category,city,area,specs,status,price:'',desc,imgs:[U(img)],created:d});
const SEED=[
mk('p1','Hussain Arcade','Commercial','Sukkur','Sukkur','Mixed-use plaza','Completed','Commercial and mixed-use plaza with prime retail frontage in Sukkur.','photo-1486406146926-c627a92ad1ab','2026-01-05'),
mk('p2','Habib Tower','Multi-Story Buildings','Sukkur','Sukkur','Multi-story commercial and residential tower','Available for Sale','Multi-story tower combining commercial shops and residential apartments.','photo-1545324418-cc1a3fa10c00','2026-01-06'),
mk('p3','Ghanta Ghar Medicine Market Shops','Shops & Plazas','Sukkur','Ghanta Ghar, Sukkur','Commercial retail shops','Available for Sale','Retail shops in the Ghanta Ghar medicine market, a high-footfall trading zone.','photo-1441986300917-64674bd600d8','2026-01-07'),
mk('p4','Bandar Road Commercial Building','Multi-Story Buildings','Sukkur','Bandar Road, Sukkur','Ground floor + 3 floors + rooftop','Completed','Commercial building with ground floor, three upper floors and a usable rooftop on Bandar Road.','photo-1460317442991-0ec209397118','2026-01-08'),
mk('p5','Sukkur Township Bungalows','Residential','Sukkur','Sector 3-4, Sukkur Township','Modern double-story bungalows','Available for Sale','Modern double-story residential bungalows in Sukkur Township, Sector 3-4.','photo-1564013799919-ab600027ffc6','2026-01-09')];
const SV=[['🏪','Commercial Shops','Prime-location retail and wholesale market shops.','Shop',['Busy market locations','Retail and wholesale ready','Strong rental potential']],['🏡','Houses & Bungalows','Modern single and double-story family homes.','House/Bungalow',['Single and double story','Quality finishing','Family-friendly sectors']],['🏢','Multi-Story Buildings','Full plaza and multi-floor structures, commercial and residential.','Building',['Full plazas and towers','Investor friendly','Rooftop options']],['🏙️','Apartments & Flats','Affordable and executive flats in prime city zones.','Flat',['Affordable to executive','Prime zones','Ready or under construction']]];
const PR=[['Meet Client','Understand your property requirements, location preference and budget.'],['Show Site','Guided on-site visit to inspect construction quality and surroundings.'],['Tell Demand','Transparent pricing, clear payment terms and zero hidden charges.'],['Win Trust','Documentation verification, structural assurance and proven track record.'],['Done Deal','Smooth, hassle-free property transfer and handover.']];
const LOGO=`<svg width="250" height="46" viewBox="0 0 250 46" role="img" aria-label="Pakistan Construction Builder"><rect width="46" height="46" rx="9" fill="#0F172A"/><path d="M6 40V22h8V12h9v28zm19 0V8h8v10h7v22z" fill="#F59E0B"/><path d="M9 26h2m-2 5h2m11-14h2m-2 5h2m7-10h2m-2 5h2m6 7h2m-2 5h2" stroke="#0F172A" stroke-width="2"/><text x="54" y="22" font-family="Plus Jakarta Sans,Arial" font-weight="800" font-size="21" fill="${PAGE==='admin'?'#fff':'#0F172A'}">PCB</text><text x="54" y="39" font-family="Inter,Arial" font-weight="600" font-size="10.5" fill="#D97706" letter-spacing=".5">PAKISTAN CONSTRUCTION BUILDER</text></svg>`;

/* ===== Data layer: Firestore if configured, else localStorage (shared by all pages) ===== */
let db=null,loading=true,M={p:[],q:[]};
const ls=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};
const lsw=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}};
const D={
async init(){
 if(firebaseConfig.apiKey){try{
  const fb=async()=>{
   for(const f of ['app','firestore'])await new Promise((r,j)=>{const s=document.createElement('script');s.src=`https://www.gstatic.com/firebasejs/10.12.2/firebase-${f}-compat.js`;s.onload=r;s.onerror=()=>j(new Error('Could not load Firebase scripts'));document.head.appendChild(s)});
   firebase.initializeApp(firebaseConfig);const d=firebase.firestore();d.settings({experimentalAutoDetectLongPolling:true,merge:true});
   let s=await d.collection('projects').get();
   if(s.empty){for(const p of SEED)await d.collection('projects').doc(p.id).set(p);s=await d.collection('projects').get()}
   return{d,p:s.docs.map(x=>x.data()),q:(await d.collection('inquiries').get()).docs.map(x=>x.data())}};
  const r=await Promise.race([fb(),new Promise((_,j)=>setTimeout(()=>j(new Error('Firebase timed out. Create the Firestore database and publish its rules.')),15000))]);
  db=r.d;M.p=r.p;M.q=r.q;lsw('pcb_cache',M.p);return}catch(e){console.warn('Firebase failed, using localStorage',e);window.fbErr=e.message;db=null}}
 let p=ls('pcb_projects',null);if(!p){p=SEED;lsw('pcb_projects',p)}M.p=p;M.q=ls('pcb_inquiries',[])},
async saveP(p){const i=M.p.findIndex(x=>x.id===p.id);i>-1?M.p[i]=p:M.p.push(p);if(db){await db.collection('projects').doc(p.id).set(p);lsw('pcb_cache',M.p)}else if(!lsw('pcb_projects',M.p))throw new Error('Browser storage is full. Use smaller or fewer images.')},
async delP(id){M.p=M.p.filter(x=>x.id!==id);db?(await db.collection('projects').doc(id).delete(),lsw('pcb_cache',M.p)):lsw('pcb_projects',M.p)},
async saveQ(q){const i=M.q.findIndex(x=>x.id===q.id);i>-1?M.q[i]=q:M.q.push(q);db?await db.collection('inquiries').doc(q.id).set(q):lsw('pcb_inquiries',M.q)},
async delQ(id){M.q=M.q.filter(x=>x.id!==id);db?await db.collection('inquiries').doc(id).delete():lsw('pcb_inquiries',M.q)}};

function wa(t,n=WA){window.open('https://wa.me/'+n+'?text='+encodeURIComponent(t),'_blank','noopener')}
const cover=p=>(p.imgs&&p.imgs[0])||art(p.title);
const stc=s=>s==='Completed'?'':' u';

/* ===== Shared layout (public pages) ===== */
function layout(){
 const L=[['index.html','home','Home'],['properties.html','properties','Properties'],['projects.html','projects','Projects'],['about.html','about','About & Process'],['contact.html','contact','Contact']];
 $('#hdr').innerHTML=`<header><div class="w nav"><a href="index.html">${LOGO}</a><nav id="nv">${L.map(l=>`<a href="${l[0]}" class="${l[1]===PAGE?'on':''}">${l[2]}</a>`).join('')}<a class="btn s" href="tel:03048844922">📞 Call / WhatsApp</a></nav><button id="mt" aria-label="Menu">☰</button></div></header>`;
 $('#ftr').innerHTML=`<footer><div class="w"><div class="fl"><div><h3>Pakistan Construction Builder</h3>13+ years building in Sukkur &amp; Karachi. 50+ projects delivered.</div><div><h3>Contact</h3><a href="tel:03048844922">0304-8844922</a><br><a href="tel:03193851608">0319-3851608</a><br>MVRC+VGJ, Shahi Bazar, Sukkur, Sindh</div><div><h3>Pages</h3>${L.map(l=>`<a href="${l[0]}">${l[2]}</a><br>`).join('')}</div></div><div class="cp" id="cp">© 2026 Pakistan Construction Builder. All rights reserved.</div></div><button id="lk" aria-label="Admin" onclick="location.href='admin.html'">🔒</button></footer>
 <div id="wa"><div id="wm"><a href="https://wa.me/923048844922" target="_blank" rel="noopener">💬 WhatsApp 0304-8844922</a><a href="https://wa.me/923193851608" target="_blank" rel="noopener">💬 WhatsApp 0319-3851608</a></div><button id="wb" aria-label="WhatsApp">💬</button></div>
 <div class="md" id="md"><div class="mb"><button class="x" aria-label="Close">×</button><div id="mc"></div></div></div>`;
 $('#mt').onclick=()=>$('#nv').classList.toggle('on');$('#wb').onclick=()=>$('#wm').classList.toggle('on');
 $('#md .x').onclick=()=>$('#md').classList.remove('on');$('#md').onclick=e=>{if(e.target.id==='md')$('#md').classList.remove('on')};
 let c=0,t;$('#cp').onclick=()=>{c++;clearTimeout(t);t=setTimeout(()=>c=0,700);if(c>=3)location.href='admin.html'}}

/* ===== Public renderers ===== */
const svc=det=>SV.map(s=>`<div class="card"><div class="ic">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p>${det?`<ul>${s[4].map(x=>`<li>${x}</li>`).join('')}</ul>`:''}<button class="btn s" data-wa="Assalam o Alaikum, I am interested in: ${s[3]}. Please share available options and pricing.">Inquire Now</button></div>`).join('');
const proc=()=>PR.map((s,i)=>`<div class="step"><i>${i+1}</i><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('');
const cards=L=>L.length?L.map(p=>`<div class="card pj"><img src="${E(cover(p))}" alt="${E(p.title)}" loading="lazy" onerror="this.onerror=null;this.src='${art(p.title)}'"><div><span class="st${stc(p.status)}">${E(p.status)}</span><span class="tag">${E(p.category)}</span><h3>${E(p.title)}</h3><p style="margin:0 0 12px;font-size:14px">📍 ${E(p.area)}${p.city&&!String(p.area).includes(p.city)?', '+E(p.city):''}</p><button class="btn s" data-v="${E(p.id)}">View Full Details</button></div></div>`).join(''):`<p>${loading?'Loading projects...':'No projects found.'}</p>`;
function detailHTML(p){const im=p.imgs&&p.imgs.length?p.imgs:[art(p.title)];
 return `<img class="d" id="big" src="${E(im[0])}" alt="">${im.length>1?`<div class="th">${im.map(i=>`<img src="${E(i)}" alt="" data-big>`).join('')}</div>`:''}<span class="st${stc(p.status)}">${E(p.status)}</span><span class="tag">${E(p.category)}</span><h2>${E(p.title)}</h2><p><b>📍 Location:</b> ${E(p.area)}, ${E(p.city)}<br><b>📐 Specifications:</b> ${E(p.specs||'Contact us')}<br><b>💰 Price / Demand:</b> ${E(p.price||'Contact for price')}<br><b>Added:</b> ${E(p.created||'-')}</p><p>${E(p.desc)}</p>`}
function showDetail(id,admin){const p=M.p.find(x=>x.id===id);if(!p)return;
 $('#mc').innerHTML=detailHTML(p)+(admin?'':`<button class="btn g" id="dw" style="width:100%">Inquire About This Property on WhatsApp</button>`);
 $$('[data-big]').forEach(i=>i.onclick=()=>$('#big').src=i.src);
 if(!admin)$('#dw').onclick=()=>wa(`Assalam o Alaikum, I am interested in "${p.title}" (${p.area}, ${p.city}). Please share details and pricing.`);
 $('#md').classList.add('on')}
function pub(){
 const top=[...M.p].sort((a,b)=>(a.status==='Completed')-(b.status==='Completed')).slice(0,3);
 const S={svc:()=>svc(false),svcd:()=>svc(true),proc,top3:()=>cards(top),all:()=>cards(M.p)};
 $$('[data-slot]').forEach(e=>{const k=e.dataset.slot;if(S[k])e.innerHTML=S[k]()});
 const tb=$('[data-slot=tabs]');
 if(tb){let cat='All';const go=()=>{$('[data-slot=all]').innerHTML=cards(M.p.filter(p=>cat==='All'||p.category===cat));bind()};
  tb.innerHTML=['All','Commercial','Residential','Multi-Story Buildings','Shops & Plazas'].map(c=>`<button class="${c==='All'?'on':''}">${c}</button>`).join('');
  $$('button',tb).forEach(b=>b.onclick=()=>{cat=b.textContent;$$('button',tb).forEach(x=>x.classList.toggle('on',x===b));go()})}
 bind();
 const f=$('#iq');if(f)f.onsubmit=async e=>{e.preventDefault();const q={id:'q'+Date.now(),name:$('#qn').value.trim(),phone:$('#qp').value.trim(),city:$('#qc').value,type:$('#qi').value,msg:$('#qm').value.trim(),date:new Date().toLocaleString(),contacted:false};
  try{await D.saveQ(q)}catch(x){}wa(`*New Property Inquiry*\nName: ${q.name}\nPhone: ${q.phone}\nCity: ${q.city}\nInterest: ${q.type}\nMessage: ${q.msg||'-'}`);f.reset()};
 if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});$$('.rv').forEach(x=>io.observe(x))}else $$('.rv').forEach(x=>x.classList.add('in'))}
function bind(){$$('[data-v]').forEach(b=>b.onclick=()=>showDetail(b.dataset.v));$$('[data-wa]').forEach(b=>b.onclick=e=>{e.preventDefault();wa(b.dataset.wa,b.dataset.n||WA)})}

/* ===== Admin ===== */
const AU='Hussain Hyder',AP='HussainHussainHussain123';
let imgs=[],view='ov',editId=null;
function admin(){
 $$('[data-logo]').forEach(e=>e.innerHTML=LOGO);
 let ok=false;const on=()=>{if(ok)return true;try{return sessionStorage.getItem('pcb_admin')==='1'}catch(e){return false}};
 const gate=()=>{$('#login').hidden=on();$('#adm').hidden=!on();if(on())nav('ov')};
 $('#lf').onsubmit=e=>{e.preventDefault();if($('#lu').value.trim()===AU&&$('#lp').value===AP){ok=true;try{sessionStorage.setItem('pcb_admin','1')}catch(x){}$('#lp').value='';$('#le').textContent='';gate()}else $('#le').textContent='Incorrect username or password.'};
 $('#sb').innerHTML=`<div style="margin-bottom:14px">${LOGO}</div>${[['ov','📊 Dashboard Overview'],['list','🏗️ All Projects'],['form','➕ Add New Project'],['inq','📩 Customer Inquiries']].map(x=>`<button data-n="${x[0]}">${x[1]}</button>`).join('')}<a href="index.html" target="_blank">🌐 View Live Website</a><button id="lo">🚪 Logout</button>`;
 $$('#sb [data-n]').forEach(b=>b.onclick=()=>{if(b.dataset.n==='form')editId=null;nav(b.dataset.n)});
 $('#lo').onclick=()=>{ok=false;try{sessionStorage.removeItem('pcb_admin')}catch(x){}gate()};
 gate()}
function nav(v){view=v;$$('#sb [data-n]').forEach(b=>b.classList.toggle('on',b.dataset.n===v));({ov,list,form,inq})[v]()}
const mn=h=>$('#mn').innerHTML=h;
function ov(){const P=M.p,n=f=>P.filter(f).length,act=[...P.map(p=>({d:p.created||'',t:'Project',x:p.title})),...M.q.map(q=>({d:q.date,t:'Inquiry',x:q.name+' ('+q.type+')'}))].slice(-6).reverse();
 mn(`<h2>Dashboard Overview</h2><div class="kp"><div><b>${P.length}</b>Total Projects</div><div><b>${n(p=>p.status==='Completed')}</b>Completed</div><div><b>${n(p=>p.status!=='Completed')}</b>Available / Under Construction</div><div><b>${n(p=>p.city==='Sukkur')}</b>Sukkur Projects</div><div><b>${n(p=>p.city==='Karachi')}</b>Karachi Projects</div><div><b>${M.q.length}</b>Customer Inquiries</div></div><h3>Recent Activity</h3><div class="sc"><table><tr><th>Date</th><th>Type</th><th>Detail</th></tr>${act.map(a=>`<tr><td>${E(a.d)}</td><td>${a.t}</td><td>${E(a.x)}</td></tr>`).join('')||'<tr><td colspan=3>Nothing yet.</td></tr>'}</table></div><p style="color:var(--m);font-size:14px">Data source: ${db?'Firebase Firestore':'Browser localStorage'}${window.fbErr?' (Firebase error: '+E(window.fbErr)+')':''}</p>`)}
function list(){mn(`<h2>All Projects</h2><div class="tb"><input id="s" placeholder="Search projects..."><select id="f"><option value="">All statuses</option><option>Completed</option><option>Available for Sale</option><option>Under Construction</option></select><select id="fc"><option value="">All cities</option><option>Sukkur</option><option>Karachi</option></select></div><div class="sc" id="tbl"></div>`);
 const r=()=>{const s=$('#s').value.toLowerCase(),f=$('#f').value,c=$('#fc').value,L=M.p.filter(p=>(!s||(p.title+p.area).toLowerCase().includes(s))&&(!f||p.status===f)&&(!c||p.city===c));
  $('#tbl').innerHTML=`<table><tr><th></th><th>Title</th><th>Category</th><th>Location</th><th>Status</th><th></th></tr>${L.map(p=>`<tr><td><img src="${E(cover(p))}" alt=""></td><td>${E(p.title)}</td><td>${E(p.category)}</td><td>${E(p.area)}, ${E(p.city)}</td><td>${E(p.status)}</td><td style="white-space:nowrap"><button class="btn s n" data-d="${E(p.id)}">View</button> <button class="btn s" data-e="${E(p.id)}">Edit</button> <button class="btn s r" data-x="${E(p.id)}">Delete</button></td></tr>`).join('')||'<tr><td colspan=6>No matches.</td></tr>'}</table>`;
  $$('[data-d]').forEach(b=>b.onclick=()=>showDetail(b.dataset.d,true));
  $$('[data-e]').forEach(b=>b.onclick=()=>{editId=b.dataset.e;nav('form')});
  $$('[data-x]').forEach(b=>b.onclick=async()=>{const p=M.p.find(x=>x.id===b.dataset.x);if(confirm(`Delete "${p.title}"? This removes it from the live website too.`)){await D.delP(p.id);r()}})};
 ['s','f','fc'].forEach(i=>$('#'+i).oninput=r);r()}
function form(){const p=M.p.find(x=>x.id===editId)||{},o=(a,v)=>a.map(x=>`<option${x===v?' selected':''}>${x}</option>`).join('');imgs=[...(p.imgs||[])];
 mn(`<h2>${editId?'Edit Project':'Add New Project'}</h2><form class="card" id="pf"><div class="fg"><div><label>Project Title</label><input id="pt" required value="${E(p.title)}"></div><div><label>Category</label><select id="pc">${o(['Commercial','Residential','Multi-Story Buildings','Shops & Plazas'],p.category)}</select></div><div><label>City</label><select id="pcy">${o(['Sukkur','Karachi'],p.city)}</select></div><div><label>Exact Area / Address</label><input id="pa" required value="${E(p.area)}"></div><div><label>Status</label><select id="ps">${o(['Completed','Available for Sale','Under Construction'],p.status)}</select></div><div><label>Price / Demand Note (optional)</label><input id="pp" value="${E(p.price)}"></div></div><label>Building Specifications (floors, size, features)</label><input id="pz" value="${E(p.specs)}"><label>Detailed Description</label><textarea id="pd" rows="4">${E(p.desc)}</textarea><label>Upload photos (first one is the cover)</label><input type="file" id="pfl" accept="image/*" multiple><label>Or paste image URLs (one per line)</label><textarea id="pu" rows="2"></textarea><button type="button" class="btn s l" id="pau">Add URLs</button><div class="th" id="pv"></div><div class="err" id="pe"></div><button class="btn">Save Project</button></form>`);
 const pv=()=>{$('#pv').innerHTML=imgs.map((s,i)=>`<img src="${E(s)}" alt="" title="Click to remove" data-i="${i}">`).join('');$$('#pv img').forEach(im=>im.onclick=()=>{imgs.splice(+im.dataset.i,1);pv()})};pv();
 $('#pau').onclick=()=>{$('#pu').value.split('\n').map(s=>s.trim()).filter(Boolean).forEach(u=>imgs.push(u));$('#pu').value='';pv()};
 $('#pfl').onchange=e=>[...e.target.files].forEach(f=>{const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,900/i.width),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);imgs.push(c.toDataURL('image/jpeg',.7));pv()};i.src=r.result};r.readAsDataURL(f)});
 $('#pf').onsubmit=async e=>{e.preventDefault();$('#pau').click();const q={id:editId||'p'+Date.now(),title:$('#pt').value.trim(),category:$('#pc').value,city:$('#pcy').value,area:$('#pa').value.trim(),status:$('#ps').value,price:$('#pp').value.trim(),specs:$('#pz').value.trim(),desc:$('#pd').value.trim(),imgs:[...imgs],created:p.created||new Date().toISOString().slice(0,10)};
  try{await D.saveP(q);editId=null;nav('list')}catch(x){$('#pe').textContent=x.message}}}
function inq(){const Q=[...M.q].reverse();mn(`<h2>Customer Inquiries</h2><div class="sc">${Q.length?`<table><tr><th>Date</th><th>Name</th><th>Phone</th><th>City</th><th>Type</th><th>Message</th><th>Status</th><th></th></tr>${Q.map(q=>`<tr><td>${E(q.date)}</td><td>${E(q.name)}</td><td>${E(q.phone)}</td><td>${E(q.city)}</td><td>${E(q.type)}</td><td>${E(q.msg)}</td><td>${q.contacted?'✅ Contacted':'🆕 New'}</td><td style="white-space:nowrap"><button class="btn s g" data-r="${q.id}">Reply on WhatsApp</button> <button class="btn s n" data-c="${q.id}">${q.contacted?'Mark New':'Mark Contacted'}</button> <button class="btn s r" data-x="${q.id}">Delete</button></td></tr>`).join('')}</table>`:'<p style="padding:16px">No inquiries yet.</p>'}</div>`);
 $$('[data-r]').forEach(b=>b.onclick=()=>{const q=M.q.find(x=>x.id===b.dataset.r);let n=q.phone.replace(/\D/g,'');if(n[0]==='0')n='92'+n.slice(1);wa(`Assalam o Alaikum ${q.name}, thank you for your ${q.type} inquiry with Pakistan Construction Builder.`,n)});
 $$('[data-c]').forEach(b=>b.onclick=async()=>{const q=M.q.find(x=>x.id===b.dataset.c);q.contacted=!q.contacted;await D.saveQ(q);inq()});
 $$('[data-x]').forEach(b=>b.onclick=async()=>{if(confirm('Delete this inquiry?')){await D.delQ(b.dataset.x);inq()}})}

if(PAGE==='admin'){admin();D.init().then(()=>{if(!$('#adm').hidden)nav(view)})}else{layout();M.p=ls('pcb_cache',null)||ls('pcb_projects',null)||[];pub();D.init().then(()=>{loading=false;if(window.fbErr)$('#hdr').insertAdjacentHTML('afterbegin','<div style="background:#fef3c7;color:#92400e;padding:6px;text-align:center;font-size:13px">Cloud database not connected ('+E(window.fbErr)+'). Showing local data.</div>');pub()})}
