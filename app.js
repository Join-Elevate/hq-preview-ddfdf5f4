(()=>{
const D=window.HQ,G=D.goal;const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const EP='M51 0H235V44H72L0 118V55Z M50 116H235V160H68L44 187V231H235V274H0V170Z';
const em=c=>`<svg viewBox="0 0 236 274" aria-hidden="true"><path d="${EP}" fill="${c||'#fff'}"/></svg>`;
const P={week:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',train:'<path d="M2 8l10-5 10 5-10 5z"/><path d="M6 10v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',rank:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',hist:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chev:'<path d="M9 6l6 6-6 6"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',flame:'<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.6 1 2.5 2 3 0-3.5-.5-6 1-8.5z"/>',pin:'<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',play:'<path d="M7 4v16l13-8z"/>'};
const ic=n=>`<svg class="i" viewBox="0 0 24 24">${P[n]}</svg>`;
const fmt=n=>Number(n).toLocaleString();const ini=n=>n.replace(/[^A-Za-z +&/]/g,'').split(/[ +&/]+/).filter(Boolean).map(w=>w[0]).join('').slice(0,2).toUpperCase();
const NOW=new Date();const T12=new Date();T12.setHours(12);
const dkey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const getLog=d=>JSON.parse(localStorage.getItem('hq-log-'+dkey(d))||'{}');const setLog=(d,o)=>localStorage.setItem('hq-log-'+dkey(d),JSON.stringify(o));
const weekDays=()=>{const m=new Date(T12);m.setDate(m.getDate()-((m.getDay()+6)%7));return[...Array(6)].map((_,i)=>{const x=new Date(m);x.setDate(m.getDate()+i);return x})};
const wkSum=k=>weekDays().reduce((a,d)=>a+(getLog(d)[k]||0),0);
const prog=JSON.parse(localStorage.getItem('hq-prog')||'{}');
const status=c=>{const s=new Date(c.start+'T00:00'),e=new Date(c.end+'T23:59');return T12<s?'Upcoming':T12>e?'Done':'Live'};
const stc={Live:'live',Upcoming:'up',Done:''};
const ring=(v,max,sz=60,sw=5)=>{const r=(sz-sw)/2,c=2*Math.PI*r;return `<svg viewBox="0 0 ${sz} ${sz}"><circle class="tk" cx="${sz/2}" cy="${sz/2}" r="${r}" stroke-width="${sw}" fill="none"/><circle class="ar" cx="${sz/2}" cy="${sz/2}" r="${r}" stroke-width="${sw}" fill="none" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-v/max)}"/></svg>`};
const seg=(id,opts,cur,cls='')=>`<div class="seg ${cls}" data-seg="${id}">${opts.map(([k,l])=>`<button data-v="${k}" class="${k===cur?'on':''}">${l}</button>`).join('')}<span class="pill"></span></div>`;
const TABS=[['week','My Week','week'],['training','Training','train'],['blitz','Blitzes','bolt'],['ranks','Ranks','rank'],['history','History','hist']];
const ST={per:localStorage.getItem('hq-per')||'wtd',line:'fiber',q:''};
const PER={today:'Today',wtd:'Week',mtd:'Month'};

/* counters */
const LOGK=[{k:'leads',l:'Leads',t:10},{k:'intros',l:'Intro calls',t:10},{k:'touch',l:'Retention touches',t:5},{k:'signed',l:'Reps signed',t:null},{k:'rday',l:'Recruiting day',t:1,wk:6,wide:true}];
const ctr=c=>{const v=getLog(T12)[c.k]||0,done=c.t&&v>=c.t,w=wkSum(c.k);
return `<div class="ctr ${c.wide?'wide':''} ${done?'done':''}" data-ctr="${c.k}"><button class="hit" data-inc="${c.k}" aria-label="Add one ${c.l}">
<span class="t">${c.l}${done?` <span class="badge">${ic('check')}${c.k==='rday'?'Logged':'Hit'}</span>`:''}</span>
<span class="n">${c.k==='rday'?(v?'Yes':'Tap'):v}${c.t&&c.k!=='rday'?`<small>/${c.t}</small>`:''}</span>
${c.t?`<div class="bar"><i data-w="${Math.min(100,v/c.t*100)}"></i></div>`:''}
<div class="wk">${c.k==='rday'?`${w} of ${c.wk} days this week`:c.t?`${w} of ${c.t*6} this week`:`${w} this week · no target set`}</div></button>
<div class="pm"><button data-step="-1" data-k="${c.k}" aria-label="Minus one">${ic('minus')}</button>${c.k==='rday'?'':`<button data-step="1" data-k="${c.k}" aria-label="Plus one">${ic('plus')}</button>`}</div></div>`};
const streak=()=>{let n=0;const d=new Date(T12);if(!(getLog(d).leads>=10))d.setDate(d.getDate()-1);for(let i=0;i<60;i++){if(d.getDay()===0){d.setDate(d.getDate()-1);continue}if((getLog(d).leads||0)>=10){n++;d.setDate(d.getDate()-1)}else break}return n};
const streakCard=()=>{const s=streak();return `<div class="card pad" id="streak"><div class="streak"><span class="fl">${ic('flame')}</span><div><b>${s?`${s}-day streak`:'Start a streak'}</b><small>${s?'Days in a row hitting 10 leads (Sundays skipped)':'Hit 10 leads today to start one'}</small></div></div>
<div class="days">${weekDays().map(d=>{const o=getLog(d);return `<div class="${dkey(d)===dkey(T12)?'td':''}"><b class="${(o.leads||0)>=10?'on':''}"></b>${d.toLocaleDateString('en-US',{weekday:'narrow'})}</div>`}).join('')}</div></div>`};

/* views */
const V={
week(){const behind=G.mtd-G.cumTargetAsOf;return `<section class="hero"><div class="ph"></div><div class="in"><div class="eyebrow">${NOW.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</div><h1 class="display">My <em>week.</em></h1><p>Six days. Ten leads. Ten intros. Five touches.</p></div></section>
<div class="wrap"><div class="card pad glass tapc" data-sheet="goal"><div class="lab">November fiber apps<span class="r">thru ${G.asOfDate}</span></div>
<div class="num" style="margin:14px 0 18px" data-count="${G.mtd}">0<small>/ ${fmt(G.target)}</small></div>
<div class="bar"><i data-w="${G.mtd/G.target*100}"></i><b style="left:${G.cumTargetAsOf/G.target*100}%"></b></div>
<div class="stats3"><div><b>${G.cumTargetAsOf}</b><small>Pace target</small></div><div><b class="${behind<0?'bad':'ok'}">${behind<0?behind:'+'+behind}</b><small>vs pace</small></div><div><b>${fmt(G.target-G.mtd)}</b><small>To go</small></div></div></div>
<div class="sec"><div class="sh"><h2>Today</h2><span>Tap to log · this device</span></div><div class="ctrs">${LOGK.map(ctr).join('')}</div></div>
<div class="sec">${streakCard()}</div>
<p class="foot">Apps from the November forecast sheet (as of ${D.asOf.apps}). Counters are logged on this device and reset daily. Nidus isn't connected.</p></div>`},

training(){const all=D.academy.flatMap(t=>t.modules.map(m=>t.track+'|'+m.t));const d=all.filter(k=>prog[k]).length;
return `<div class="ph2"><div class="eyebrow">Academy</div><h1 class="display">Training.</h1><p>Tap a lesson, then mark it done. Saved on this device.</p></div>
<div class="wrap"><div class="card pad" style="display:flex;align-items:center;gap:18px;margin-top:14px"><div class="ring">${ring(d,all.length)}<b>${Math.round(d/all.length*100)}%</b></div><div><b style="font-size:17px;letter-spacing:-.02em">${d} of ${all.length} lessons</b><div class="mut" style="font-size:13px">${all.length-d?`${all.length-d} to go across ${D.academy.length} tracks`:'Everything complete'}</div></div></div>
${D.academy.map(t=>{const n=t.modules.filter(m=>prog[t.track+'|'+m.t]).length;return `<div class="sec"><div class="sh"><h2>${t.track}</h2><span>${n}/${t.modules.length}</span></div><div class="card">
${t.modules.map((m,i)=>{const k=t.track+'|'+m.t;return `<div class="trn ${prog[k]?'done':''}" data-lesson="${k}"><span class="th">${prog[k]?ic('check'):String(i+1).padStart(2,'0')}</span><div class="tx"><b>${m.t}</b><span>${m.d||'Lesson'}</span></div><span class="go">${ic('chev')}</span></div>`}).join('')}</div></div>`}).join('')}</div>`},

blitz(){const q=ST.q.toLowerCase();const L=ST.line==='fiber'?D.crews.filter(c=>!q||(c.leader+' '+(c.location||'')+' '+c.window).toLowerCase().includes(q)):[];
const heads=D.crews.reduce((a,c)=>a+c.heads,0);
return `<div class="ph2"><div class="eyebrow">November</div><h1 class="display">Blitzes.</h1><p>${D.crews.length} fiber crews · ${heads} reps rostered · ${fmt(D.crews.reduce((a,c)=>a+c.forecast,0))} forecast apps</p></div>
<div class="wrap" style="margin-top:14px">${seg('line',[['fiber','Fiber'],['pest','Pest']],ST.line,'gold')}
<label class="search">${ic('search')}<input id="q" placeholder="Search crew, city, dates" value="${ST.q.replace(/"/g,'&quot;')}" autocomplete="off"></label>
<div class="card" style="margin-top:14px" id="bzList">${ST.line==='pest'?`<div class="empty"><b>Not tracked yet</b>No pest blitz data is in the Elevate Fiber sheets.</div>`:L.length?L.map(bzRow).join(''):`<div class="empty"><b>No matches</b>Try another search.</div>`}</div>
<p class="foot">${D.dropped.map(d=>`${d.leader}: ${d.note}.`).join(' ')} Rosters from the Elevate Fiber sheet (${D.asOf.crews}).</p></div>`},

ranks(){const per=ST.per;const L=[...D.reps].sort((a,b)=>b[per]-a[per]||a.name.localeCompare(b.name));
const rk=L.map((r,i)=>1+L.findIndex(x=>x[per]===r[per]));const tie=r=>rk.filter(x=>x===r).length>1;const lbl=r=>(tie(r)?'T-':'')+r;
const med=r=>r<=3?'m'+r:'';const top=L.slice(0,3);const order=[1,0,2].filter(i=>top[i]);
return `<div class="ph2"><div class="eyebrow">Fiber apps</div><h1 class="display">Ranks.</h1><p>As of ${D.asOf.apps} · team ${D.repTotals[per]} ${PER[per].toLowerCase()==='today'?'today':'this '+PER[per].toLowerCase()}</p></div>
<div class="wrap" style="margin-top:14px"><div class="wkp">${['Nov 2 – 7','Oct 26 – 31','Oct 19 – 24'].map((w,i)=>`<button class="${i===0?'on':''}" ${i?'disabled':''}>${w}<small>${i?'Not tracked yet':'This week'}</small></button>`).join('')}</div>
${seg('per',Object.entries(PER),ST.per)}
<div class="podium" style="margin-top:22px">${order.map(i=>{const r=top[i],R=rk[i];return `<div class="pd ${i===0?'p1':''} ${med(R)}" data-rep="${r.name}"><div class="av">${ini(r.name)}</div><div class="stand"><small>${lbl(R)}</small><b>${r[per]}</b><span>${r.name.split(' ')[0]}</span></div></div>`}).join('')}</div>
<div class="card" style="border-radius:0 0 24px 24px;border-top:0">${L.map((r,i)=>`<div class="lr" data-rep="${r.name}"><span class="rk">${lbl(rk[i])}</span><span class="av ${med(rk[i])}">${ini(r.name)}</span><div class="tx"><b>${r.name}</b><small>${r.today} today · ${r.wtd} week · ${r.mtd} month</small></div><span class="v">${r[per]}</span></div>`).join('')}</div>
<p class="foot">Ties share a rank. Source: Fiber Leaderboard Live Data. Earlier weeks aren't in the sheet yet.</p></div>`},

history(){const days=[];for(let i=1;i<=30;i++){const d=new Date(T12);d.setDate(d.getDate()-i);const o=getLog(d);const s=(o.leads||0)+(o.intros||0)+(o.touch||0)+(o.signed||0);if(s||o.rday)days.push({d,o})}
const ev=[{d:'Nov 8',t:'Next wave starts',s:'5 crews · 49 reps (Johannes, Pabu, Jake Toth + Jaleel, Mason & JJ, Charly)',c:''},{d:'Nov 5',t:'Austin + Avery crew fell out',s:'9 heads and 151 forecast apps removed; standard raised to 2.0+ apps/rep/day',c:'r'},
...G.daily.slice().reverse().map(x=>({d:x.d,t:`${x.actual} apps`,s:`Target ${x.target} · ${x.actual>=x.target?'on pace':(x.target-x.actual)+' short'}`,c:x.actual>=x.target?'g':'r',v:x.actual}))];
return `<div class="ph2"><div class="eyebrow">Season log</div><h1 class="display">History.</h1><p>What happened, day by day.</p></div>
<div class="wrap" style="margin-top:14px"><div class="sec" style="margin-top:6px"><div class="sh"><h2>Fiber · November</h2><span>Forecast sheet</span></div><div class="card tl">${ev.map(e=>`<div class="ev ${e.c}"><span class="dt"><i></i></span><div class="tx"><small style="margin:0 0 2px;color:var(--dim)">${e.d}</small><b>${e.t}</b><small>${e.s}</small></div></div>`).join('')}</div></div>
<div class="sec"><div class="sh"><h2>My log</h2><span>This device</span></div><div class="card">${days.length?`<div class="tl">${days.map(({d,o})=>`<div class="ev ${(o.leads||0)>=10?'g':''}"><span class="dt"><i></i></span><div class="tx"><small style="margin:0 0 2px;color:var(--dim)">${d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</small><b>${o.leads||0} leads · ${o.intros||0} intros · ${o.touch||0} touches</b><small>${o.signed||0} signed${o.rday?' · recruiting day':''}</small></div></div>`).join('')}</div>`:`<div class="empty"><b>Nothing logged yet</b>Days you log on My Week show up here.</div>`}</div></div></div>`}
};
const MAXH=Math.max(...D.crews.map(c=>c.spots||c.heads));const bzRow=c=>{const s=status(c);const cap=c.spots||null;return `<div class="bz" data-crew="${c.leader}"><div class="h"><span class="av">${ini(c.leader)}</span><b>${c.leader}</b><span class="st ${stc[s]}"><i></i>${s}</span></div>
<div class="meta"><span>${c.window}</span><span>·</span><span>${c.location||'Location not listed'}</span></div>
<div class="bar"><i data-w="${cap?c.heads/cap*100:c.heads/MAXH*100}" style="${cap?'':'opacity:.55'}"></i></div>
<div class="rb"><span><b>${c.heads}</b>${cap?` / ${cap} rostered`:' rostered'}</span><span>${cap?`<b class="gold">${cap-c.heads}</b> spots open`:'Capacity not listed'}</span></div></div>`};

/* sheets */
const sheets={
goal:()=>`<div class="sh-h"><span class="av m1">${em('#1a1405').replace('<svg','<svg style="width:20px;height:24px"')}</span><div><h3>November goal</h3><p>${G.label} · ${G.standard}</p></div></div>
<div class="tiles"><div class="tile"><small>Apps MTD</small><b>${G.mtd}</b></div><div class="tile"><small>Goal</small><b>${fmt(G.target)}</b></div></div>
<div class="rows">${G.daily.map(d=>`<div class="row"><span>${d.d}</span><span class="v">${d.actual} <span class="dim">/ ${d.target}</span></span></div>`).join('')}${G.checkpoints.map(c=>`<div class="row"><span class="mut">Checkpoint ${c.d}</span><span class="v">${fmt(c.t)}</span></div>`).join('')}</div>`,
rep:n=>{const r=D.reps.find(x=>x.name===n);const rk=k=>1+[...D.reps].sort((a,b)=>b[k]-a[k]).findIndex(x=>x[k]===r[k]);return `<div class="sh-h"><span class="av">${ini(r.name)}</span><div><h3>${r.name}</h3><p>Fiber rep · as of ${D.asOf.apps}</p></div></div>
<div class="tiles">${Object.entries(PER).map(([k,l])=>`<div class="tile"><small>${l} · rank ${rk(k)}</small><b>${r[k]}</b></div>`).join('')}<div class="tile"><small>Share of team (month)</small><b>${Math.round(r.mtd/D.repTotals.mtd*100)}%</b></div></div>
<div class="rows"><div class="row"><span class="mut">Crew</span><span class="v"><span class="nt">Not tracked yet</span></span></div><div class="row"><span class="mut">Nidus signing</span><span class="v"><span class="nt">Not connected</span></span></div></div>`},
crew:n=>{const c=D.crews.find(x=>x.leader===n);const s=status(c);return `<div class="sh-h"><span class="av">${ini(c.leader)}</span><div><h3>${c.leader}</h3><p><span class="st ${stc[s]}"><i></i>${s}</span> &nbsp;${c.window}</p></div></div>
<div class="tiles"><div class="tile"><small>Rostered</small><b>${c.heads}${c.spots?`<span class="dim" style="font-size:16px"> / ${c.spots}</span>`:''}</b></div><div class="tile"><small>Forecast apps</small><b>${c.forecast}</b></div><div class="tile"><small>Knock days</small><b>${c.knockDays}</b></div><div class="tile"><small>Rep-days</small><b>${c.repDays}</b></div></div>
<div class="rows"><div class="row">${ic('pin')}<span>${c.location||'<span class="dim">Location not listed</span>'}</span></div><div class="row"><span class="mut">Share of Nov goal</span><span class="v">${(c.forecast/G.target*100).toFixed(1)}%</span></div><div class="row"><span class="mut">Roster tab</span><span class="v" style="font-weight:500">${c.tab}</span></div><div class="row"><span class="mut">Actual apps</span><span class="v"><span class="nt">Not tracked yet</span></span></div></div>`},
lesson:k=>{const [tr,t]=k.split('|');const T=D.academy.find(x=>x.track===tr),m=T.modules.find(x=>x.t===t);return `<div class="sh-h"><span class="av m1">${ic('train')}</span><div><h3>${m.t}</h3><p>${tr}</p></div></div>
<p class="mut" style="font-size:15px;margin:0 0 20px">${m.d||'Lesson content lives in the Fiber Academy.'}</p>
<button class="btn ${prog[k]?'o':'g'}" data-done="${k}">${ic('check')}${prog[k]?'Completed · tap to undo':'Mark done'}</button>
${T.url?`<a class="btn o" style="margin-top:10px" href="${T.url}" target="_blank" rel="noopener">${ic('play')}Watch in Fiber Academy</a>`:''}`}
};
const openSheet=h=>{$('#sheetBody').innerHTML=h;$('#sheet').classList.add('on');$('#scrim').classList.add('on');$('#sheet').scrollTop=0};
const closeSheet=()=>{$('#sheet').classList.remove('on');$('#scrim').classList.remove('on')};
const toast=t=>{const e=$('#toast');e.innerHTML=ic('check')+t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),1600)};
const buzz=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};

