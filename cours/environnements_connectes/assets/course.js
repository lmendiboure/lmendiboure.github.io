(() => {
  const cfg = window.ENV_COURSE_CONFIG;
  if (!cfg) return;
  const host = document.querySelector('#missionGrid');
  if (!host) return;

  function localProgress(session){
    if (!session.storageKey) return null;
    try{
      const raw = localStorage.getItem(session.storageKey);
      if(!raw) return {pct:0,label:'Dossier local vierge',action:'Ouvrir le dossier'};
      const state = JSON.parse(raw);
      const frontier=Math.max(0,Math.min(9,Number(state.frontier)||0));
      const pct=Math.round(frontier/9*100);
      const labels=session.progressLabels||[];
      if(state.completed) return {pct:100,label:'Dossier de l’épisode finalisé',action:'Rouvrir le dossier'};
      return {pct,label:`Dossier en cours · ${labels[frontier]||`Étape ${frontier+1}`}`,action:'Reprendre le dossier'};
    }catch(_){return {pct:0,label:'Dossier local indisponible',action:'Ouvrir le dossier'};}
  }

  const releasedThrough = Math.max(0, Math.min(cfg.sessions.length, Number(cfg.release?.releasedThrough)||0));
  const stateFor = (id) => id < releasedThrough ? 'review' : (id === releasedThrough ? 'open' : 'locked');
  [...document.querySelectorAll('.course-path .path-node')].forEach((n,i)=>n.classList.toggle('current',i===Math.max(0,releasedThrough-1)));
  const stateLabels = {open:'Épisode actif',review:'Dossier consultable',locked:'À venir'};

  host.innerHTML = cfg.sessions.map((s)=>{
    const state = stateFor(s.id), available = state !== 'locked', progress = localProgress(s);
    const actionLabel = state === 'review' ? 'Rouvrir le dossier' : (progress?.action || 'Ouvrir le dossier');
    const progressHtml = available && progress ? `<div class="local-progress"><div class="local-progress-head"><span>${progress.label}</span><span>${progress.pct}%</span></div><div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:${progress.pct}%"></div></div></div>` : '';
    const action = available ? `<div class="mission-action"><a class="btn primary" href="session-${s.id}/">${actionLabel} →</a></div>` : `<div class="locked-note"><b aria-hidden="true">○</b><span>Dossier non ouvert</span></div>`;
    return `<article class="mission-card"><div class="mission-top"><span class="mission-number">${s.number}</span><span class="state-badge ${state==='locked'?'locked':''}">${stateLabels[state]}</span></div><div class="episode-meta"><span>${s.episode||''}</span><span>${s.timecode||''}</span></div><div class="mission-kicker">${s.kicker}</div><h3>${s.title}</h3><p class="mission-question">${s.question}</p>${s.story?`<div class="story-premise">${s.story}</div>`:''}<p class="mission-summary">${s.summary}</p><div class="objective-row">${s.objectives.map(o=>`<span>${o}</span>`).join('')}</div>${progressHtml}${action}</article>`;
  }).join('');

  const pill = document.querySelector('#courseProgress');
  if(pill) pill.textContent = releasedThrough > 0 ? `Épisode actif · ${String(releasedThrough).padStart(2,'0')} / ${String(cfg.sessions.length).padStart(2,'0')}` : `Dossier non ouvert`;
})();
