(() => {
  const cfg = window.IOT_COURSE_CONFIG;
  if (!cfg) return;
  const host = document.querySelector('#missionGrid');
  if (!host) return;

  const screenToStep = [0,0,1,1,2,2,3,4,5,5,6,6];
  const stepNames = ['Landscape','Architecture','Requirements','Discover','Investigate','Choose','Stress-test'];

  function localProgress(session){
    if (!session.storageKey) return null;
    try{
      const raw = localStorage.getItem(session.storageKey);
      if(!raw) return {pct:0,label:'Not started on this device',action:'Enter mission'};
      const state = JSON.parse(raw);
      const frontier = Math.max(Number(state.maxUnlockedScreen)||0, Number(state.screen)||0);
      const pct = Math.max(0, Math.min(100, Math.round(frontier / 11 * 100)));
      if(frontier >= 11) return {pct:100,label:'Final debrief reached on this device',action:'Review mission'};
      const step = stepNames[screenToStep[frontier] ?? 0];
      return {pct,label:`In progress · ${step}`,action:'Continue mission'};
    }catch(_){return {pct:0,label:'Local progress unavailable',action:'Enter mission'};}
  }

  const releasedThrough = Math.max(0, Math.min(cfg.sessions.length, Number(cfg.release?.releasedThrough)||0));
  const stateFor = (id) => id < releasedThrough ? 'review' : (id === releasedThrough ? 'open' : 'locked');
  const stateLabels = {open:'Current mission',review:'Available for review',locked:'Locked'};
  const classes = ['','s2','s3','s4'];
  host.innerHTML = cfg.sessions.map((s,i)=>{
    const state = stateFor(s.id);
    const available = state !== 'locked';
    const href = `session-${s.id}/`;
    const progress = localProgress(s);
    const actionLabel = state === 'review' ? 'Review mission' : (progress?.action || 'Enter mission');
    const progressHtml = available && progress ? `<div class="local-progress"><div class="local-progress-head"><span>${progress.label}</span><span>${progress.pct}%</span></div><div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:${progress.pct}%"></div></div></div>` : '';
    const action = available ? `<div class="mission-action"><a class="btn primary" href="${href}">${actionLabel} →</a></div>` : `<div class="locked-note"><b aria-hidden="true">○</b><span>Not published yet</span></div>`;
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

  const open = releasedThrough > 0 ? 1 : 0;
  const published = releasedThrough;
  const pill = document.querySelector('#courseProgress');
  if(pill) pill.textContent = `${published} / ${cfg.sessions.length} mission${published===1?'':'s'} published · ${open} current`;
})();