/* shell */
let cur;
const topbar=()=>`<a class="brand" href="#week"><span class="emk">${em()}</span><span>ELEVATE</span></a><span class="ttl" id="ttl"></span><span class="chip"><i></i>Nidus off</span>`;
$('#top').innerHTML=topbar();
$('#dock').innerHTML='<span class="ind"></span>'+TABS.map(([id,l,i])=>`<a href="#${id}" data-n="${id}">${ic(i)}${l.replace('My ','')}</a>`).join('');
const pills=()=>{$$('.seg').forEach(s=>{const b=s.querySelector('.on'),p=s.querySelector('.pill');if(b){p.style.left=b.offsetLeft+'px';p.style.width=b.offsetWidth+'px'}});const a=$('.dock a.on'),ind=$('.dock .ind');if(a){ind.style.left=a.offsetLeft+'px';ind.style.width=a.offsetWidth+'px'}};
const countUp=el=>{const to=+el.dataset.count,sm=el.querySelector('small').outerHTML,t0=performance.now();const f=t=>{const p=Math.min(1,(t-t0)/1100),e=1-Math.pow(1-p,4);el.innerHTML=Math.round(to*e)+sm;if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
const after=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{$$('[data-w]').forEach(b=>b.style.width=b.dataset.w+'%');pills()}));
function render(keep){const r=location.hash.slice(1);const k=V[r]?r:'week';const y=scrollY;
$('#app').innerHTML=`<div class="${keep?'':'view'}">${V[k]()}</div>`;$$('[data-n]').forEach(a=>a.classList.toggle('on',a.dataset.n===k));
$('#ttl').textContent=TABS.find(t=>t[0]===k)[1];cur=k;if(keep)scrollTo(0,y);else $$('[data-count]').forEach(countUp);after();onScroll()}
const onScroll=()=>$('#top').classList.toggle('solid',scrollY>(cur==='week'?220:40));
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',pills);

