(()=>{
  const D=window.PROJECTOR_DATA;
  let i=0, mode='work';
  const scene=document.getElementById('scene');
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

  function work(a){
    return `
      <span class="mode">WORK</span>
      <div class="question">${esc(a.work.question)}</div>
      <p class="support">${esc(a.work.support)}</p>
      <section class="task-panel">
        <div class="panel-kicker">Students produce</div>
        <div class="produce">${a.work.produce.map((x,n)=>`<div><b>${n+1}</b><span>${esc(x)}</span></div>`).join('')}</div>
      </section>`;
  }


  function rest(a){
    const s=a.stop;
    return `
      <span class="mode">RESTITUTION · DISCUSS → FLIP ONCE</span>
      <div class="question">${esc(s.question)}</div>
      <div class="discuss-strip">
        <b>Discuss first</b>
        <span>${esc(s.compare)}</span>
      </div>
      <button class="flip-card" type="button" data-flip aria-pressed="false" aria-label="Flip the teaching card">
        <span class="flip-inner">
          <span class="flip-face flip-front">
            <span class="flip-kicker">After the discussion</span>
            <strong>Students reveal their own takeaway first. Then flip once for the additions.</strong>
            <small>The Projector adds what matters; it does not repeat their card.</small>
          </span>
          <span class="flip-face flip-back">
            <span class="flip-kicker">Important complements</span>
            <strong class="addition-title">Add these points to the student takeaway.</strong>
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
        <div><div class="eyebrow">Activity ${i+1} of ${D.activities.length} · ${st?'RESTITUTION':'WORK'}</div><h1>${esc(a.title)}</h1></div>
        <div class="time">${esc(st?(a.stopTime||'restitution'):(a.workTime||'work'))}</div>
      </div>
      <div class="shell stage">${st?rest(a):work(a)}</div>`;
    $('#screenCount').textContent=`${i+1}/${D.activities.length} · ${st?'STOP':'WORK'}`;
    $('#back').disabled=i===0&&mode==='work';
    $('#next').textContent=mode==='work'?(a.stop?'Start restitution →':(i===D.activities.length-1?'Session complete':'Next activity →')):(i===D.activities.length-1?'Session complete':'Next activity →');
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
