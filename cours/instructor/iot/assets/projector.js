(()=>{
  const D=window.PROJECTOR_DATA;
  let i=0, mode='work';
  const scene=document.getElementById('scene');
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

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

  function renderProgress(){
    const p=$('#progress');
    p.innerHTML=D.activities.map((a,n)=>`<span class="progress-step ${n<i?'done':''} ${n===i?'active':''}" aria-hidden="true"></span>`).join('');
  }

  function render(){
    const a=D.activities[i],st=mode==='stop'&&a.stop;
    scene.innerHTML=`
      <div class="shell scene-head">
        <div><div class="eyebrow">Activity ${i+1} of ${D.activities.length} · ${st?'DISCUSSION':'ACTIVITY'}</div><h1>${esc(a.title)}</h1></div>
        <div class="time">${esc(st?(a.stopTime||'restitution'):(a.workTime||'work'))}</div>
      </div>
      <div class="shell stage">${st?rest(a):work(a)}</div>`;
    $('#screenCount').textContent=`${i+1}/${D.activities.length} · ${st?'DISCUSSION':'ACTIVITY'}`;
    $('#back').disabled=i===0&&mode==='work';
    $('#next').textContent=mode==='work'?(a.stop?'Discuss together →':(i===D.activities.length-1?'Session complete':'Next activity →')):(i===D.activities.length-1?'Session complete':'Next activity →');
    $('#next').disabled=mode==='stop'&&i===D.activities.length-1;
    renderProgress();
  }

  function advance(){
    const a=D.activities[i];
    if(mode==='work'&&a.stop) mode='stop';
    else if(i<D.activities.length-1){i++;mode='work';}
    render();
  }

  function back(){
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