const bump=(k,d,ev)=>{const o=getLog(T12),c=LOGK.find(x=>x.k===k);let v=Math.max(0,(o[k]||0)+d);if(k==='rday')v=Math.min(1,v);if(v===(o[k]||0)){buzz(4);return}o[k]=v;setLog(T12,o);
 const hit=c.t&&d>0&&v===c.t;buzz(hit?[14,50,28]:d>0?10:5);
 const el=$(`[data-ctr="${k}"]`);el.outerHTML=ctr(c);const nel=$(`[data-ctr="${k}"]`);nel.querySelector('.n').classList.add('bump');
 if(ev&&d>0){const r=nel.getBoundingClientRect(),s=document.createElement('span');s.className='ripple';s.style.left=(ev.clientX-r.left)+'px';s.style.top=(ev.clientY-r.top)+'px';nel.appendChild(s);setTimeout(()=>s.remove(),650)}
 const w=Math.min(100,v/(c.t||1)*100),bi=nel.querySelector('.bar i');if(bi){bi.style.transition='none';bi.style.width=Math.min(100,(v-d)/(c.t)*100)+'%';requestAnimationFrame(()=>requestAnimationFrame(()=>{bi.style.transition='';bi.style.width=w+'%'}))}
 if(hit)toast(k==='rday'?'Recruiting day logged':`${c.l} target hit`);if(k==='leads'){const s=$('#streak');if(s)s.outerHTML=streakCard()}};

