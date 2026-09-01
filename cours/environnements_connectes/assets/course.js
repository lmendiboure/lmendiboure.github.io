(() => {
  const cfg = window.ENV_COURSE_CONFIG;
  if (!cfg) return;
  const host = document.querySelector('#missionGrid');
  if (!host) return;

  function localProgress(session){
    if (!session.storageKey) return null;
    try{
      const raw = localStorage.getItem(session.storageKey);
      if(!raw) return {pct:0,label:'Pas encore commencée sur cet appareil',action:'Entrer dans la mission'};
      const state = JSON.parse(raw);
      const frontier=Math.max(0,Math.min(9,Number(state.frontier)||0));
      const pct=Math.round(frontier/9*100);
      const labels=session.progressLabels||[];
      if(state.completed) return {pct:100,label:'Mission terminée sur cet appareil',action:'Revoir la mission'};
      return {pct,label:`En cours · ${labels[frontier]||`Activité ${frontier+1}`}`,action:'Continuer la mission'};
    }catch(_){return {pct:0,label:'Progression locale indisponible',action:'Entrer dans la mission'};}
  }

  const releasedThrough = Math.max(0, Math.min(cfg.sessions.length, Number(cfg.release?.releasedThrough)||0));
  const stateFor = (id) => id < releasedThrough ? 'review' : (id === releasedThrough ? 'open' : 'locked');
  [...document.querySelectorAll('.course-path .path-node')].forEach((n,i)=>n.classList.toggle('current',i===Math.max(0,releasedThrough-1)));
  const stateLabels = {open:'Mission actuelle',review:'Disponible en révision',locked:'Verrouillée'};

  host.innerHTML = cfg.sessions.map((s)=>{
    const state = stateFor(s.id), available = state !== 'locked', progress = localProgress(s);
    const actionLabel = state === 'review' ? 'Revoir la mission' : (progress?.action || 'Entrer dans la mission');
    const progressHtml = available && progress ? `<div class="local-progress"><div class="local-progress-head"><span>${progress.label}</span><span>${progress.pct}%</span></div><div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:${progress.pct}%"></div></div></div>` : '';
    const action = available ? `<div class="mission-action"><a class="btn primary" href="session-${s.id}/">${actionLabel} →</a></div>` : `<div class="locked-note"><b aria-hidden="true">○</b><span>S'ouvrira plus tard</span></div>`;
    return `<article class="mission-card"><div class="mission-top"><span class="mission-number">${s.number}</span><span class="state-badge ${state==='locked'?'locked':''}">${stateLabels[state]}</span></div><div class="mission-kicker">${s.kicker}</div><h3>${s.title}</h3><p class="mission-question">${s.question}</p><p class="mission-summary">${s.summary}</p><div class="objective-row">${s.objectives.map(o=>`<span>${o}</span>`).join('')}</div>${progressHtml}${action}</article>`;
  }).join('');

  const pill = document.querySelector('#courseProgress');
  if(pill) pill.textContent = releasedThrough > 0 ? `${releasedThrough} / ${cfg.sessions.length} séance${releasedThrough>1?'s':''} disponible${releasedThrough>1?'s':''} · séance ${releasedThrough} actuelle` : `Aucune séance ouverte`;
})();
