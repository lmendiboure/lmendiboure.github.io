(()=>{
  const D=window.PROJECTOR_DATA;
  let i=0, mode='work';
  const params=new URLSearchParams(location.search);
  const requested=Number(params.get('activity'));
  if(Number.isInteger(requested)&&requested>=1&&requested<=D.activities.length)i=requested-1;
  if(D.recap && (params.get('recap')==='1'||params.get('recap')==='true')) mode='recap';
  const scene=document.getElementById('scene');
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

  if(D.recap){
    const actions=document.querySelector('.top-actions');
    if(actions && !document.getElementById('recapBtn')){
      const b=document.createElement('button');
      b.className='btn'; b.id='recapBtn'; b.type='button'; b.textContent='Recap';
      b.onclick=()=>{mode='recap';render();};
      actions.insertBefore(b,actions.firstChild);
    }
  }

  function work(a){
    return `
      <span class="mode">YOUR TASK</span>
      <div class="question">${esc(a.work.question)}</div>
      <p class="support">${esc(a.work.support)}</p>
      <section class="task-panel">
        <div class="panel-kicker">Your group should produce</div>
        <div class="produce">${a.work.produce.map((x,n)=>`<div><b>${n+1}</b><span>${esc(x)}</span></div>`).join('')}</div>
      </section>`;
  }

  function rest(a){
    const s=a.stop;
    const probes=Array.isArray(s.probe)?s.probe:(s.probe?[s.probe]:[]);
    return `
      <span class="mode">CLASS DISCUSSION</span>
      <div class="question">${esc(s.question)}</div>
      <button class="flip-card" type="button" data-flip aria-pressed="false" aria-label="Turn the discussion card">
        <span class="flip-inner">
          <span class="flip-face flip-front">
            <span class="flip-kicker">Before we turn it</span>
            <strong>${esc(s.probeTitle||'A little further: what do you think about these points?')}</strong>
            ${probes.length?`<ul class="probe-list">${probes.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
            <small>Discuss these points together, then turn the card.</small>
          </span>
          <span class="flip-face flip-back">
            <span class="flip-kicker">What to keep</span>
            <strong class="addition-title">Add these ideas to what you have already established.</strong>
            ${s.complements?.length?`<ul class="complement-list">${s.complements.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
          </span>
        </span>
      </button>`;
  }

  function recap(){
    const r=D.recap||{};
    const blocks=Array.isArray(r.blocks)?r.blocks:[];
    const chain=Array.isArray(r.chain)?r.chain:[];
    const architecture=Array.isArray(r.architecture)?r.architecture:[];
    const useCases=Array.isArray(r.useCases)?r.useCases:[];
    const responsibilityRows=Array.isArray(r.responsibilityRows)?r.responsibilityRows:[];
    return `
      <div class="shell recap-head recap-head-visual">
        <div class="eyebrow">Session ${esc(D.session)} · common ground before we continue</div>
        <h1>${esc(r.title||'What we keep from last time')}</h1>
        <p>${esc(r.subtitle||'')}</p>
      </div>
      <div class="shell recap-stage recap-stage-visual">
        <section class="recap-overview-row">
          <article class="iot-definition-card">
            <span class="panel-kicker">WHAT IS AN IOT SYSTEM?</span>
            <h2>${esc(r.definition?.title||'')}</h2>
            <p>${esc(r.definition?.text||'')}</p>
          </article>
          <article class="iot-usecase-card">
            <span class="panel-kicker">WHY DO WE BUILD THEM?</span>
            <div class="usecase-cloud">${useCases.map(x=>`<span>${esc(x)}</span>`).join('')}</div>
          </article>
        </section>

        <section class="iot-architecture-card">
          <div class="architecture-title-row"><div><span class="panel-kicker">REFERENCE ARCHITECTURE</span><h2>One system, several levels — and explicit flows between them</h2></div><span class="architecture-caveat">Reference model, not a mandatory pipeline</span></div>
          <div class="iot-architecture-map">
            ${architecture.map((x,n)=>`${n?`<div class="iot-link"><b>${esc(x.linkFromPrevious||'↔')}</b><small>${esc(x.linkLabel||'')}</small></div>`:''}<article class="iot-level"><span class="iot-level-index">${esc(x.badge||String(n+1))}</span><h3>${esc(x.level||'')}</h3><p class="iot-equipment">${esc(x.equipment||'')}</p>${Array.isArray(x.roles)&&x.roles.length?`<div class="iot-role-list">${x.roles.map(v=>`<span>${esc(v)}</span>`).join('')}</div>`:''}</article>`).join('')}
          </div>
          ${r.architectureNote?`<div class="architecture-note"><b>Important:</b><span>${esc(r.architectureNote)}</span></div>`:''}
        </section>

        <section class="responsibility-mobility-card">
          <div><span class="panel-kicker">RESPONSIBILITIES DO NOT BELONG TO ONE FIXED BOX</span><h2>The equipment changes; the responsibilities remain useful.</h2></div>
          <div class="responsibility-lanes">${responsibilityRows.map(x=>`<article><strong>${esc(x.label||'')}</strong>${x.where?`<span class="where-pill">${esc(x.where)}</span>`:''}<p>${esc(x.text||'')}</p></article>`).join('')}</div>
          ${r.crossCutting?`<div class="crosscut-strip"><b>Across the whole system</b><span>${esc(r.crossCutting)}</span></div>`:''}
        </section>

        <section class="recap-principles">
          ${blocks.map((b,n)=>`<article><span>${n+1}</span><div><strong>${esc(b.title||'')}</strong>${Array.isArray(b.points)&&b.points.length?`<p>${esc(b.points[0])}</p>`:''}</div></article>`).join('')}
        </section>

        ${chain.length?`<section class="recap-chain-projector"><div class="panel-kicker">THE REASONING CHAIN ALREADY BUILT</div><div class="model-chain">${chain.map((x,n)=>`${n?'<b aria-hidden="true">→</b>':''}<span>${esc(x)}</span>`).join('')}</div></section>`:''}
        ${r.focus?`<section class="recap-focus"><span>TODAY</span><strong>${esc(r.focus)}</strong></section>`:''}
      </div>`;
  }

  function conclusion(){
    const c=D.conclusion||{};
    const points=Array.isArray(c.takeaways)?c.takeaways:[];
    const model=Array.isArray(c.model)?c.model:[];
    return `
      <div class="shell conclusion-head">
        <div class="eyebrow">Session ${esc(D.session)} · Conclusion</div>
        <h1>${esc(c.title||'What we keep')}</h1>
        <p>${esc(c.subtitle||'')}</p>
      </div>
      <div class="shell conclusion-stage">
        <section class="conclusion-takeaways" aria-label="Key ideas from the session">
          ${points.map((x,n)=>`<article><span>${n+1}</span><p>${esc(x)}</p></article>`).join('')}
        </section>
        ${model.length?`<section class="conclusion-model"><div class="panel-kicker">${esc(c.modelLabel||'THE MODEL WE KEEP')}</div><div class="model-chain">${model.map((x,n)=>`${n?'<b aria-hidden="true">→</b>':''}<span>${esc(x)}</span>`).join('')}</div></section>`:''}
        ${c.next?`<section class="conclusion-next"><span>${esc(c.nextLabel||'NEXT')}</span><strong>${esc(c.next)}</strong></section>`:''}
      </div>`;
  }

  function renderProgress(){
    const p=$('#progress');
    const finished=mode==='conclusion';
    const recapping=mode==='recap';
    const resume=Math.max(1,Number(D.recap?.resumeActivity)||1)-1;
    p.innerHTML=D.activities.map((a,n)=>`<span class="progress-step ${finished||(!recapping&&n<i)||(recapping&&n<resume)?'done':''} ${(!finished&&!recapping&&n===i)||(recapping&&n===resume)?'active':''}" aria-hidden="true"></span>`).join('');
  }

  function render(){
    if(mode==='recap'){
      const resume=Math.max(1,Math.min(D.activities.length,Number(D.recap?.resumeActivity)||1));
      scene.innerHTML=recap();
      $('#screenCount').textContent=`Recap · resume at ${resume}`;
      $('#back').disabled=true;
      $('#next').textContent=`Continue to Activity ${resume} →`;
      $('#next').disabled=false;
      renderProgress();
      return;
    }
    if(mode==='conclusion'){
      scene.innerHTML=conclusion();
      $('#screenCount').textContent='Conclusion';
      $('#back').disabled=false;
      $('#next').textContent='Session complete';
      $('#next').disabled=true;
      renderProgress();
      return;
    }

    const a=D.activities[i],st=mode==='stop'&&a.stop;
    scene.innerHTML=`
      <div class="shell scene-head">
        <div><div class="eyebrow">Activity ${i+1} of ${D.activities.length} · ${st?'DISCUSSION':'ACTIVITY'}</div><h1>${esc(a.title)}</h1></div>
        <div class="time">${esc(st?(a.stopTime||'restitution'):(a.workTime||'work'))}</div>
      </div>
      <div class="shell stage">${st?rest(a):work(a)}</div>`;
    $('#screenCount').textContent=`${i+1}/${D.activities.length} · ${st?'DISCUSSION':'ACTIVITY'}`;
    $('#back').disabled=i===0&&mode==='work';
    const final=i===D.activities.length-1;
    if(mode==='work') $('#next').textContent=a.stop?'Discuss together →':(final?'Conclusion →':'Next activity →');
    else $('#next').textContent=final?'Conclusion →':'Next activity →';
    $('#next').disabled=false;
    renderProgress();
  }

  function advance(){
    if(mode==='conclusion')return;
    if(mode==='recap'){
      i=Math.max(0,Math.min(D.activities.length-1,(Number(D.recap?.resumeActivity)||1)-1));
      mode='work'; render(); return;
    }
    const a=D.activities[i];
    if(mode==='work'&&a.stop){mode='stop';}
    else if(i<D.activities.length-1){i++;mode='work';}
    else{mode='conclusion';}
    render();
  }

  function back(){
    if(mode==='recap')return;
    if(mode==='conclusion'){
      i=D.activities.length-1;
      mode=D.activities[i].stop?'stop':'work';
    }else if(mode==='stop') mode='work';
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
    else if(/^[1-9]$/.test(e.key)){const n=Number(e.key)-1;if(n<D.activities.length){i=n;mode='work';render();}}
    else if(e.key.toLowerCase()==='r'&&D.recap){mode='recap';render();}
    else if(e.key.toLowerCase()==='f')document.documentElement.requestFullscreen?.();
  });
  render();
})();