document.addEventListener('click',e=>{
 const inc=e.target.closest('[data-inc]');if(inc){bump(inc.dataset.inc,1,e);return}
 const st=e.target.closest('[data-step]');if(st){bump(st.dataset.k,+st.dataset.step,e);return}
 const sb=e.target.closest('.seg button');if(sb){const s=sb.parentNode.dataset.seg;if(s==='per'){ST.per=sb.dataset.v;localStorage.setItem('hq-per',ST.per)}else ST[s]=sb.dataset.v;sb.parentNode.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===sb));pills();buzz(5);setTimeout(()=>render(true),220);return}
 if(e.target.closest('#scrim')){closeSheet();return}
 const dn=e.target.closest('[data-done]');if(dn){const k=dn.dataset.done;prog[k]=!prog[k];localStorage.setItem('hq-prog',JSON.stringify(prog));buzz(prog[k]?[10,40,20]:5);if(prog[k])toast('Lesson complete');closeSheet();setTimeout(()=>render(true),250);return}
 const sh=e.target.closest('[data-sheet]');if(sh){openSheet(sheets[sh.dataset.sheet]());return}
 const rp=e.target.closest('[data-rep]');if(rp){openSheet(sheets.rep(rp.dataset.rep));return}
 const cw=e.target.closest('[data-crew]');if(cw){openSheet(sheets.crew(cw.dataset.crew));return}
 const ls=e.target.closest('[data-lesson]');if(ls){openSheet(sheets.lesson(ls.dataset.lesson));return}});
document.addEventListener('input',e=>{if(e.target.id==='q'){ST.q=e.target.value;const q=ST.q.toLowerCase();const L=D.crews.filter(c=>!q||(c.leader+' '+(c.location||'')+' '+c.window).toLowerCase().includes(q));$('#bzList').innerHTML=L.length?L.map(bzRow).join(''):`<div class="empty"><b>No matches</b>Try another search.</div>`;after()}});
/* swipe-down to close sheet */
let sy=null;$('#sheet').addEventListener('touchstart',e=>{if($('#sheet').scrollTop<=0)sy=e.touches[0].clientY},{passive:true});$('#sheet').addEventListener('touchend',e=>{if(sy!==null&&e.changedTouches[0].clientY-sy>80)closeSheet();sy=null});
addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet()});
addEventListener('hashchange',()=>{closeSheet();render();scrollTo(0,0)});
document.body.insertAdjacentHTML('beforeend','<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3dc8c"/><stop offset=".5" stop-color="#c9a227"/><stop offset="1" stop-color="#9a7714"/></linearGradient></defs></svg>');
document.fonts&&document.fonts.ready.then(pills);render();
})();
