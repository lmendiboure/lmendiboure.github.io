(() => {
  const cfg = window.IOT_COURSE_CONFIG;
  if (!cfg) return;
  const host = document.querySelector('#missionGrid');
  if (!host) return;

  const MISSION_KEY = 'iot-systems-design-campus-mission-v1';

  function missionDossier(){
    try{return JSON.parse(localStorage.getItem(MISSION_KEY)||'null')}catch(_){return null}
  }

  function fmtValue(v){
    if(Array.isArray(v)) return v.map(x=>fmtValue(x)).filter(Boolean).join(' · ');
    if(v && typeof v === 'object') return fmtValue(v.label || v.title || v.id || '');
    if(v === true) return 'Filed';
    if(v === false || v == null || v === '') return '';
    return String(v).replace(/[-_]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
  }

  function renderMissionIdentity(){
    const dossier = missionDossier();
    const snap = document.querySelector('#missionDossierSnapshot');
    const topNote = document.querySelector('#topMissionNote');
    if(!snap) return;
    const s1 = dossier?.session1 || {};
    const s2 = dossier?.session2 || {};
    const hasS1 = Object.values(s1).some(v=>Array.isArray(v)?v.length:Boolean(v));
    const hasS2 = Object.values(s2).some(v=>Array.isArray(v)?v.length:Boolean(v));
    if(!hasS1 && !hasS2){
      if(topNote) topNote.textContent='Mission dossier · no decisions filed yet';
      return;
    }
    const status = hasS2 ? 'Updated through Mission 02' : 'Mission 01 decisions filed';
    if(topNote) topNote.textContent=`Mission dossier · ${hasS2?'updated':'active'}`;
    const facts=[];
    const push=(label,val)=>{const f=fmtValue(val);if(f)facts.push([label,f])};
    push('Architecture',s1.architectureClass);
    push('Priorities',s1.priorityRequirements);
    push('Access strategy',s1.accessStrategy);
    push('Open uncertainty',s1.keyUncertainty);
    if(hasS2){
      push('Application strategy',s2.applicationStrategy);
      push('Incident tested',s2.incident);
    }
    snap.innerHTML=`<div class="dossier-live-head"><span>MISSION DOSSIER</span><b>${status}</b></div>
      ${facts.length?`<div class="dossier-facts">${facts.slice(0,4).map(([l,v])=>`<div class="dossier-fact"><small>${l}</small><strong>${v}</strong></div>`).join('')}</div>`:''}
      <p>${hasS2?'Your campus design now carries decisions from the first two missions.':'Mission 02 will reopen this design record rather than start from a blank system.'}</p>`;
  }

  const screenToStep = [0,0,1,1,2,2,3,4,5,5,6,6];
  const stepNames = ['Landscape','Architecture','Requirements','Discover','Investigate','Choose','Stress-test'];

  function localProgress(session){
    if (!session.storageKey) return null;
    try{
      const raw = localStorage.getItem(session.storageKey);
      if(!raw) return {pct:0,label:'Not started on this device',action:'Enter mission'};
      const state = JSON.parse(raw);
      if(session.progressKind === 'activity-frontier'){
        const labels=session.progressLabels||[];
        const maxIndex=Math.max(0,labels.length-1);
        const frontier=Math.max(0,Math.min(maxIndex,Number(state.frontier)||0));
        if(state.completed) return {pct:100,label:'Session completed on this device',action:'Review mission'};
        const pct=labels.length?Math.min(95,Math.round(frontier/labels.length*100)):0;
        return {pct,label:`In progress · ${labels[frontier]||`Activity ${frontier+1}`}`,action:'Continue mission'};
      }
      const frontier = Math.max(Number(state.maxUnlockedScreen)||0, Number(state.screen)||0);
      const pct = Math.max(0, Math.min(100, Math.round(frontier / 11 * 100)));
      if(frontier >= 11) return {pct:100,label:'Final debrief reached on this device',action:'Review mission'};
      const step = stepNames[screenToStep[frontier] ?? 0];
      return {pct,label:`In progress · ${step}`,action:'Continue mission'};
    }catch(_){return {pct:0,label:'Local progress unavailable',action:'Enter mission'};}
  }

  const releasedThrough = Math.max(0, Math.min(cfg.sessions.length, Number(cfg.release?.releasedThrough)||0));
  const currentSession = cfg.sessions[Math.max(0,releasedThrough-1)];
  const primaryAction=document.querySelector('#primaryMissionAction');
  const heroStatus=document.querySelector('#heroMissionStatus');
  if(currentSession && primaryAction){
    const progress=localProgress(currentSession);
    primaryAction.href=`session-${currentSession.id}/`;
    primaryAction.textContent=`${progress?.pct>0?'Resume':'Enter'} Mission ${currentSession.number} →`;
    if(heroStatus){
      heroStatus.textContent=progress?.pct>0 ? `${progress.label} · ${progress.pct}% on this device.` : `Mission ${currentSession.number} is the current operation.`;
    }
  }
  renderMissionIdentity();
  const stateFor = (id) => id < releasedThrough ? 'review' : (id === releasedThrough ? 'open' : 'locked');
  const pathNodes=[...document.querySelectorAll('.course-path .path-node')];
  pathNodes.forEach((n,i)=>n.classList.toggle('current',i===Math.max(0,releasedThrough-1)));

  const stateLabels = {open:'Current mission',review:'Available for review',locked:'Locked'};
  const classes = ['','s2','s3','s4'];
  host.innerHTML = cfg.sessions.map((s,i)=>{
    const state = stateFor(s.id);
    const available = state !== 'locked';
    const href = `session-${s.id}/`;
    const progress = localProgress(s);
    const actionLabel = state === 'review' ? 'Review mission' : (progress?.action || 'Enter mission');
    const progressHtml = available && progress ? `<div class="local-progress"><div class="local-progress-head"><span>${progress.label}</span><span>${progress.pct}%</span></div><div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:${progress.pct}%"></div></div></div>` : '';
    const action = available ? `<div class="mission-action"><a class="btn primary" href="${href}">${actionLabel} →</a></div>` : `<div class="locked-note"><b aria-hidden="true">○</b><span>Unlocks later</span></div>`;
    return `<article class="mission-card ${classes[i]||''}">
      <div class="mission-top"><span class="mission-number">${s.number}</span><span class="state-badge ${state==='locked'?'locked':''}">${stateLabels[state]}</span></div>
      <div class="mission-kicker">${s.kicker}</div>
      <h3>${s.title}</h3>
      <p class="mission-question">${s.question}</p>
      <p class="mission-summary">${s.summary}</p>
      <div class="objective-row">${s.objectives.map(o=>`<span>${o}</span>`).join('')}</div>
      ${progressHtml}${action}
    </article>`;
  }).join('');

  const available = releasedThrough;
  const pill = document.querySelector('#courseProgress');
  if(pill) pill.textContent = available > 0 ? `${available} / ${cfg.sessions.length} mission${available===1?'':'s'} available · Mission ${available} current` : `No mission open yet`;

  const debriefCard=document.querySelector('#finalDebriefCard');
  const debriefAction=document.querySelector('#finalDebriefAction');
  const debriefOpen=releasedThrough>=cfg.sessions.length && cfg.sessions.length>0;
  if(debriefCard && debriefAction){
    debriefCard.classList.toggle('locked',!debriefOpen);
    debriefAction.textContent=debriefOpen?'Open final debrief →':'Final debrief · locked';
    debriefAction.setAttribute('aria-disabled',debriefOpen?'false':'true');
    if(!debriefOpen) debriefAction.addEventListener('click',e=>e.preventDefault());
  }
})();
