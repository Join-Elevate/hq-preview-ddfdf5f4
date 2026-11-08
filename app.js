(()=>{
let D=window.HQ;try{const s=localStorage.getItem('hq-data');if(s)D=JSON.parse(s)}catch(e){}
const prog=JSON.parse(localStorage.getItem('hq-prog')||'{}');
const ME=D.leaders[D.meIndex??0];const myLog=JSON.parse(localStorage.getItem('hq-me')||'null');if(myLog)Object.assign(ME.week,myLog);
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const EP='M51 0H235V44H72L0 118V55Z M50 116H235V160H68L44 187V231H235V274H0V170Z';
const em=(c='#fff')=>`<svg viewBox="0 0 236 274" aria-hidden="true"><path d="${EP}" fill="${c}"/></svg>`;
const P={home:'<path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',kpi:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',team:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14a6.5 6.5 0 0 1 3 6"/>',
book:'<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v16H5.5A1.5 1.5 0 0 0 4 20.5z"/><path d="M4 20.5A1.5 1.5 0 0 0 5.5 22H20"/>',bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',path:'<path d="M4 20h4v-5h4v-5h4V5h4"/>',link:'<path d="M10 14a4 4 0 0 0 5.7 0l3.6-3.6a4 4 0 0 0-5.7-5.7L12 6.3"/><path d="M14 10a4 4 0 0 0-5.7 0l-3.6 3.6a4 4 0 0 0 5.7 5.7l1.6-1.6"/>',
plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chev:'<path d="M9 6l6 6-6 6"/>',edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',
play:'<path d="M7 4v16l13-8z"/>',sync:'<path d="M20 11a8 8 0 0 0-14.3-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.5L20 16M20 20v-4h-4"/>',ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5"/>',shirt:'<path d="M8 3l-5 3 2 5 3-1v11h8V10l3 1 2-5-5-3a4 4 0 0 1-8 0z"/>',bat:'<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2"/>',moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',house:'<path d="M3 21h18M5 21V10l7-6 7 6v11"/>'};
const ic=n=>`<svg class="i" viewBox="0 0 24 24">${P[n]}</svg>`;
const money=n=>n>=1e6?'$'+(+(n/1e6).toFixed(2))+'M':'$'+Math.round(n/1e3)+'K';
const S=D.standards;const ks=(k,v)=>{const s=S.find(x=>x.key===k);return Math.max(1,Math.min(5,Math.round(v/s.target*5)))};
const ls=l=>S.reduce((a,s)=>a+ks(s.key,l.week[s.key]||0),0)/S.length;const tone=s=>s>=4.5?'ok':s>=3.5?'warn':'bad';
const ini=n=>n.split(' ').map(w=>w[0]).join('').slice(0,2);
const stage=l=>l.serviced>=6e6?3:(l.serviced>=1e6||(l.serviced>=15e4&&l.reps>=5))?2:l.role==='Rep'?0:1;
const ring=(v,max,sz,sw)=>{const r=(sz-sw)/2,c=2*Math.PI*r;return `<svg viewBox="0 0 ${sz} ${sz}"><circle class="trk" cx="${sz/2}" cy="${sz/2}" r="${r}" stroke-width="${sw}" fill="none"/><circle class="arc" cx="${sz/2}" cy="${sz/2}" r="${r}" stroke-width="${sw}" fill="none" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-v/max)}"/></svg>`};
const scale=n=>`<div class="scale s${n}">${[1,2,3,4,5].map(i=>`<i class="${i<=n?'f':''}"></i>`).join('')}</div>`;
const d5=n=>`<span class="dots5">${[1,2,3,4,5].map(i=>`<i class="${i<=n?'f':''}"></i>`).join('')}</span>`;
const SAMPLE='<span class="tag">Sample</span>';
const mods=()=>D.academy.flatMap(t=>t.modules.map(m=>t.track+'|'+m.t));const pct=()=>Math.round(mods().filter(k=>prog[k]).length/mods().length*100);
const now=new Date(),mon=new Date(now);mon.setDate(now.getDate()-((now.getDay()+6)%7));const sat=new Date(mon);sat.setDate(mon.getDate()+5);
const fmt=d=>d.toLocaleDateString('en-US',{month:'short',day:'numeric'});const WEEK=`${fmt(mon)} – ${fmt(sat)}`;
const hr=now.getHours(),GREET=hr<12?'Good morning':hr<17?'Good afternoon':'Good evening';
const NAV=[['home','Home','home'],['kpis','My KPIs','kpi'],['team','Leaderboard','team'],['academy','Academy','book'],['blitz','Blitzes','bolt'],['path','Promotion','path'],['resources','Resources','link']];
const TABS=['home','kpis','academy','blitz','team'];

/* ---------- widgets ---------- */
const kpiRows=()=>S.map(s=>{const v=ME.week[s.key]||0,k=ks(s.key,v);return `<div class="kr"><div class="lb"><b>${s.label}</b><small>Target ${s.target}${s.unit}${s.per==='day'?' · daily avg':''}</small>${scale(k)}</div>
<div class="stp" data-k="${s.key}"><button data-d="-1" aria-label="Decrease">${ic('minus')}</button><span>${v}</span><button data-d="1" aria-label="Increase">${ic('plus')}</button></div><div class="pt ${tone(k)}">${k}</div></div>`}).join('');
const myKpis=()=>`<div class="card"><div class="ch">${ic('kpi')}<h3>My KPIs this week</h3><div class="r">${SAMPLE}<a class="lk" href="#kpis">Open ${ic('chev')}</a></div></div><div id="kpiBox">${kpiRows()}</div></div>`;
const board=(n=99)=>{const L=[...D.leaders].sort((a,b)=>ls(b)-ls(a)).slice(0,n);return `<table class="tb"><thead><tr><th></th><th>Leader</th>${S.map(s=>`<th class="n hm">${s.label.split(' ')[0].replace('Recruiting','Days').replace('Retention','Touch').replace('Reps','Signed')}</th>`).join('')}<th class="n">Score</th></tr></thead><tbody>
${L.map((l,i)=>`<tr class="${l===ME?'you':''}"><td class="rk">${i+1}</td><td><div class="who"><span class="av">${ini(l.name)}</span><div><b>${l.name}${l===ME?' <span class="mut" style="font-weight:400">(you)</span>':''}</b><small>${l.role} · ${l.office}</small></div></div></td>${S.map(s=>`<td class="n hm">${l.week[s.key]}</td>`).join('')}<td class="n"><b class="${tone(ls(l))}">${ls(l).toFixed(1)}</b></td></tr>`).join('')}</tbody></table>`};
const nextMod=()=>{for(const t of D.academy)for(const m of t.modules)if(!prog[t.track+'|'+m.t])return{t,m};return null};
const training=()=>{const n=nextMod();return `<div class="card"><div class="ch">${ic('book')}<h3>Continue training</h3><div class="r"><span class="mut" style="font-size:12px">${pct()}% complete</span><a class="lk" href="#academy">All ${ic('chev')}</a></div></div>
${n?`<a class="cont" href="#academy"><div class="th"><span class="emk">${em('#e6cd88')}</span></div><div class="tx"><small>${n.t.track} · Up next</small><b>${n.m.t}</b><p>${n.m.d||'Lesson'}</p></div><span class="btn g" data-mod="${n.t.track}|${n.m.t}">${ic('check')}Done</span></a>`:`<div class="cb mut">All modules complete.</div>`}
<div style="padding:4px 0 10px;border-top:1px solid var(--line)">${D.academy.map(t=>{const d=t.modules.filter(m=>prog[t.track+'|'+m.t]).length;return `<div class="tr"><span>${t.track}</span><div class="bar"><i style="width:${d/t.modules.length*100}%"></i></div><span>${d}/${t.modules.length}</span></div>`}).join('')}</div></div>`};
const st={Live:'live',Upcoming:'up',Done:'done'};
const bzRow=b=>`<div class="bz"><span class="st ${st[b.status]}"><i></i>${b.status}</span><div><b>${b.name}</b><small>${b.dates} · ${b.isp} · ${b.lead} · ${b.reps} reps</small></div><div class="num">${b.sold}<span class="mut" style="font-weight:400">/${b.goal}</span><small class="mut">${Math.round(b.sold/b.goal*100)}% of goal</small></div></div>`;
const blitzW=()=>{const L=D.blitzes.filter(b=>b.status!=='Done');return `<div class="card"><div class="ch">${ic('bolt')}<h3>Live &amp; upcoming blitzes</h3><div class="r">${SAMPLE}<a class="lk" href="#blitz">All ${ic('chev')}</a></div></div>${L.map(bzRow).join('')||'<div class="cb mut">No active blitzes.</div>'}</div>`};
const reqs=l=>{const s=stage(l);if(s===0)return{to:'Team Lead',a:[],txt:'Recruit and lead your first reps.'};if(s===1)return{to:'Area Manager',a:[[['Serviced',l.serviced,15e4,money],['Reps',l.reps,5,x=>x]],[['Serviced',l.serviced,1e6,money]]]};if(s===2)return{to:'Regional Manager',a:[[['Serviced',l.serviced,6e6,money]]]};return{to:null,a:[]}};
const promo=(l=ME)=>{const s=stage(l),r=reqs(l);return `<div class="card promo"><div class="ch">${ic('path')}<h3>My next promotion</h3><div class="r">${SAMPLE}</div></div><div class="cb">
<div class="lv">${D.path.map((p,i)=>`<span class="${i===s?'on':''}">${p.title}</span>${i<3?ic('chev'):''}`).join('')}</div>
${r.to?`<div style="font-size:13px;margin-bottom:4px">Next: <b class="gold">${r.to}</b></div>`:'<div class="mut">Top of the path.</div>'}${r.txt?`<p class="mut" style="margin:0;font-size:12.5px">${r.txt}</p>`:''}
${r.a.map((opt,oi)=>`${oi?'<div class="or">or</div>':''}${opt.map(([n,v,t,f])=>`<div class="req"><div class="rh"><b>${n}</b><span>${f(v)} / ${f(t)}</span></div><div class="bar"><i style="width:${Math.min(100,v/t*100)}%"></i></div></div>`).join('')}`).join('')}</div></div>`};

/* ---------- views ---------- */
const V={
home(){const s=ls(ME);return `<div class="card hello"><div><h1>${GREET}, Leader</h1><div class="sub"><span>Week of ${WEEK}</span><span class="dt">·</span><span>${D.org.season.split(':')[0]}</span></div></div>
<div class="sc"><div class="lbl" style="text-align:right"><small>Leadership score</small><strong class="${tone(s)}">${s>=4.5?'On standard':s>=3.5?'Close':'Below standard'}</strong></div><div class="rg">${ring(s,5,64,6)}<b>${s.toFixed(1)}</b></div></div></div>
<div class="grid home"><div class="grid">${myKpis()}${training()}</div><div class="grid">${promo()}<div class="card"><div class="ch">${ic('team')}<h3>Leaderboard</h3><div class="r">${SAMPLE}<a class="lk" href="#team">All ${ic('chev')}</a></div></div>${board(5).replace(/class="n hm"/g,'class="n hm" style="display:none"')}</div>${blitzW()}</div></div>`},
kpis(){return `<div class="ph"><div><h1>My KPIs</h1><p>Week of ${WEEK}. Log with + / −. Each KPI scores 1–5 against the standard.</p></div></div>
<div class="grid home"><div class="card"><div class="ch">${ic('kpi')}<h3>This week</h3><div class="r">${SAMPLE}</div></div><div id="kpiBox">${kpiRows()}</div><div class="note">5 = at target · 4 = 80% · 3 = 60% · 2 = 40% · 1 = below. ${D.org.season}</div></div>
<div class="grid"><div class="card"><div class="ch"><h3>The standard</h3></div>${S.map(s=>`<div class="kr" style="grid-template-columns:1fr auto"><span>${s.label}</span><b class="gold">${s.target}${s.unit}</b></div>`).join('')}</div>${promo()}</div></div>`},
team(){return `<div class="ph"><div><h1>Leaderboard</h1><p>Week of ${WEEK} · ranked by leadership score</p></div>${SAMPLE}</div><div class="card" style="overflow-x:auto">${board()}</div>
<div class="card" style="margin-top:14px"><div class="ch">${ic('sync')}<h3>Nidus signing pipeline</h3><div class="r"><span class="tag">${D.nidus.connected?'Connected':'Not connected · sample'}</span></div></div><div class="fin">${D.nidus.pipeline.map(p=>`<div><b>${p.n}</b><small>${p.stage}</small></div>`).join('')}</div></div>`},
academy(){return `<div class="ph"><div><h1>Academy</h1><p>${pct()}% complete · tap a lesson to mark it done (saved on this device)</p></div></div><div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
${D.academy.map(t=>{const d=t.modules.filter(m=>prog[t.track+'|'+m.t]).length;return `<div class="card trackc"><div class="ch"><h3>${t.track}</h3><div class="r"><div class="bar"><i style="width:${d/t.modules.length*100}%"></i></div><span class="mut" style="font-size:12px">${d}/${t.modules.length}</span></div></div>
${t.modules.map((m,i)=>{const k=t.track+'|'+m.t;return `<div class="md ${prog[k]?'done':''}" data-mod="${k}"><span class="no">${String(i+1).padStart(2,'0')}</span><div class="tx"><b>${m.t}</b>${m.d?`<span>${m.d}</span>`:''}</div><span class="ck">${ic('check')}</span></div>`}).join('')}
${t.url?`<a class="note" style="display:flex;gap:6px;align-items:center;color:var(--mut)" href="${t.url}" target="_blank" rel="noopener">${ic('play')}Watch videos on Elevate Fiber ${ic('ext')}</a>`:''}</div>`}).join('')}</div>`},
blitz(){const f=V._f||'All';const pi=['sun','shirt','bat','moon','house'];return `<div class="ph"><div><h1>Blitzes</h1><p>Fiber blitzes: status, lead, headcount, and progress to goal</p></div><div class="seg">${['All','Live','Upcoming','Done'].map(x=>`<button data-f="${x}" class="${x===f?'on':''}">${x}</button>`).join('')}</div></div>
<div class="card"><div class="ch">${ic('bolt')}<h3>${f} blitzes</h3><div class="r">${SAMPLE}</div></div>${D.blitzes.filter(b=>f==='All'||b.status===f).map(b=>bzRow(b)+`<div style="padding:0 14px 12px"><div class="bar"><i style="width:${Math.min(100,b.sold/b.goal*100)}%"></i></div></div>`).join('')||'<div class="cb mut">None.</div>'}</div>
<div class="card" style="margin-top:14px"><div class="ch"><h3>Blitz prep checklist</h3></div><div class="prep">${D.blitzPrep.map((x,i)=>`<div>${ic(pi[i%5])}<span>${x}</span></div>`).join('')}</div></div>`},
path(){const s=stage(ME);return `<div class="ph"><div><h1>Promotion</h1><p>Rep → Team Lead → Area Manager → Regional Manager</p></div></div>
<div class="card"><div class="path">${D.path.map((p,i)=>`<div class="pl ${i===s?'cur':''}"><small>Level ${i+1}${i===s?' · you':''}</small><b>${p.title}</b><p>${p.req}</p></div>`).join('')}</div></div><div style="margin-top:14px">${promo()}</div>
<div class="card" style="margin-top:14px"><div class="ch">${ic('team')}<h3>Team on the path</h3>${SAMPLE}</div><table class="tb"><tbody>${D.leaders.map(l=>`<tr><td><div class="who"><span class="av">${ini(l.name)}</span><div><b>${l.name}</b><small>${D.path[stage(l)].title}</small></div></div></td><td class="n">${money(l.serviced)}<br><small class="mut">${l.reps} reps</small></td></tr>`).join('')}</tbody></table></div>`},
resources(){return `<div class="ph"><div><h1>Resources</h1><p>${D.org.mission}</p></div></div><div class="card res">${D.resources.map(r=>`<a href="${r.u}" target="_blank" rel="noopener">${ic('link')}<b>${r.t}</b><small>${r.d}</small>${ic('ext')}</a>`).join('')}</div>`}
};
/* ---------- shell ---------- */
const lock=`<span class="emk" style="width:22px;height:26px">${em()}</span><span class="wm"><b>ELEVATE</b><small>MARKETING</small></span>`;
$('#side').innerHTML=`<a class="lock" href="#home">${lock}</a><div class="grp">Workspace</div>${NAV.slice(0,6).map(([id,l,i])=>`<a class="nv" href="#${id}" data-n="${id}">${ic(i)}${l}</a>`).join('')}<div class="grp">More</div><a class="nv" href="#resources" data-n="resources">${ic('link')}Resources</a>
<div class="me"><span class="av">${ini(ME.name)}</span><div><b>${ME.name}</b><small>${ME.role} · ${ME.office}</small></div><button class="ib" data-edit aria-label="Edit data">${ic('edit')}</button></div>`;
$('#mtop').innerHTML=`<a class="lock" href="#home">${lock}</a><div style="display:flex;gap:8px;align-items:center"><button class="ib" data-edit aria-label="Edit data">${ic('edit')}</button><a href="#resources" class="av">${ini(ME.name)}</a></div>`;
$('#tabbar').innerHTML=TABS.map(id=>{const n=NAV.find(x=>x[0]===id);return `<a href="#${id}" data-n="${id}">${ic(n[2])}${id==='team'?'Team':id==='kpis'?'KPIs':n[1]}</a>`}).join('');
$('#edClose').innerHTML=ic('x');
function render(){const r=location.hash.slice(1);const k=V[r]?r:'home';$('#app').innerHTML=`<div class="view">${V[k]()}</div>`;$$('[data-n]').forEach(a=>a.classList.toggle('on',a.dataset.n===k));document.title=(k==='home'?'':NAV.find(n=>n[0]===k)[1]+' · ')+'Elevate HQ'}
const toast=t=>{const e=$('#toast');e.innerHTML=ic('check')+t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),1400)};
document.addEventListener('click',e=>{
 const sb=e.target.closest('.stp button');if(sb){const k=sb.parentNode.dataset.k;ME.week[k]=Math.max(0,(ME.week[k]||0)+ +sb.dataset.d);localStorage.setItem('hq-me',JSON.stringify(ME.week));const y=scrollY;render();scrollTo(0,y);if(navigator.vibrate)navigator.vibrate(6);return}
 const m=e.target.closest('[data-mod]');if(m){e.preventDefault();const k=m.dataset.mod;prog[k]=!prog[k];localStorage.setItem('hq-prog',JSON.stringify(prog));const y=scrollY;render();scrollTo(0,y);if(prog[k])toast('Lesson complete');return}
 const f=e.target.closest('[data-f]');if(f){V._f=f.dataset.f;render();return}
 if(e.target.closest('[data-edit]')){$('#ed').value=JSON.stringify(D,null,2);$('#editor').showModal()}});
$('#edClose').onclick=()=>$('#editor').close();
$('#save').onclick=()=>{try{localStorage.setItem('hq-data',JSON.stringify(JSON.parse($('#ed').value)));localStorage.removeItem('hq-me');location.reload()}catch(x){toast('Invalid JSON')}};
$('#reset').onclick=()=>{localStorage.removeItem('hq-data');location.reload()};$('#clr').onclick=()=>{localStorage.removeItem('hq-prog');localStorage.removeItem('hq-me');location.reload()};
addEventListener('hashchange',()=>{render();scrollTo(0,0)});render();
})();
