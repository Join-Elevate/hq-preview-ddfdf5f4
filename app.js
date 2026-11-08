(()=>{
const D=window.HQ;const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const prog=JSON.parse(localStorage.getItem('hq-prog')||'{}');
const EP='M51 0H235V44H72L0 118V55Z M50 116H235V160H68L44 187V231H235V274H0V170Z';
const em=(c='#fff')=>`<svg viewBox="0 0 236 274" aria-hidden="true"><path d="${EP}" fill="${c}"/></svg>`;
const P={home:'<path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',board:'<path d="M8 21V11M16 21V7M12 21V3M4 21h16"/>',bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',team:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14a6.5 6.5 0 0 1 3 6"/>',book:'<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v16H5.5A1.5 1.5 0 0 0 4 20.5zM4 20.5A1.5 1.5 0 0 0 5.5 22H20"/>',chev:'<path d="M9 6l6 6-6 6"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',pin:'<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'};
P.plus='<path d="M12 5v14M5 12h14"/>';P.minus='<path d="M5 12h14"/>';P.tap='<path d="M9 11V5a2 2 0 0 1 4 0v6"/><path d="M13 10a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v3a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3l-3-5a2 2 0 0 1 3.4-2L9 14"/>';
const ic=n=>`<svg class="i ${n==='chev'?'chev':''}" viewBox="0 0 24 24">${P[n]}</svg>`;
const ini=n=>n.replace(/[^A-Za-z +&/]/g,'').split(/[ +&/]+/).filter(Boolean).map(w=>w[0]).join('').slice(0,2).toUpperCase();
const fmt=n=>n.toLocaleString();
const NOW=new Date(),TODAY=new Date();TODAY.setHours(12);
const status=c=>{const s=new Date(c.start+'T00:00'),e=new Date(c.end+'T23:59');return TODAY<s?'Upcoming':TODAY>e?'Done':'Live'};
const stc={Live:'live',Upcoming:'up',Done:''};
const daysTo=c=>Math.round((new Date(c.start+'T12:00')-TODAY)/864e5);
const NAV=[['home','Home','home'],['log','Log','tap'],['board','Leaderboard','board'],['blitz','Blitzes','bolt'],['leaders','Leaders','team'],['academy','Academy','book']];
const PER={today:'Today',wtd:'Week',mtd:'Month'};let per=localStorage.getItem('hq-per')||'wtd';let flt='All';
const seg=(id,opts,cur)=>`<div class="seg" data-seg="${id}">${opts.map(([k,l])=>`<button data-v="${k}" class="${k===cur?'on':''}">${l}</button>`).join('')}<span class="pill"></span></div>`;
const ranked=()=>[...D.reps].sort((a,b)=>b[per]-a[per]||a.name.localeCompare(b.name));
const mods=()=>D.academy.flatMap(t=>t.modules.map(m=>t.track+'|'+m.t));const pct=()=>Math.round(mods().filter(k=>prog[k]).length/mods().length*100);
const G=D.goal;
/* ---- daily KPI log (this device) ---- */
const LOGK=[{k:'leads',l:'New leads',t:10,per:'day'},{k:'intros',l:'Intro calls',t:10,per:'day'},{k:'touch',l:'Retention touchpoints',t:5,per:'day'},{k:'signed',l:'Reps signed',t:null,per:'day'},{k:'rday',l:'Recruiting day',t:1,per:'day',wk:6}];
const dkey=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const getLog=d=>JSON.parse(localStorage.getItem('hq-log-'+dkey(d))||'{}');
const setLog=(d,o)=>localStorage.setItem('hq-log-'+dkey(d),JSON.stringify(o));
const weekDays=()=>{const n=new Date(),m=new Date(n);m.setDate(n.getDate()-((n.getDay()+6)%7));return [...Array(6)].map((_,i)=>{const x=new Date(m);x.setDate(m.getDate()+i);return x})};
const wkSum=k=>weekDays().reduce((a,d)=>a+(getLog(d)[k]||0),0);
const ctrHTML=c=>{const v=getLog(new Date())[c.k]||0;const hit=c.t&&v>=c.t;const w=wkSum(c.k);
const wkTxt=c.k==='rday'?`${w} / ${c.wk} this wk`:c.t?`${w} / ${c.t*6} this wk`:`${w} this wk`;
return `<div class="ctr ${hit?'hit':''}" data-ctr="${c.k}"><button class="main" data-inc="${c.k}" aria-label="Add one ${c.l}"><span class="t">${c.l}${hit?` <span class="gold">${ic('check')}</span>`:''}<span class="wk">${wkTxt}</span></span><span class="n">${v}${c.t?`<small>/ ${c.t}</small>`:''}</span>${c.t?`<span class="pb"><i style="width:${Math.min(100,v/c.t*100)}%"></i></span>`:''}</button>
<div class="side2"><button data-step="1" data-k="${c.k}" aria-label="Plus one">${ic('plus')}</button><button data-step="-1" data-k="${c.k}" aria-label="Minus one">${ic('minus')}</button></div></div>`};
const bump=(k,d)=>{const t=new Date(),o=getLog(t),c=LOGK.find(x=>x.k===k);let v=Math.max(0,(o[k]||0)+d);if(k==='rday')v=Math.min(1,v);o[k]=v;setLog(t,o);
 if(navigator.vibrate)navigator.vibrate(d>0?(c.t&&v===c.t?[12,40,24]:10):[4]);
 const el=document.querySelector(`[data-ctr="${k}"]`);if(el){el.outerHTML=ctrHTML(c);const n=document.querySelector(`[data-ctr="${k}"] .n`);n.classList.add('pop')}
 const wr=document.querySelector('#wkrow');if(wr)wr.outerHTML=wkRow()};
const wkRow=()=>`<div class="wkrow" id="wkrow">${weekDays().map(d=>{const o=getLog(d),tot=(o.leads||0)+(o.intros||0)+(o.touch||0);return `<div class="${dkey(d)===dkey(new Date())?'td':''}"><b class="${o.rday?'on':''}">${tot||''}</b>${d.toLocaleDateString('en-US',{weekday:'short'})}</div>`}).join('')}</div>`;


const V={
home(){const behind=G.mtd-G.cumTargetAsOf;const live=D.crews.filter(c=>status(c)==='Live'),up=D.crews.filter(c=>status(c)==='Upcoming');
const nextStart=up.length?up[0].start:null;const wave=up.filter(c=>c.start===nextStart);const lk=LOGK.map(c=>({label:c.l+(c.k==='rday'?'s':'')+' (week)',value:wkSum(c.k),target:c.wk||(c.t?c.t*6:null)}));const KP=[...D.kpis.filter(k=>k.value!=null),...lk];const tracked=KP.length;
const top=ranked().slice(0,3);
return `<div class="hd"><div class="eb">${TODAY.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</div><h1>${NOW.getHours()<12?'Good morning':NOW.getHours()<17?'Good afternoon':'Good evening'}, Leader</h1></div>
<div class="stack">
<div class="card cpad tap x"><div class="lbl">${G.label}<span class="r">thru ${G.asOfDate} ${ic('chev')}</span></div>
<div class="big">${fmt(G.mtd)} <small>/ ${fmt(G.target)}</small></div><div class="sub"><span class="${behind<0?'bad':'ok'}">${behind<0?Math.abs(behind)+' behind':behind+' ahead of'}</span> the ${G.cumTargetAsOf}-app pace target · standard ${G.standard}</div>
<div class="bar"><i data-w="${G.mtd/G.target*100}"></i><b style="left:${G.cumTargetAsOf/G.target*100}%"></b></div>
<div class="more"><div><div class="rows">${G.daily.map(d=>`<div class="row"><span>${d.d}</span><span class="v">${d.actual} <span class="dim">/ ${d.target}</span></span></div>`).join('')}</div>
<div class="lbl" style="margin-top:18px">Pace checkpoints</div><div class="rows" style="margin-top:8px">${G.checkpoints.map(c=>`<div class="row"><span>${c.d}</span><span class="v">${fmt(c.t)}</span></div>`).join('')}</div></div></div></div>

<div class="card cpad"><div class="lbl">Top reps<span class="r">${seg('per',Object.entries(PER),per)}</span></div>
<div class="podium">${top.map((r,i)=>`<div><small>#${i+1}</small><b>${r[per]}</b><span>${r.name}</span></div>`).join('')}</div>
<a href="#board" class="sub" style="display:flex;align-items:center;gap:4px;margin-top:16px">Full leaderboard · team ${D.repTotals[per]} ${PER[per].toLowerCase()} ${ic('chev')}</a></div>

<div class="card cpad tap x"><div class="lbl">Blitzes<span class="r">${ic('chev')}</span></div>
<div class="big">${live.length} <small>live · ${live.reduce((a,c)=>a+c.heads,0)} reps</small></div>
<div class="sub">${wave.length?`Next wave in ${daysTo(wave[0])} day${daysTo(wave[0])==1?'':'s'}: ${wave.length} crews, ${wave.reduce((a,c)=>a+c.heads,0)} reps (${wave[0].window})`:'No upcoming crews'}</div>
<div class="more"><div><div class="rows">${[...live,...wave].map(c=>`<div class="row"><span class="st ${stc[status(c)]}"><i></i></span><span>${c.leader}</span><span class="v">${c.heads} reps</span></div>`).join('')}</div><a href="#blitz" class="sub" style="display:flex;align-items:center;gap:4px;margin-top:14px">All ${D.crews.length} crews ${ic('chev')}</a></div></div></div>

<div class="card cpad tap x"><div class="lbl">Leadership KPIs<span class="r">${ic('chev')}</span></div>
<div class="big">${wkSum('leads')} <small>leads this week</small></div><div class="sub">Recruiting KPIs are logged on this device · <a href="#log" class="gold">Log today</a></div>
<div class="more"><div><div class="rows">${KP.map(k=>`<div class="row"><span>${k.label}</span><span class="v">${k.value!=null?`${k.value}${k.target?` <span class="dim">/ ${k.target}</span>`:''}`:'<span class="nt">Not tracked yet</span>'}</span></div>`).join('')}</div></div></div></div>
</div><p class="foot">Apps as of ${D.asOf.apps} · crews as of ${D.asOf.crews}. From Peter's Elevate Fiber sheets.</p>`},

log(){return `<div class="hd"><div class="eb">${new Date().toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'})} · resets daily</div><h1>Today's log</h1></div>
<p class="hint">Tap a card to add 1. Logged on this device.</p><div class="stack">${LOGK.map(ctrHTML).join('')}</div>
<div class="card cpad" style="margin-top:14px"><div class="lbl">This week · leads + intros + touches per day<span class="r">gold = recruiting day</span></div>${wkRow()}</div>`},
board(){const L=ranked();const mx=Math.max(1,...L.map(r=>r[per]));return `<div class="hd"><div class="eb">Fiber apps · as of ${D.asOf.apps}</div><h1>Leaderboard</h1></div>
<div class="toolbar">${seg('per',Object.entries(PER),per)}<span class="sub">Team: <b class="gold">${D.repTotals[per]}</b></span></div>
<div class="card"><ul class="lb">${L.map((r,i)=>`<li data-rep="${r.name}"><span class="rk ${i===0?'t1':''}">${i+1}</span><span class="av">${ini(r.name)}</span><div class="nm"><b>${r.name}</b><small>${r.today} today · ${r.wtd} week · ${r.mtd} month</small></div><div class="mini h"><i style="width:${r[per]/mx*100}%"></i></div><span class="sc">${r[per]}</span></li>`).join('')}</ul></div>
<p class="foot">Tap a rep for details. Source: <a href="${D.sources[2].u}" target="_blank" rel="noopener">Fiber Leaderboard Live Data</a>.</p>`},

blitz(){const L=D.crews.filter(c=>flt==='All'||status(c)===flt);return `<div class="hd"><div class="eb">November · ${D.crews.reduce((a,c)=>a+c.heads,0)} reps · ${fmt(D.crews.reduce((a,c)=>a+c.forecast,0))} forecast apps</div><h1>Blitzes</h1></div>
<div class="toolbar">${seg('flt',[['All','All'],['Live','Live'],['Upcoming','Upcoming']],flt)}</div>
<div class="card">${L.map(c=>`<div class="crew" data-crew="${c.leader}"><span class="av">${ini(c.leader)}</span><div class="nm"><b>${c.leader}</b><small><span class="st ${stc[status(c)]}"><i></i>${status(c)}</span> · ${c.window}</small></div><div class="r"><b>${c.heads}</b><small>reps</small></div></div>`).join('')||'<div class="cpad sub">None.</div>'}</div>
<p class="foot">${D.dropped.map(d=>`${d.leader}: ${d.note}.`).join(' ')} Source: <a href="${D.sources[1].u}" target="_blank" rel="noopener">Crew Forecast</a>.</p>`},

leaders(){const L=[...D.crews].sort((a,b)=>b.heads-a.heads);return `<div class="hd"><div class="eb">Crew leaders this month</div><h1>Leaders</h1></div>
<div class="card"><ul class="lb">${L.map((c,i)=>`<li data-crew="${c.leader}"><span class="rk">${i+1}</span><span class="av">${ini(c.leader)}</span><div class="nm"><b>${c.leader}</b><small>${c.window} · ${status(c)}</small></div><span class="sc">${c.heads}<span class="dim" style="font:500 12px Inter"> reps</span></span></li>`).join('')}</ul></div>
<p class="foot">Ranked by reps on their roster tab. Sales per leader aren't in the sheets yet (the live leaderboard is rep-level only).</p>`},

academy(){return `<div class="hd"><div class="eb">${pct()}% complete · saved on this device</div><h1>Academy</h1></div><div class="stack">
${D.academy.map((t,ti)=>{const d=t.modules.filter(m=>prog[t.track+'|'+m.t]).length;return `<div class="card x ${ti===0?'open':''}"><div class="trk tap"><h3>${t.track}</h3><span class="sub">${d}/${t.modules.length}</span><div class="mini"><i style="width:${d/t.modules.length*100}%"></i></div>${ic('chev')}</div>
<div class="more"><div style="border-top:1px solid var(--line)">${t.modules.map(m=>{const k=t.track+'|'+m.t;return `<div class="md ${prog[k]?'done':''}" data-mod="${k}"><div class="tx"><b>${m.t}</b>${m.d?`<span>${m.d}</span>`:''}</div><span class="ck">${ic('check')}</span></div>`}).join('')}
${t.url?`<a class="md" href="${t.url}" target="_blank" rel="noopener" style="color:var(--gold2)">${ic('ext')} Watch the videos</a>`:''}</div></div></div>`}).join('')}</div>`}
};

/* detail sheets */
const repSheet=n=>{const r=D.reps.find(x=>x.name===n);const rk=k=>[...D.reps].sort((a,b)=>b[k]-a[k]).findIndex(x=>x===r)+1;
return `<div class="sh-h"><span class="av">${ini(r.name)}</span><div><h2>${r.name}</h2><p>Fiber rep · as of ${D.asOf.apps}</p></div><button class="sh-x" data-close>${ic('x')}</button></div>
<div class="grid2">${Object.entries(PER).map(([k,l])=>`<div class="tile"><small>${l}</small><b>${r[k]}</b><small>#${rk(k)} of ${D.reps.length}</small></div>`).join('')}<div class="tile"><small>Share of team (month)</small><b>${Math.round(r.mtd/D.repTotals.mtd*100)}%</b><small>${r.mtd} of ${D.repTotals.mtd}</small></div></div>
<p class="foot">Pace standard: ${G.standard}. Crew and Nidus status aren't linked to this rep yet.</p>`};
const crewSheet=n=>{const c=D.crews.find(x=>x.leader===n);const s=status(c);return `<div class="sh-h"><span class="av">${ini(c.leader)}</span><div><h2>${c.leader}</h2><p><span class="st ${stc[s]}"><i></i>${s}</span> · ${c.window}</p></div><button class="sh-x" data-close>${ic('x')}</button></div>
<div class="grid2"><div class="tile"><small>Reps on roster</small><b>${c.heads}</b></div><div class="tile"><small>Forecast apps</small><b>${c.forecast}</b></div><div class="tile"><small>Knock days</small><b>${c.knockDays}</b></div><div class="tile"><small>Rep-days</small><b>${c.repDays}</b></div></div>
<div class="rows"><div class="row">${ic('pin')}<span>${c.location||'<span class="dim">Location not listed</span>'}</span></div><div class="row"><span class="dim">Apps / knock day (target)</span><span class="v">${(c.forecast/c.knockDays).toFixed(1)}</span></div><div class="row"><span class="dim">Share of November goal</span><span class="v">${(c.forecast/G.target*100).toFixed(1)}%</span></div><div class="row"><span class="dim">Roster tab</span><span class="v" style="font-weight:400">${c.tab}</span></div><div class="row"><span class="dim">Actual apps</span><span class="v"><span class="nt">Not tracked by crew yet</span></span></div></div>`};
const openSheet=h=>{$('#sheetBody').innerHTML=h;$('#sheet').classList.add('on');$('#scrim').classList.add('on')};
const closeSheet=()=>{$('#sheet').classList.remove('on');$('#scrim').classList.remove('on')};

/* shell */
const lock=`<span class="emk" style="width:21px;height:24px">${em()}</span><span class="wm"><b>ELEVATE</b><small>MARKETING</small></span>`;
$('#side').innerHTML=`<a class="lock" href="#home">${lock}</a>${NAV.map(([id,l,i])=>`<a class="nv" href="#${id}" data-n="${id}">${ic(i)}${l}</a>`).join('')}<div class="src">Data: ${D.sources.slice(0,3).map(s=>`<a href="${s.u}" target="_blank" rel="noopener">${s.t}</a>`).join(' · ')}<br>Nidus: not connected</div>`;
$('#mtop').innerHTML=`<a class="lock" href="#home">${lock}</a><span class="sub" style="font-size:12px">Nidus: not connected</span>`;
$('#tabbar').innerHTML=NAV.map(([id,l,i])=>`<a href="#${id}" data-n="${id}">${ic(i)}${id==='board'?'Board':id==='leaders'?'Crews':l}</a>`).join('');
const placePills=()=>$$('.seg').forEach(s=>{const b=s.querySelector('.on'),p=s.querySelector('.pill');if(b){p.style.left=b.offsetLeft+'px';p.style.width=b.offsetWidth+'px'}});
const animate=()=>requestAnimationFrame(()=>{$$('[data-w]').forEach(b=>b.style.width=b.dataset.w+'%');placePills()});
let cur;function render(keep){const r=location.hash.slice(1);const k=V[r]?r:'home';const open=keep?$$('.x').map(e=>e.classList.contains('open')):null;
$('#app').innerHTML=`<div class="${keep?'':'view'}">${V[k]()}</div>`;if(open)$$('.x').forEach((e,i)=>e.classList.toggle('open',!!open[i]));
$$('[data-n]').forEach(a=>a.classList.toggle('on',a.dataset.n===k));cur=k;animate()}
document.addEventListener('click',e=>{
 const inc=e.target.closest('[data-inc]');if(inc){bump(inc.dataset.inc,1);return}
 const stp=e.target.closest('[data-step]');if(stp){bump(stp.dataset.k,+stp.dataset.step);return}
 const sb=e.target.closest('.seg button');if(sb){const s=sb.parentNode.dataset.seg;if(s==='per'){per=sb.dataset.v;localStorage.setItem('hq-per',per)}else flt=sb.dataset.v;
   sb.parentNode.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===sb));placePills();setTimeout(()=>render(true),180);return}
 if(e.target.closest('[data-close]')||e.target.id==='scrim'){closeSheet();return}
 const rp=e.target.closest('[data-rep]');if(rp){openSheet(repSheet(rp.dataset.rep));return}
 const cw=e.target.closest('[data-crew]');if(cw){openSheet(crewSheet(cw.dataset.crew));return}
 const m=e.target.closest('[data-mod]');if(m){const k=m.dataset.mod;prog[k]=!prog[k];localStorage.setItem('hq-prog',JSON.stringify(prog));render(true);if(navigator.vibrate)navigator.vibrate(6);return}
 if(e.target.closest('a'))return;
 const x=e.target.closest('.x');if(x){if(x.querySelector('.trk')&&!e.target.closest('.trk'))return;x.classList.toggle('open')}});
addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet()});
addEventListener('hashchange',()=>{closeSheet();render();scrollTo(0,0)});addEventListener('resize',placePills);
document.fonts&&document.fonts.ready.then(placePills);render();
})();
