(()=>{
  const D=window.PROJECTOR_DATA;
  let i=0, mode='work';
  const scene=document.getElementById('scene');
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

  function work(a){
    return `
      <span class="mode">À VOUS</span>
      <div class="question">${esc(a.work.question)}</div>
      <p class="support">${esc(a.work.support)}</p>
      <section class="task-panel">
        <div class="panel-kicker">À produire dans votre groupe</div>
        <div class="produce">${a.work.produce.map((x,n)=>`<div><b>${n+1}</b><span>${esc(x)}</span></div>`).join('')}</div>
      </section>`;
  }

  function rest(a){
    const s=a.stop;
    const probes=Array.isArray(s.probe)?s.probe:(s.probe?[s.probe]:[]);
    return `
      <span class="mode">DISCUSSION</span>
      <div class="question">${esc(s.question)}</div>
      <button class="flip-card" type="button" data-flip aria-pressed="false" aria-label="Retourner la carte de discussion">
        <span class="flip-inner">
          <span class="flip-face flip-front">
            <span class="flip-kicker">Avant de retourner</span>
            <strong>${esc(s.probeTitle||'Et sur ces points-là ?')}</strong>
            ${probes.length?`<ul class="probe-list">${probes.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
            <small>Discutez d’abord à partir de vos propres résultats, puis retournez la carte.</small>
          </span>
          <span class="flip-face flip-back">
            <span class="flip-kicker">À ajouter à vos conclusions</span>
            <strong class="addition-title">Quelques éléments complémentaires à garder en tête.</strong>
            ${s.complements?.length?`<ul class="complement-list">${s.complements.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
          </span>
        </span>
      </button>`;
  }

  function finalHtml(){
    const f=D.final;
    return `
      <span class="mode">FIN DE SÉANCE</span>
      <div class="final-title">${esc(f.title)}</div>
      <p class="support final-support">${esc(f.support)}</p>
      <div class="final-grid">${f.points.map((x,n)=>`<div class="final-card"><b>${String(n+1).padStart(2,'0')}</b><strong>${esc(x.title)}</strong><span>${esc(x.text)}</span></div>`).join('')}</div>
      <div class="final-iot"><b>UN MOT POUR UNE PARTIE DU SYSTÈME</b><strong>${esc(f.iotTitle)}</strong><span>${esc(f.iotText)}</span></div>
      <div class="final-bridge"><b>SÉANCE 2</b><strong>${esc(f.bridge)}</strong></div>`;
  }

  function renderProgress(){
    const p=$('#progress');
    p.innerHTML=D.activities.map((a,n)=>`<span class="progress-step ${n<i?'done':''} ${n===i&&mode!=='final'?'active':''}" aria-hidden="true"></span>`).join('');
  }

  function render(){
    if(mode==='final'){
      scene.innerHTML=`<div class="shell scene-head"><div><div class="eyebrow">Séance 1 · clôture</div><h1>Synthèse</h1></div><div class="time">2 min</div></div><div class="shell stage">${finalHtml()}</div>`;
      $('#screenCount').textContent='S1 · SYNTHÈSE';
      $('#back').disabled=false;
      $('#next').textContent='Revenir au début ↺';
      renderProgress();
      return;
    }
    const a=D.activities[i],st=mode==='stop'&&a.stop;
    scene.innerHTML=`
      <div class="shell scene-head">
        <div><div class="eyebrow">Activité ${i+1} / ${D.activities.length} · ${st?'DISCUSSION':'TRAVAIL'}</div><h1>${esc(a.title)}</h1></div>
        <div class="time">${esc(st?(a.stopTime||'discussion'):(a.workTime||'travail'))}</div>
      </div>
      <div class="shell stage">${st?rest(a):work(a)}</div>`;
    $('#screenCount').textContent=`${i+1}/${D.activities.length} · ${st?'DISCUSSION':'TRAVAIL'}`;
    $('#back').disabled=i===0&&mode==='work';
    $('#next').textContent=mode==='work'?(a.stop?'Discuter ensemble →':(i===D.activities.length-1?'Synthèse →':'Activité suivante →')):(i===D.activities.length-1?'Synthèse →':'Activité suivante →');
    renderProgress();
  }

  function advance(){
    if(mode==='final'){i=0;mode='work';render();return;}
    const a=D.activities[i];
    if(mode==='work'&&a.stop) mode='stop';
    else if(i<D.activities.length-1){i++;mode='work';}
    else mode='final';
    render();
  }

  function back(){
    if(mode==='final'){i=D.activities.length-1;mode=D.activities[i].stop?'stop':'work';render();return;}
    if(mode==='stop') mode='work';
    else if(i>0){i--;mode=D.activities[i].stop?'stop':'work';}
    render();
  }

  scene.addEventListener('click',e=>{
    const card=e.target.closest('[data-flip]');
    if(!card)return;
    const flipped=card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed',String(flipped));
  });

  $('#back').onclick=back;
  $('#next').onclick=advance;
  $('#fullscreen').onclick=()=>document.documentElement.requestFullscreen?.();
  document.addEventListener('keydown',e=>{
    if(e.target.matches('input,select,button,a'))return;
    if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();advance();}
    else if(e.key==='ArrowLeft'){e.preventDefault();back();}
    else if(e.key.toLowerCase()==='f')document.documentElement.requestFullscreen?.();
  });
  render();
})();
