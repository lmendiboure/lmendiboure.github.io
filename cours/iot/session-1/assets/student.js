(() => {
  const root = document.querySelector('.student-page');
  if (!root) return;

  const STORAGE_KEY = 'iot-systems-design-session1-v18';
  const defaultState = {
    version: 18,
    screen: 0,
    maxUnlockedScreen: 0,
    conceptUnlocks: {},
    stopChallenges: {},
    architectureV1: null,
    architectureV2: null,
    landscape: {},
    borderline: {},
    challengeProgress: {},
    adaptiveDepth: {},
    researchTrails: {},
    architectureChallenge: null,
    architectureResilience: null,
    flowLens: {flowIndex:null, requirements:[]},
    mythLab: {},
    layerTrap: {},
    shapeChallenge: {},
    techDiscovery: {},
    technologyCompare: {a:'lorawan', b:'cellular'},
    missingInfo: {},
    doubleStress: null,
    doubleResponse: null,
    components: [],
    flows: [],
    requirements: {},
    mystery: {},
    scenarios: {},
    campusDecision: {position:null, uncertainty:null},
    recall: {},
    lastTechnology: null,
    selectedStress: null,
    stressRequirement: null,
    stressResponse: null,
    revisionNote: '',
    loopClosure: {elements:[], rationale:''}
  };
  let state = structuredClone(defaultState);
  let nextComponentId = 1;
  let hintLevel = 0;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));


  const conceptDefs = {
    iot:{
      title:'Working view of IoT',
      bridge:'Your classifications crossed home, health, industry, mobility, energy and other domains. The application domain alone therefore does not explain what these systems have in common.',
      formal:'In this course, we will use <strong>IoT</strong> for systems in which physical entities are observed or acted upon and connected to digital services through communication and computation.',
      carry:'“Connected” is not enough by itself. When you meet a new system, trace its <strong>physical-world role</strong> and the <strong>end-to-end service</strong> it supports.',
      fieldSummary:'Physical entities are observed or acted upon and connected to digital services through communication and computation.',
      fieldKeep:'Connected alone is not the useful distinction: trace the physical-world role and the end-to-end service.',
      tags:['physical world','sense / act','communicate','digital service']
    },
    architecture:{
      title:'Architecture lens',
      bridge:'Your diagrams may use very different boxes. The challenge also showed that one physical node can perform several roles, while one responsibility can be distributed across several nodes.',
      formal:'A useful architecture lens is to separate <strong>responsibilities before products</strong>: Sense / Act · Communicate · Compute · Store · Use. These are functions of the system, not mandatory physical layers or boxes.',
      carry:'Follow the <strong>information flows</strong> between responsibilities. They reveal what must communicate, where dependencies appear, and where later technology choices can matter.',
      fieldSummary:'Separate responsibilities before products: Sense / Act · Communicate · Compute · Store · Use.',
      fieldKeep:'Responsibilities are not physical boxes. One device can implement several; one responsibility can span several devices.',
      tags:['responsibility ≠ device','flows matter','end to end']
    },
    requirements:{
      title:'Engineering vocabulary',
      bridge:'Different groups prioritised different concerns, and the challenge showed that even two flows inside the same system may not share the same priorities.',
      formal:'Engineers make these concerns explicit as <strong>requirements</strong>: range, data volume / throughput, latency, reliability, energy budget, scale, mobility, available infrastructure and cost. They become useful when attached to a particular flow or service need.',
      carry:'Before comparing communication technologies, identify <strong>which requirements dominate each important flow</strong>. A single system-wide Top 3 can hide meaningful differences.',
      fieldSummary:'Turn vague needs into explicit requirements that can change a design decision.',
      fieldKeep:'Range · data volume / throughput · latency · reliability · energy · scale · mobility · infrastructure · cost. Priorities may differ by flow.',
      tags:['name the constraint','prioritise','per-flow reasoning']
    },
    closedLoop:{
      title:'Closing the loop',
      bridge:'Monitoring only sends information away from the physical world. Once the system can act, commands, authority and evidence of the resulting physical state become part of the design.',
      formal:'A <strong>closed-loop IoT system</strong> links observation to decision and actuation, then feeds state back. A command being transmitted or acknowledged does not by itself prove that the physical action occurred.',
      carry:'Separate <strong>telemetry · command · acknowledgement · state feedback</strong>. Make override authority and safe behaviour explicit whenever the digital system can change the physical world.',
      fieldSummary:'Observation can become control: decision → command → actuation → state feedback.',
      fieldKeep:'Command sent ≠ action performed. Model feedback, authority and failure of the physical actuator.',
      tags:['telemetry ≠ command','feedback','human override','physical effect']
    },
    technology:{
      title:'Technology decision rule',
      bridge:'The same application need can produce different communication structures: nearby peer, local access point, private gateway infrastructure or operator network. The challenge showed that access technology alone does not describe every dependency in the path.',
      formal:'Technology names should therefore come <strong>after the communication problem and network shape</strong>. First characterise what the flow needs and how the network must be organised; then identify technology families that can implement that shape.',
      carry:'Whenever you choose a technology, ask: <strong>what else did we implicitly choose?</strong> Gateways, access points, operator coverage, spectrum, topology and upstream services may all become part of the design.',
      fieldSummary:'Communication problem → network shape → technology family.',
      fieldKeep:'A technology choice can also imply infrastructure, ownership and dependencies. Comparable choices need not sit at the same abstraction level.',
      tags:['problem → shape → family','implicit infrastructure','validity domain']
    }
  };
  const conceptOrder=['iot','architecture','closedLoop','requirements','technology'];
  const stopChallengeDefs={
    landscape:{title:'Connected is not enough',prompt:'A Raspberry Pi hosts a normal web page but senses or controls nothing in the physical world. Would you call that IoT? Defend the boundary you are using.'},
    architecture:{title:'One box, many responsibilities',prompt:'Suppose one Raspberry Pi senses, stores, computes and serves the dashboard. How many architectural responsibilities exist — and how many physical boxes?'},
    requirements:{title:'Same system, different flow',prompt:'Now make the indoor sensor mains-powered while the outdoor node remains battery-powered. Should Energy still have the same importance for every communication flow?'},
    closedLoop:{title:'Delivery is not physical success',prompt:'The command reaches the ventilation controller and is acknowledged, but a jammed actuator never opens the damper. What evidence would expose this failure, and where should it appear in the loop?'},
    technology:{title:'Access is not the whole system',prompt:'A LoRaWAN sensor can still reach its gateway, but the gateway loses its upstream Internet path. Which part of the architecture failed — and what does that tell you about “choosing a technology”?' }
  };

  function renderStopRitual(){
    document.querySelectorAll('[data-stop-challenge]').forEach(host=>{
      const id=host.dataset.stopChallenge,d=stopChallengeDefs[id],shown=!!state.stopChallenges?.[id]; if(!d)return;
      host.innerHTML=`<div class="ritual-card challenge"><span class="ritual-kicker">3 · Challenge</span><strong>${d.title}</strong>${shown?`<p>${d.prompt}</p>`:`<p>When your teacher asks, reveal one counterexample that tests the class rule.</p><button type="button" class="btn soft reveal-stop-challenge" data-id="${id}">Reveal teacher challenge</button>`}</div>`;
    });
    document.querySelectorAll('.reveal-stop-challenge').forEach(b=>b.addEventListener('click',()=>{state.stopChallenges={...(state.stopChallenges||{}),[b.dataset.id]:true};saveState();renderStopRitual();}));
    document.querySelectorAll('[data-concept]').forEach(host=>{
      const id=host.dataset.concept,d=conceptDefs[id],unlocked=!!state.conceptUnlocks?.[id]; if(!d)return;
      host.innerHTML=`<div class="ritual-card unlock ${unlocked?'unlocked':''}"><span class="ritual-kicker">4 · Unlock</span>${unlocked?`<strong>${d.title}</strong><div class="unlock-sequence"><section><span>From your discussion</span><p>${d.bridge}</p></section><section><span>Formalise it</span><p>${d.formal}</p></section><section class="carry"><span>Carry it forward</span><p>${d.carry}</p></section></div><div class="chip-row unlock-tags">${d.tags.map(x=>`<span class="chip">${x}</span>`).join('')}</div>`:`<strong>Consolidate what the class just discovered.</strong><p>After the comparison and counterexample, connect your observations to the formal concept before moving on.</p><button type="button" class="btn primary unlock-concept" data-id="${id}">Consolidate what we keep</button>`}</div>`;
    });
    document.querySelectorAll('.unlock-concept').forEach(b=>b.addEventListener('click',()=>{state.conceptUnlocks={...(state.conceptUnlocks||{}),[b.dataset.id]:true};saveState();renderStopRitual();renderFieldGuide();updateStopNextButtons();}));
    updateStopNextButtons();
  }
  function updateStopNextButtons(){document.querySelectorAll('[data-requires-unlock]').forEach(b=>{b.disabled=!state.conceptUnlocks?.[b.dataset.requiresUnlock];});}
  function renderFieldGuide(){
    const count=conceptOrder.filter(id=>state.conceptUnlocks?.[id]).length;
    const btn=$('#fieldGuideBtn'),counter=$('#fieldGuideCount'); if(btn)btn.hidden=count===0;if(counter)counter.textContent=`${count}/5`;
    const host=$('#fieldGuideContent');if(!host)return;
    host.innerHTML=`<div class="field-guide-progress"><strong>${count} / 5 concepts unlocked</strong><span>Compact reference cards from concepts consolidated after discussion.</span></div>${conceptOrder.map((id,i)=>{const d=conceptDefs[id],on=!!state.conceptUnlocks?.[id];return `<section class="guide-entry ${on?'':'locked'}"><span class="guide-number">${i+1}</span><div>${on?`<strong>${d.title}</strong><p>${d.fieldSummary}</p><div class="guide-keep">${d.fieldKeep}</div><div class="chip-row">${d.tags.map(x=>`<span class="chip">${x}</span>`).join('')}</div>`:`<strong>Concept locked</strong><p>Complete the corresponding STOP discussion first.</p>`}</div></section>`}).join('')}`;
  }

  const challengeIds=['architecture','requirements','discover','stress'];
  function markChallenge(id){ if(!id)return; state.challengeProgress={...(state.challengeProgress||{}),[id]:true}; saveState(); renderExpertProgress(); }
  function renderExpertProgress(){
    const n=challengeIds.filter(id=>state.challengeProgress?.[id]).length;
    const pill=$('#expertProgress'); if(pill){pill.textContent=`Depth trail ${n}/4`;pill.classList.toggle('active',n>0);}
    const finish=$('#expertFinish'); if(finish) finish.innerHTML=`<span>Optional depth trail</span><strong>${n} / 4 explored</strong><small>Challenge routes use the same concepts with less guidance. They are optional and not graded.</small>`;
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) state = {...structuredClone(defaultState), ...JSON.parse(saved)};
      state.maxUnlockedScreen = Math.max(Number(state.maxUnlockedScreen)||0, Number(state.screen)||0);
      nextComponentId = Math.max(1, ...state.components.map(c => Number(c.id) || 0)) + 1;
    } catch (_) {}
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      const pill = $('#saveState');
      if (pill) {
        pill.textContent = 'Saved on this device';
        pill.classList.add('saved-flash');
        setTimeout(() => pill.classList.remove('saved-flash'), 240);
      }
    } catch (_) {
      const pill = $('#saveState');
      if (pill) pill.textContent = 'Local save unavailable';
    }
  }

  /* ---------- Navigation ---------- */
  const stepLabels = [
    ['1','Map the IoT landscape'], ['2','Architecture v1'], ['3','Close the loop'], ['4','Requirements'], ['5','Network shapes'], ['6','Technologies'], ['7','Choose'], ['8','Stress-test']
  ];
  const screenToStep = [0,0,1,1,2,2,3,3,4,5,6,6,7,7];
  const stepEntryScreens = [0,2,4,6,8,9,10,12];

  function renderStepper() {
    const host = $('#stepper');
    if (!host) return;
    const viewedStep = screenToStep[state.screen] ?? 0;
    const frontierScreen = Math.max(Number(state.maxUnlockedScreen)||0, Number(state.screen)||0);
    const frontierStep = screenToStep[frontierScreen] ?? 0;
    host.innerHTML = stepLabels.map(([n,label], i) => {
      const unlocked = stepEntryScreens[i] <= frontierScreen;
      const isViewed = i === viewedStep;
      const isFrontier = i === frontierStep;
      const cls = [
        'step-dot',
        !unlocked ? 'locked' : '',
        unlocked && i < frontierStep && !isViewed ? 'done' : '',
        isViewed && state.screen < frontierScreen ? 'reviewing' : '',
        isViewed && state.screen === frontierScreen ? 'active' : '',
        isFrontier && state.screen < frontierScreen ? 'frontier' : ''
      ].filter(Boolean).join(' ');
      const status = !unlocked ? 'locked' : (isViewed && state.screen < frontierScreen ? 'reviewing' : (isFrontier ? 'current mission' : 'completed'));
      return `<button type="button" class="${cls}" data-step-target="${stepEntryScreens[i]}" ${unlocked?'':'disabled'} ${isViewed?'aria-current="step"':''} aria-label="${label}: ${status}">
        <span>${unlocked && i < frontierStep ? '✓' : n}</span><small>${label}</small>
      </button>`;
    }).join('');
    host.querySelectorAll('[data-step-target]:not(:disabled)').forEach(b=>b.addEventListener('click',()=>showScreen(+b.dataset.stepTarget)));
  }

  function renderHistoryNav(){
    const host=$('#historyNav'); if(!host)return;
    const frontier=Math.max(Number(state.maxUnlockedScreen)||0,Number(state.screen)||0);
    const reviewing=state.screen<frontier;
    if(state.screen===0 && frontier===0){host.hidden=true;host.innerHTML='';return;}
    host.hidden=false;
    const previous=state.screen>0?`<button type="button" class="btn ghost history-previous" data-history-target="${state.screen-1}">← Previous</button>`:'<span></span>';
    host.innerHTML=`${previous}<div class="history-status ${reviewing?'reviewing':''}"><strong>${reviewing?'Review mode':'Current mission'}</strong><span>${reviewing?'You are revisiting work already completed. Future information stays gated.':'You are at the furthest point currently unlocked.'}</span></div>${reviewing?`<button type="button" class="btn soft history-return" data-history-target="${frontier}">Return to current mission →</button>`:'<span></span>'}`;
    host.querySelectorAll('[data-history-target]').forEach(b=>b.addEventListener('click',()=>showScreen(+b.dataset.historyTarget)));
  }

  function showScreen(index, {scroll = true, unlock = false} = {}) {
    index = Math.max(0, Math.min(Math.max(...$$('.activity-screen').map(s=>Number(s.dataset.screen)||0)), Number(index) || 0));
    const frontier=Math.max(Number(state.maxUnlockedScreen)||0,Number(state.screen)||0);
    if(index>frontier && !unlock){flashMessage('That stage is still locked. Continue from your current mission first.');return false;}
    const previousScreen=state.screen;
    if(previousScreen===3 && index===4 && !state.architectureV1){captureArchitectureV1();}
    if(unlock && index>frontier) state.maxUnlockedScreen=index;
    else state.maxUnlockedScreen=frontier;
    state.screen = index;
    $$('.activity-screen').forEach(s => { s.hidden = Number(s.dataset.screen) !== index; });
    renderStepper(); renderHistoryNav();
    document.body.classList.toggle('past-intro', index > 0);
    const designButton = $('#designBtn');
    if (designButton) designButton.hidden = index < 2;
    renderArchitecture(); renderDesignDrawer(); renderStopSnapshots(); renderStopRitual(); renderFieldGuide(); renderRevisionStudio(); renderDesignEvolution();
    saveState();
    if (scroll) window.scrollTo({top: 0, behavior: 'smooth'});
    return true;
  }

  $$('.next-activity').forEach(btn => btn.addEventListener('click', () => showScreen(btn.dataset.next,{unlock:true})));

  /* ---------- IoT landscape ---------- */
  const landscapeDomains = [
    ['home','⌂','Home'],
    ['health','♥','Health'],
    ['industry','⚙','Industry'],
    ['agriculture','♧','Agriculture'],
    ['mobility','➜','Mobility'],
    ['energy','ϟ','Energy'],
    ['cities','▦','Smart cities'],
    ['logistics','▣','Logistics'],
    ['environment','◌','Environment']
  ];

  const landscapeCases = [
    {id:'vaccine', icon:'A', title:'Refrigerated vaccine shipment', clue:'Reports temperature and location while travelling between a hospital supplier and care sites.'},
    {id:'worker', icon:'B', title:'Connected worker safety badge', clue:'Detects falls and hazardous gases on an industrial site and can raise an alert.'},
    {id:'ev', icon:'C', title:'Adaptive EV charging point', clue:'Publishes availability and changes charging power according to electricity-grid conditions.'},
    {id:'bridge', icon:'D', title:'Railway bridge condition monitor', clue:'Measures structural vibration on infrastructure used by a transport network.'},
    {id:'irrigation', icon:'E', title:'Weather-aware irrigation controller', clue:'Combines soil and weather measurements to decide when agricultural watering is useful.'},
    {id:'battery', icon:'F', title:'Grid-responsive home battery', clue:'Stores household energy but can also react to requests from the electricity system.'},
    {id:'schoolair', icon:'G', title:'Air-quality sensing around schools', clue:'Measures pollution in public space where environmental conditions can affect people.'},
    {id:'warehouse', icon:'H', title:'Autonomous warehouse robot fleet', clue:'Moves goods, senses its surroundings and coordinates operations inside a logistics facility.'}
  ];
  let activeLandscapeCase = null;

  function landscapeSelection(caseId){
    const v=state.landscape?.[caseId];
    if(v && !Array.isArray(v) && typeof v==='object') return {primary:v.primary||null,secondary:v.secondary||null};
    if(Array.isArray(v)) return {primary:v[0]||null,secondary:v[1]||null};
    return {primary:null,secondary:null};
  }
  function selectedDomainsFor(caseId){const x=landscapeSelection(caseId);return [x.primary,x.secondary].filter(Boolean);}

  function domainName(id){const d=landscapeDomains.find(x=>x[0]===id);return d?d[2]:id||'';}
  function domainIcon(id){const d=landscapeDomains.find(x=>x[0]===id);return d?d[1]:'';}

  function renderLandscape(){
    const host=$('#useCaseGrid'); if(!host)return;
    host.innerHTML=landscapeCases.map(c=>{
      const sel=landscapeSelection(c.id), selected=selectedDomainsFor(c.id);
      const chips=sel.primary?`<span class="domain-chip primary"><b>Main</b> ${domainIcon(sel.primary)} ${domainName(sel.primary)}</span>${sel.secondary?`<span class="domain-chip secondary"><b>Also</b> ${domainIcon(sel.secondary)} ${domainName(sel.secondary)}</span>`:''}`:'<span class="domain-unlinked">No main domain chosen yet</span>';
      return `<button type="button" class="usecase-card ${sel.primary?'linked':''}" data-case="${c.id}"><span class="usecase-icon">${c.icon}</span><span class="usecase-copy"><span class="usecase-case">Case ${c.icon}</span><strong>${c.title}</strong><small>${c.clue}</small><span class="usecase-domains">${chips}</span></span><span class="usecase-action">${selected.length?'Edit':'Map it'} →</span></button>`;
    }).join('');
    host.querySelectorAll('.usecase-card').forEach(b=>b.addEventListener('click',()=>openDomainPicker(b.dataset.case)));
    const linked=landscapeCases.filter(c=>landscapeSelection(c.id).primary).length;
    const progress=$('#landscapeProgress'); if(progress)progress.textContent=`${linked} / ${landscapeCases.length} systems mapped`;
    const preview=$('#landscapeDomainPreview');
    if(preview){preview.innerHTML=landscapeDomains.map(([id,icon,name])=>{const count=landscapeCases.filter(c=>selectedDomainsFor(c.id).includes(id)).length;return `<span class="landscape-domain-count ${count?'used':''}"><b>${icon}</b>${name}<small>${count}</small></span>`;}).join('');}
    const next=$('#landscapeNext'); if(next)next.disabled=linked<landscapeCases.length;
    renderBorderlineChallenge(); renderStopSnapshots();
  }

  function openDomainPicker(caseId){
    activeLandscapeCase=caseId;
    const c=landscapeCases.find(x=>x.id===caseId); if(!c)return;
    $('#domainPickerTitle').textContent=c.title;
    $('#domainPickerCopy').textContent='First choice = main domain. Add one secondary domain only if it genuinely captures another side of the system.';
    renderDomainPickerChoices();
    $('#domainPicker').classList.add('open'); $('#domainPicker').setAttribute('aria-hidden','false'); $('#domainPickerScrim').hidden=false;
  }

  function renderDomainPickerChoices(){
    if(!activeLandscapeCase)return;
    const sel=landscapeSelection(activeLandscapeCase), host=$('#domainPickerChoices');
    host.innerHTML=landscapeDomains.map(([id,icon,name])=>{
      const role=sel.primary===id?'primary':sel.secondary===id?'secondary':'';
      return `<button type="button" class="domain-choice ${role?'selected '+role:''}" data-domain="${id}"><span>${icon}</span><strong>${name}</strong><small>${role==='primary'?'MAIN DOMAIN':role==='secondary'?'SECONDARY':'Choose'}</small></button>`;
    }).join('');
    host.querySelectorAll('.domain-choice').forEach(b=>b.addEventListener('click',()=>{
      const id=b.dataset.domain, current=landscapeSelection(activeLandscapeCase);
      if(current.primary===id){current.primary=current.secondary;current.secondary=null;}
      else if(current.secondary===id){current.secondary=null;}
      else if(!current.primary){current.primary=id;}
      else if(!current.secondary){current.secondary=id;}
      else {flashMessage('Two domains are enough: one main and one secondary.');return;}
      state.landscape[activeLandscapeCase]=current; saveState(); renderDomainPickerChoices(); renderLandscape();
    }));
    const n=[sel.primary,sel.secondary].filter(Boolean).length;
    $('#domainPickerHint').textContent=!sel.primary?'Choose a main domain.':sel.secondary?'Main + secondary selected.':'Main selected. A secondary domain is optional.';
    $('#doneDomainPicker').disabled=!sel.primary;
  }

  function closeDomainPicker(){
    if(activeLandscapeCase && !landscapeSelection(activeLandscapeCase).primary){flashMessage('Choose a main domain first.');return;}
    $('#domainPicker').classList.remove('open'); $('#domainPicker').setAttribute('aria-hidden','true'); $('#domainPickerScrim').hidden=true; activeLandscapeCase=null;
  }
  $('#closeDomainPicker')?.addEventListener('click',()=>{if(activeLandscapeCase && !landscapeSelection(activeLandscapeCase).primary){state.landscape[activeLandscapeCase]={primary:null,secondary:null};}$('#domainPicker').classList.remove('open');$('#domainPicker').setAttribute('aria-hidden','true');$('#domainPickerScrim').hidden=true;activeLandscapeCase=null;renderLandscape();});
  $('#doneDomainPicker')?.addEventListener('click',closeDomainPicker);
  $('#domainPickerScrim')?.addEventListener('click',()=>$('#closeDomainPicker')?.click());

  const borderlineCases=[
    {id:'webpi',title:'A Raspberry Pi only hosts a website',copy:'It is networked, but it does not sense or act on a physical process.',prompt:'Connected computer ≠ automatically IoT. What extra relationship with the physical world would change your answer?'},
    {id:'localnet',title:'Sensors report only to a local gateway',copy:'There is no public Internet connection, but physical measurements are networked and used locally.',prompt:'“Internet of Things” does not require every thing to talk directly to the public Internet. Where would you draw the boundary?'},
    {id:'robot',title:'An autonomous robot senses and acts, but never communicates',copy:'It interacts richly with the physical world but has no network interface.',prompt:'This overlaps with robotics and cyber-physical systems. Is networking essential to your working definition of IoT?'}
  ];
  function renderBorderlineChallenge(){
    const host=$('#borderlineChallenge');if(!host)return;
    host.innerHTML=`<p class="challenge-copy">These cases sit near the boundary. Commit to a position and prepare an argument; several answers can be defensible.</p><div class="micro-game-grid">${borderlineCases.map(c=>{const choice=state.borderline[c.id];return `<div class="micro-game-card"><strong>${c.title}</strong><small>${c.copy}</small><div class="micro-options">${['IoT','Not necessarily','Depends'].map(o=>`<button type="button" class="micro-option ${choice===o?'active':''}" data-borderline="${c.id}" data-choice="${o}">${o}</button>`).join('')}</div>${choice?`<div class="micro-feedback"><b>Discussion fuel</b>${c.prompt}</div>`:''}</div>`}).join('')}</div>`;
    host.querySelectorAll('[data-borderline]').forEach(b=>b.addEventListener('click',()=>{state.borderline[b.dataset.borderline]=b.dataset.choice;markChallenge('landscape');renderBorderlineChallenge();}));
  }


  /* ---------- Close the loop ---------- */
  const loopElements = [
    ['telemetry','Telemetry / sensed state','Bring CO₂ and relevant physical state into the digital system.'],
    ['decision','Decision / control policy','Decide whether and how the system should act.'],
    ['command','Command path','Carry the requested action toward the actuator/controller.'],
    ['actuator','Physical actuator','Change the physical process, here ventilation.'],
    ['ack','Command acknowledgement','Confirm receipt/handling at a digital endpoint — not physical success.'],
    ['feedback','Measured state feedback','Observe the resulting physical state after the command.'],
    ['override','Human override / authority','Make explicit who may supersede automation.'],
    ['safe','Safe/default behaviour','Define what should happen when control or feedback is unavailable.']
  ];

  function renderClosedLoop(){
    state.loopClosure = state.loopClosure && typeof state.loopClosure==='object' ? state.loopClosure : {elements:[],rationale:''};
    state.loopClosure.elements = Array.isArray(state.loopClosure.elements) ? state.loopClosure.elements : [];
    const host=$('#loopChoiceGrid');
    if(host){
      const chosen=new Set(state.loopClosure.elements);
      host.innerHTML=loopElements.map(([id,name,copy])=>`<button type="button" class="loop-choice ${chosen.has(id)?'active':''}" data-loop-element="${id}" aria-pressed="${chosen.has(id)?'true':'false'}"><strong>${esc(name)}</strong><span>${esc(copy)}</span></button>`).join('');
      host.querySelectorAll('[data-loop-element]').forEach(b=>b.addEventListener('click',()=>{
        const id=b.dataset.loopElement, set=new Set(state.loopClosure.elements||[]);
        if(set.has(id))set.delete(id);else set.add(id);
        state.loopClosure.elements=[...set]; saveState(); renderClosedLoop(); renderStopSnapshots();
      }));
    }
    const ta=$('#loopRationale');
    if(ta){
      if(document.activeElement!==ta)ta.value=state.loopClosure.rationale||'';
      ta.oninput=e=>{state.loopClosure.rationale=e.target.value;saveState();updateClosedLoopGate();renderStopSnapshots();};
    }
    updateClosedLoopGate();
  }
  function updateClosedLoopGate(){
    const next=$('#loopNext'); if(!next)return;
    const selected=(state.loopClosure?.elements||[]).length;
    const rationale=(state.loopClosure?.rationale||'').trim();
    next.disabled=selected<5||rationale.length<40;
  }


  /* ---------- Architecture ---------- */
  const canvas = $('#canvas');
  const flowSvg = $('#flowSvg');
  const componentInput = $('#componentInput');
  const flowFrom = $('#flowFrom');
  const flowTo = $('#flowTo');

  function architectureIsFrozen(){ return !!state.architectureV1; }

  function addComponent(name) {
    if(architectureIsFrozen()){flashMessage('Architecture v1 is frozen. Revisions belong in Architecture v2 after the incident.');return;}

    name = name.trim();
    if (!name) return;
    const i = state.components.length;
    state.components.push({id: nextComponentId++, name, x: 30 + (i % 4) * 190, y: 35 + Math.floor(i / 4) * 120});
    saveState();
    renderArchitecture();
  }

  function removeComponent(id) {
    if(architectureIsFrozen()){flashMessage('Architecture v1 is frozen. Review it here; revise it later as v2.');return;}
    state.components = state.components.filter(c => c.id !== id);
    state.flows = state.flows.filter(f => f.from !== id && f.to !== id);
    saveState();
    renderArchitecture();
  }

  function renderArchitecture() {
    if (!canvas) return;
    const frozen=architectureIsFrozen();
    const frozenNotice=$('#architectureFrozenNotice'); if(frozenNotice) frozenNotice.hidden=!frozen;
    const activity=$('[data-screen="2"]'); if(activity) activity.classList.toggle('architecture-frozen',frozen);
    canvas.querySelectorAll('.arch-node').forEach(n => n.remove());
    $('#canvasEmpty').hidden = state.components.length > 0;

    state.components.forEach((c, index) => {
      const node = document.createElement('div');
      node.className = 'arch-node';
      node.dataset.id = c.id;
      node.style.left = `${Number.isFinite(c.x) ? c.x : 30 + (index % 4) * 190}px`;
      node.style.top = `${Number.isFinite(c.y) ? c.y : 35 + Math.floor(index / 4) * 120}px`;
      node.innerHTML = `<div class="arch-node-top"><span class="node-type-dot"></span><span class="arch-node-name">${esc(c.name)}</span>${frozen?'':'<button class="icon-button remove-node" type="button" aria-label="Remove '+esc(c.name)+'">×</button>'}</div>`;
      canvas.appendChild(node);
      node.querySelector('.remove-node')?.addEventListener('click', e => { e.stopPropagation(); removeComponent(c.id); });

      let drag = null;
      node.addEventListener('pointerdown', e => {
        if (frozen) return;
        if (e.target.closest('button')) return;
        const nr = node.getBoundingClientRect();
        const cr = canvas.getBoundingClientRect();
        drag = {dx: e.clientX - nr.left, dy: e.clientY - nr.top, cr};
        node.setPointerCapture(e.pointerId);
      });
      node.addEventListener('pointermove', e => {
        if (!drag) return;
        const nr = node.getBoundingClientRect();
        let x = e.clientX - drag.cr.left - drag.dx;
        let y = e.clientY - drag.cr.top - drag.dy;
        x = Math.max(8, Math.min(drag.cr.width - nr.width - 8, x));
        y = Math.max(8, Math.min(drag.cr.height - nr.height - 8, y));
        node.style.left = `${x}px`; node.style.top = `${y}px`;
        drawFlows();
      });
      function stop(e) {
        if (!drag) return;
        c.x = parseFloat(node.style.left) || 0;
        c.y = parseFloat(node.style.top) || 0;
        drag = null;
        if (node.hasPointerCapture(e.pointerId)) node.releasePointerCapture(e.pointerId);
        saveState(); drawFlows();
      }
      node.addEventListener('pointerup', stop);
      node.addEventListener('pointercancel', stop);
    });

    renderMobileComponents();
    renderMobileGraph();
    renderFlowSelectors();
    renderFlowList();
    const lockIds=['componentInput','flowFrom','flowTo','flowLabel','addFlow','clearArchitecture'];
    lockIds.forEach(id=>{const el=$('#'+id);if(el)el.disabled=frozen;});
    const componentSubmit=$('#componentForm button[type="submit"]');if(componentSubmit)componentSubmit.disabled=frozen;
    requestAnimationFrame(drawFlows);
    renderDesignDrawer();
    renderArchitectureChallenge(); renderFlowLens(); renderStopSnapshots();
  }

  function renderMobileComponents() {
    const host = $('#mobileComponents');
    if (!host) return;
    if (!state.components.length) { host.innerHTML = '<p class="empty-copy">No components yet.</p>'; return; }
    if(architectureIsFrozen()){host.innerHTML=state.components.map(c=>`<div class="mobile-node frozen"><span>${esc(c.name)}</span><small>v1</small></div>`).join('');return;}
    host.innerHTML = state.components.map((c,i) => `<div class="mobile-node"><span>${esc(c.name)}</span><div class="mobile-tools"><button class="icon-button mobile-up" data-i="${i}" type="button">↑</button><button class="icon-button mobile-down" data-i="${i}" type="button">↓</button><button class="icon-button mobile-remove" data-id="${c.id}" type="button">×</button></div></div>`).join('');
    host.querySelectorAll('.mobile-up').forEach(b => b.addEventListener('click', () => { const i=+b.dataset.i; if(i>0){[state.components[i-1],state.components[i]]=[state.components[i],state.components[i-1]]; saveState(); renderArchitecture();}}));
    host.querySelectorAll('.mobile-down').forEach(b => b.addEventListener('click', () => { const i=+b.dataset.i; if(i<state.components.length-1){[state.components[i+1],state.components[i]]=[state.components[i],state.components[i+1]]; saveState(); renderArchitecture();}}));
    host.querySelectorAll('.mobile-remove').forEach(b => b.addEventListener('click', () => removeComponent(+b.dataset.id)));
  }

  function renderFlowSelectors() {
    const options = '<option value="">Select…</option>' + state.components.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join('');
    flowFrom.innerHTML = options; flowTo.innerHTML = options;
  }

  function renderFlowList() {
    const host = $('#flowList');
    if (!host) return;
    if (!state.flows.length) { host.innerHTML = '<p class="empty-copy">No information flows yet.</p>'; return; }
    host.innerHTML = state.flows.map((f,i) => {
      const a = state.components.find(c => c.id === f.from), b = state.components.find(c => c.id === f.to);
      if (!a || !b) return '';
      return `<div class="list-item"><span><strong>${esc(a.name)}</strong> <span class="flow-arrow-inline">→</span> <strong>${esc(b.name)}</strong><small>${f.label ? esc(f.label) : 'unlabelled flow'}</small></span><button class="icon-button remove-flow" data-i="${i}" type="button">×</button></div>`;
    }).join('');
    host.querySelectorAll('.remove-flow').forEach(b => b.addEventListener('click', () => {state.flows.splice(+b.dataset.i,1); saveState(); renderArchitecture();}));
  }

  function drawFlows() {
    if (!flowSvg || !canvas) return;
    flowSvg.innerHTML = `<defs><marker id="arrowHead" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L8,3 z" class="arrowhead"/></marker></defs>`;
    const cr = canvas.getBoundingClientRect();
    state.flows.forEach(f => {
      const from = canvas.querySelector(`[data-id="${f.from}"]`), to = canvas.querySelector(`[data-id="${f.to}"]`);
      if (!from || !to) return;
      const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
      const x1 = a.left - cr.left + a.width/2, y1 = a.top - cr.top + a.height/2;
      const x2 = b.left - cr.left + b.width/2, y2 = b.top - cr.top + b.height/2;
      const dx = x2 - x1, dy = y2 - y1;
      const bend = Math.max(34, Math.min(110, Math.abs(dx)*.28));
      const c1x = x1 + (dx >= 0 ? bend : -bend), c2x = x2 - (dx >= 0 ? bend : -bend);
      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d',`M ${x1} ${y1} C ${c1x} ${y1}, ${c2x} ${y2}, ${x2} ${y2}`);
      path.setAttribute('marker-end','url(#arrowHead)');
      flowSvg.appendChild(path);
      if (f.label) {
        const text = document.createElementNS('http://www.w3.org/2000/svg','text');
        text.setAttribute('x',(x1+x2)/2); text.setAttribute('y',(y1+y2)/2-8); text.setAttribute('text-anchor','middle'); text.textContent=f.label;
        flowSvg.appendChild(text);
      }
    });
  }

  $('#componentForm').addEventListener('submit', e => {e.preventDefault(); addComponent(componentInput.value); componentInput.value=''; componentInput.focus();});
  $('#addFlow').addEventListener('click', () => {
    if(architectureIsFrozen()){flashMessage('Architecture v1 is frozen. Revisions belong in v2.');return;}
    const from=+flowFrom.value, to=+flowTo.value, label=$('#flowLabel').value.trim();
    if (!from || !to || from===to) return;
    state.flows.push({from,to,label}); $('#flowLabel').value=''; saveState(); renderArchitecture();
  });
  $('#clearArchitecture').addEventListener('click', () => { if(architectureIsFrozen()){flashMessage('Architecture v1 is frozen.');return;} if(confirm('Clear the current architecture?')){state.components=[];state.flows=[];saveState();renderArchitecture();}});
  window.addEventListener('resize', drawFlows);

  const componentHints = [
    'Trace the service backwards: what must the final user receive, and where does that information originate?',
    'Think in verbs: sense, communicate, compute, store, display, alert, act. Which verbs exist in this scenario?',
    'Your drawing may need things that interact with the physical world, communication paths, places that process or store data, and something that exposes the service. These do not have to be separate machines.'
  ];
  $('#componentHintBtn').addEventListener('click', () => {
    const box=$('#componentHint'); box.hidden=false; box.textContent=`Hint ${Math.min(hintLevel+1,3)}/3 · ${componentHints[Math.min(hintLevel,2)]}`; hintLevel=Math.min(hintLevel+1,2);
  });

  /* ---------- Requirement choices ---------- */
  const requirementDefs = [
    ['range','↔','How far?','How far must this specific link work?','Range / distance'],
    ['volume','▥','How much data?','How much is sent, how often, and in what bursts?','Data volume / throughput'],
    ['latency','◷','How soon?','How long can the application wait for this information?','Latency'],
    ['reliability','◆','How dependable?','What happens if information is lost, delayed or duplicated?','Reliability'],
    ['energy','ϟ','How long on limited energy?','How constrained is the device and its radio activity?','Energy budget'],
    ['scale','⋮','How many at once?','How many devices and flows may share the same resources?','Scale'],
    ['mobility','➜','Does it move?','Does the device move or change where it connects?','Mobility'],
    ['infra','⌂','What can we rely on?','What local, gateway or operator infrastructure is actually available?','Infrastructure'],
    ['cost','€','What can we afford?','What device, subscription, deployment and maintenance costs matter?','Cost']
  ];

  function renderRequirements() {
    const host=$('#requirementCards');
    host.innerHTML=requirementDefs.map(([id,icon,name,desc])=>{
      const v=state.requirements[id]||0;
      const selected=v>0, priority=v===2;
      return `<div class="requirement-card ${selected?'selected':''}"><button type="button" class="req-select" data-req="${id}"><span class="choice-icon">${icon}</span><span><strong>${name}</strong><small>${desc}</small></span></button><button type="button" class="req-priority ${priority?'priority':''}" data-priority="${id}" aria-label="${priority?'Remove '+name+' from top three':'Add '+name+' to top three'}" ${selected?'':'disabled'}>${priority?'★':'☆'}</button></div>`;
    }).join('');
    host.querySelectorAll('.req-select').forEach(b=>b.addEventListener('click',()=>toggleRequirement(b.dataset.req)));
    host.querySelectorAll('.req-priority').forEach(b=>b.addEventListener('click',()=>togglePriority(b.dataset.priority)));
    renderRequirementSummary();
    renderFlowLens(); renderStopSnapshots();
  }

  function toggleRequirement(id) {
    const current=state.requirements[id]||0;
    if(current){ delete state.requirements[id]; }
    else { state.requirements[id]=1; }
    saveState(); renderRequirements(); renderDesignDrawer();
  }

  function togglePriority(id) {
    const current=state.requirements[id]||0;
    if(!current) return;
    if(current===2){ state.requirements[id]=1; }
    else {
      const priorities=Object.values(state.requirements).filter(v=>v===2).length;
      if(priorities>=3){ flashMessage('You already have three priorities. Remove one star first.'); return; }
      state.requirements[id]=2;
    }
    saveState(); renderRequirements(); renderDesignDrawer();
  }

  function renderRequirementSummary() {
    const host=$('#requirementSummary');
    const selected=requirementDefs.filter(([id])=>state.requirements[id]);
    if(!selected.length){host.innerHTML='<span class="empty-copy">Nothing selected yet.</span>';return;}
    const priorities=selected.filter(([id])=>state.requirements[id]===2);
    host.innerHTML=selected.map(([id,,name])=>`<span class="chip ${state.requirements[id]===2?'priority':''}">${state.requirements[id]===2?'★ ':''}${name}</span>`).join('') + `<span class="priority-help">${priorities.length}/3 priorities starred</span>`;
    const next=$('#toStop2'); if(next) next.disabled=priorities.length!==3;
  }

  const referenceReqs = requirementDefs.map(([id,icon,name,desc,term])=>[term,name,desc]);
  const revealReqBtn=$('#revealRequirementVocabulary'); if(revealReqBtn) revealReqBtn.addEventListener('click', e => {
    const g=$('#referenceRequirementGrid'); if(!g)return; g.innerHTML=referenceReqs.map(([term,plain,d])=>`<div><strong>${term}</strong><small><b>${plain}</b> · ${d}</small></div>`).join(''); g.hidden=false; e.currentTarget.hidden=true;
  });

  /* ---------- Guided technology discovery ---------- */
  const discoveryFamilies = [
    {id:'ble', icon:'↔', title:'Nearby peer', question:'A small device mainly needs to talk to a nearby phone or gateway.', shape:['Device','Nearby peer'], name:'Bluetooth LE', essential:'Designed for low-energy local communication. A phone or nearby gateway is a very common architectural partner.', words:[['Peer','The nearby device at the other end of a direct communication relationship.'],['Radio mode','Different radio modes can trade speed for robustness and achievable range.']]},
    {id:'wifi', icon:'⌂', title:'Local access network', question:'Devices can join infrastructure that already provides local network connectivity.', shape:['Device','Access point','Local / IP network','Application'], name:'Wi-Fi', essential:'A natural family when a local wireless network exists and the application may need richer traffic or direct IP integration.', words:[['Access point','Local infrastructure that wireless devices join to reach the rest of the network.'],['IP network','The packet network used to reach other machines and services.']]},
    {id:'dot154', icon:'◇', title:'Low-power local building block', question:'Small local devices need basic radio exchange rules, while another stack can provide the rest of the networking system.', shape:['Device','Basic local radio/link rules','Higher-level networking','Application'], name:'IEEE 802.15.4', essential:'Think of this as a building block, not a complete IoT application architecture. It defines basic local radio transmission and channel-sharing behaviour.', words:[['PHY','Technical name for the rules that turn bits into signals over the physical radio link.'],['MAC','Technical name for rules that coordinate access to a shared communication medium.']]},
    {id:'lorawan', icon:'◜', title:'Gateway-based wide area', question:'Many constrained devices send small amounts of data over long distances through one or more gateways.', shape:['End device','Gateway(s)','Network service','Application'], name:'LoRaWAN', essential:'A low-power wide-area network architecture. Gateways relay device radio traffic toward network services; deployments can be private or shared/public.', words:[['Gateway','A system that connects one communication environment to another.'],['LoRa vs LoRaWAN','LoRa names the radio technology; LoRaWAN defines network rules and architecture above it.']]},
    {id:'cellular', icon:'▥', title:'Operator-managed wide area', question:'Devices need wide-area connectivity without you deploying local gateways, and a mobile operator provides service.', shape:['Device','Cellular base station','Operator network','Application'], name:'Cellular IoT', essential:'Common cellular IoT options include NB-IoT and LTE-M. They are delivered through operator infrastructure, so coverage and service availability are design assumptions.', words:[['Operator network','Infrastructure run by a mobile-network provider rather than by your local deployment.'],['NB-IoT / LTE-M','Two complementary cellular IoT technologies with different performance envelopes.']]}
  ];
  const plainGlossary = [
    ['Access point','Local wireless infrastructure that devices join to reach a network.'],
    ['Gateway','A system that connects or relays between different communication environments.'],
    ['Operator network','Connectivity infrastructure operated as a service by a mobile-network provider.'],
    ['Spectrum','The radio-frequency resource used for wireless transmission.'],
    ['PHY','The technical layer describing how bits are transmitted as physical signals.'],
    ['MAC','Rules coordinating who may use a shared communication medium and when.'],
    ['LPWAN','A broad family/category for low-power, wide-area networking; it is not one single protocol.']
  ];

  function renderTechDiscovery(){
    const host=$('#techDiscoveryGrid'); if(!host)return;
    host.innerHTML=discoveryFamilies.map((f,i)=>{const revealed=!!state.techDiscovery?.[f.id];return `<article class="discovery-card ${revealed?'revealed':''}"><div class="discovery-top"><span class="discovery-icon">${f.icon}</span><div><span class="eyebrow">Network shape ${i+1}</span><h3>${f.title}</h3></div></div><p>${f.question}</p><div class="shape-chain">${f.shape.map((x,j)=>`${j?'<span class="shape-arrow">→</span>':''}<span>${x}</span>`).join('')}</div>${!revealed?`<button type="button" class="btn soft reveal-family" data-family="${f.id}">Reveal a real technology family</button>`:`<div class="family-reveal"><span class="family-name">${f.name}</span><p>${f.essential}</p><details><summary>New words in this card</summary><div class="family-words">${f.words.map(([a,b])=>`<div><strong>${a}</strong><span>${b}</span></div>`).join('')}</div></details></div>`}</article>`}).join('');
    host.querySelectorAll('.reveal-family').forEach(b=>b.addEventListener('click',()=>{state.techDiscovery={...(state.techDiscovery||{}),[b.dataset.family]:true};saveState();renderTechDiscovery();renderFamilyMapStrip();}));
    const n=discoveryFamilies.filter(f=>state.techDiscovery?.[f.id]).length;
    const prog=$('#techDiscoveryProgress');if(prog)prog.textContent=`${n} / ${discoveryFamilies.length} revealed`;
    const next=$('#discoveryNext');if(next)next.disabled=n<discoveryFamilies.length;
    const gloss=$('#plainGlossary');if(gloss)gloss.innerHTML=plainGlossary.map(([a,b])=>`<div><strong>${a}</strong><span>${b}</span></div>`).join('');
  }

  function renderFamilyMapStrip(){const host=$('#familyMapStrip');if(!host)return;host.innerHTML=discoveryFamilies.map(f=>`<div><span>${f.icon}</span><strong>${f.name}</strong><small>${f.title}</small></div>`).join('');}

  const shapeChallengeCases=[
    {id:'phone',title:'A tiny sensor talks to a phone carried by the same person.',answer:'Nearby peer',why:'The defining architectural fact is the nearby peer already carried by the user.'},
    {id:'private',title:'Hundreds of low-rate sensors cover a private site and a few gateways may be installed.',answer:'Gateway-based wide area',why:'The long-distance, low-rate private deployment naturally points first to a gateway-based wide-area shape.'},
    {id:'fleet',title:'Meters are spread across a region; the team does not want to maintain local access infrastructure and operator service is available.',answer:'Operator-managed wide area',why:'The key decision is to rely on wide-area infrastructure provided as a service rather than deploy local gateways.'}
  ];
  function renderShapeChallenge(){const host=$('#shapeChallenge');if(!host)return;const opts=discoveryFamilies.map(x=>x.title);host.innerHTML=`<p class="challenge-copy">Do not name a standard. Choose only the <b>network shape</b> that you would investigate first.</p><div class="micro-game-grid">${shapeChallengeCases.map(c=>{const choice=state.shapeChallenge?.[c.id];return `<div class="micro-game-card"><strong>${c.title}</strong><div class="micro-options">${opts.map(o=>`<button type="button" class="micro-option ${choice===o?'active':''}" data-shape-case="${c.id}" data-choice="${o}">${o}</button>`).join('')}</div>${choice?`<div class="micro-feedback"><b>${choice===c.answer?'Good first filter.':'Revisit the architecture before the name.'}</b>${c.why}</div>`:''}</div>`}).join('')}</div>`;host.querySelectorAll('[data-shape-case]').forEach(b=>b.addEventListener('click',()=>{state.shapeChallenge={...(state.shapeChallenge||{}),[b.dataset.shapeCase]:b.dataset.choice};markChallenge('discover');renderShapeChallenge();}));}

  /* ---------- Mystery technology ---------- */
  const mysteryTechs = [
    {id:'wifi', answer:'Wi-Fi', clues:['The device joins local wireless infrastructure to reach the rest of the network.','Direct IP connectivity is common.','Engineers place it in the IEEE 802.11 wireless-LAN family.'], explain:'The local access-point model is the strongest clue. The standards vocabulary comes only after that architectural idea.'},
    {id:'ble', answer:'Bluetooth LE', clues:['A constrained device often communicates with a nearby phone, peer or gateway.','Low-energy operation is a central design goal.','Its radio modes include options that trade data rate for robustness/range.'], explain:'Start from nearby low-energy communication; the PHY details explain how the family can cover more than one range/data-rate point.'},
    {id:'dot154', answer:'IEEE 802.15.4', clues:['It supplies basic local radio/link rules but does not, by itself, define the whole path to an application.','Higher-level IoT networking stacks are commonly built above it.','Its main responsibilities are usually described technically as PHY and MAC.'], explain:'The important idea is “building block first”; PHY and MAC are just the technical names for those lower-level responsibilities.'},
    {id:'lorawan', answer:'LoRaWAN', clues:['Small, constrained devices can send through gateways rather than joining a conventional local access point.','The gateways relay traffic toward a network service.','LoRa names the radio technology; this name refers to the wider network protocol/architecture.'], explain:'The gateway + network-service shape is more useful to recognise first than any acronym.'},
    {id:'cellular', answer:'Cellular IoT', clues:['Wide-area connectivity is delivered through mobile-network infrastructure rather than local gateways you deploy.','Coverage and operator service availability become explicit assumptions.','NB-IoT and LTE-M are common complementary technologies in this family.'], explain:'The operator-managed wide-area model should be identifiable before terms such as licensed spectrum, RAN or core network appear.'}
  ];
  const mysteryOptions = ['Wi-Fi','Bluetooth LE','IEEE 802.15.4','LoRaWAN','Cellular IoT'];

  function renderMysteries() {
    const host=$('#mysteryGrid');
    host.innerHTML=mysteryTechs.map((m,i)=>{
      const s=state.mystery[m.id]||{clues:1};
      const clueCount=Math.max(1,Math.min(3,s.clues||1));
      return `<article class="mystery-card ${s.revealed?'revealed':''}"><div class="mystery-number">Mystery ${String.fromCharCode(65+i)}</div><div>${m.clues.slice(0,clueCount).map((c,idx)=>`<div class="mystery-clue ${idx===clueCount-1?'new':''}"><strong>Clue ${idx+1}</strong><br>${c}</div>`).join('')}</div><div class="mystery-options">${mysteryOptions.map(o=>`<button type="button" data-mid="${m.id}" data-answer="${esc(o)}" class="mystery-option ${s.choice===o?'chosen':''}" ${s.revealed?'disabled':''}>${o}</button>`).join('')}</div>${!s.revealed&&s.choice?`<div class="confidence-row"><span>How confident are you?</span>${['Low','Medium','High'].map(x=>`<button type="button" class="confidence-button ${s.confidence===x?'active':''}" data-confidence="${x}" data-mid="${m.id}">${x}</button>`).join('')}</div>`:''}${s.revealed?`<div class="mystery-result visible"><strong>${s.choice===m.answer?'Good inference.':'Not quite.'}</strong> This is <b>${m.answer}</b>.<span class="clue-score">${s.confidence||'Unknown'} confidence · ${clueCount} clue${clueCount>1?'s':''}. ${m.explain}${s.confidence==='High'&&s.choice!==m.answer?' High confidence + wrong answer is especially useful: identify which clue you over-weighted.':''}</span></div>`:''}<div class="mystery-actions">${!s.revealed&&clueCount<3?`<button type="button" class="btn ghost more-clue" data-mid="${m.id}">Reveal another clue</button>`:''}${!s.revealed?`<button type="button" class="btn soft commit-mystery" data-mid="${m.id}" ${(s.choice&&s.confidence)?'':'disabled'}>Commit inference</button>`:''}</div></article>`;
    }).join('');
    host.querySelectorAll('.mystery-option').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.mid; const prev=state.mystery[id]||{clues:1}; state.mystery[id]={...prev,choice:b.dataset.answer};saveState();renderMysteries();}));
    host.querySelectorAll('[data-confidence]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.mid;const prev=state.mystery[id]||{clues:1};state.mystery[id]={...prev,confidence:b.dataset.confidence};saveState();renderMysteries();}));
    host.querySelectorAll('.more-clue').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.mid; const prev=state.mystery[id]||{clues:1}; state.mystery[id]={...prev,clues:Math.min(3,(prev.clues||1)+1)};saveState();renderMysteries();}));
    host.querySelectorAll('.commit-mystery').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.mid; const prev=state.mystery[id]||{clues:1}; if(!prev.choice)return; state.mystery[id]={...prev,revealed:true};saveState();renderMysteries();}));
    const count=mysteryTechs.filter(m=>state.mystery[m.id]?.revealed).length; $('#mysteryScore').textContent=`${count} / 5`;
    renderLayerTrap(); renderStopSnapshots(); renderFamilyMapStrip();
  }

  /* ---------- Technology library ---------- */
  const technologies = {
    wifi:{name:'Wi-Fi', family:'local', icon:'⌁', strap:'Local network access through an access point', brief:'Wi-Fi lets devices join a local wireless network through an access point. The useful engineering questions are who provides that network, what traffic it must carry, and what energy budget the device has.', good:['Existing managed WLAN infrastructure','Moderate to high traffic','Straightforward IP integration'], care:['Battery-only operation without careful duty cycling','Coverage assumed without a site design','Contention and shared airtime'], architecture:['Device','Access point','IP network','Application'], compare:{layer:'WLAN PHY/MAC family',spectrum:'Typically unlicensed WLAN bands',infra:'Local access point(s)',traffic:'Can support substantially richer traffic than LPWA families',mobility:'Local WLAN mobility mechanisms; deployment-dependent',power:'Very implementation/workload dependent'}, deeper:[['Abstraction','IEEE 802.11 is a WLAN PHY/MAC family, not one fixed radio profile.'],['Variant matters','Sub-1 GHz 802.11ah / Wi-Fi HaLow illustrates why “Wi-Fi = one range/power profile” is a poor rule.'],['Shared medium','Capacity depends on airtime, contention, channel conditions and the number/behaviour of stations.'],['Discussion','If two Wi-Fi variants have different frequency bands and power/range trade-offs, how useful is a generic “Wi-Fi vs IoT” statement?']], links:[['IEEE 802.11 standard family','https://standards.ieee.org/ieee/802.11/10548/']]},
    ble:{name:'Bluetooth LE', family:'local', icon:'ᛒ', strap:'Nearby low-energy communication', brief:'Bluetooth LE is designed for low-energy local communication and supports several ways for nearby devices to exchange data. Its technical radio modes make speed, robustness and achievable range explicit trade-offs rather than fixed properties.', good:['Constrained nearby devices','Phone/gateway-mediated applications','Point-to-point, broadcast or mesh use cases'], care:['Assuming direct Internet reachability','Treating BLE as one topology','Ignoring PHY and transmit-power trade-offs'], architecture:['Device','Peer / gateway','Application'], compare:{layer:'Bluetooth LE radio + protocol stack',spectrum:'2.4 GHz unlicensed ISM',infra:'Peer, phone, gateway or mesh depending on design',traffic:'Low-energy local traffic; PHYs include 2M, 1M and coded modes',mobility:'Good fit for devices interacting with nearby phones/gateways',power:'Explicitly designed for low-energy operation'}, deeper:[['PHY trade-off','LE 2M increases data rate; LE Coded adds coding and trades data rate for achievable range/robustness.'],['Topologies','Bluetooth LE supports point-to-point, broadcast and mesh architectures.'],['Range is emergent','Transmit power, receiver sensitivity, PHY, antenna and environment all matter.'],['Discussion','If LE Coded extends achievable range by lowering effective data rate, are “range” and “throughput” independent requirements?']], links:[['Bluetooth technology overview','https://www.bluetooth.com/learn-about-bluetooth/tech-overview/'],['Bluetooth feature enhancements','https://www.bluetooth.com/learn-about-bluetooth/feature-enhancements/']]},
    dot154:{name:'IEEE 802.15.4', family:'local', icon:'⌬', strap:'Low-power local radio building block', brief:'IEEE 802.15.4 provides basic radio-transmission and channel-sharing rules for low-rate local devices. Other networking layers are normally needed to build the complete IoT system.', good:['Low-rate constrained networks','Stacks needing a low-power MAC/PHY foundation','Local sensing/actuation networks'], care:['High-volume traffic','Confusing it with Zigbee/Thread/6LoWPAN','Expecting an application protocol from the standard'], architecture:['Device','Basic local radio/link rules','Higher-level networking','Application'], compare:{layer:'PHY + MAC standard family',spectrum:'Several PHYs/frequency bands exist',infra:'Depends on the higher-layer stack/topology',traffic:'Low-rate / low-complexity design target',mobility:'Not a single end-to-end mobility architecture',power:'Low-power/low-complexity target'}, deeper:[['Layer','The standard specifies low-rate PHY/MAC functions; higher layers provide networking/application semantics.'],['Not just one PHY','The standard family has included PHYs for different bands and specialised contexts.'],['Stack question','Thread, Zigbee and 6LoWPAN-based systems may all build on 802.15.4 while behaving differently above the MAC.'],['Discussion','Is “802.15.4 vs LoRaWAN” a fair comparison if one names a PHY/MAC foundation and the other names a network protocol/architecture?']], links:[['IEEE 802.15.4 standard family','https://standards.ieee.org/ieee/802.15.4/11041/']]},
    lorawan:{name:'LoRaWAN', family:'lpwan', icon:'◜', strap:'Long-range, low-rate networking through gateways', brief:'LoRaWAN builds a long-range, low-rate network in which gateways relay device traffic toward a network service. The infrastructure can be deployed privately or provided through shared/public networks.', good:['Small/infrequent sensor payloads','Battery-oriented long-range sensing','Private or public LPWA deployments'], care:['Large payloads','Heavy/frequent downlink control','Assuming one universal regional data-rate rule'], architecture:['End device','Gateway(s)','Network server','Application server'], compare:{layer:'LPWA MAC/network protocol + architecture',spectrum:'Region-dependent unlicensed ISM bands',infra:'Gateway(s) + network server; private/public/shared',traffic:'Small/infrequent traffic is a common fit',mobility:'Possible use cases, but design differs from cellular mobility',power:'Battery-oriented, especially Class A patterns'}, deeper:[['LoRa ≠ LoRaWAN','LoRa names the radio modulation/PHY technology; LoRaWAN defines the networking protocol and architecture above it.'],['Device classes','Class A minimises receive windows; Classes B/C change downlink availability and energy behaviour.'],['ADR','Adaptive Data Rate can let the network optimise data rate/RF settings for suitable devices.'],['Regional parameters','Channel plans, allowed data rates and regulatory constraints vary by region.'],['Discussion','If downlink availability is increased, what do you expect to happen to device energy consumption?']], links:[['LoRaWAN for developers','https://lora-alliance.org/lorawan-for-developers/'],['LoRaWAN regional parameters','https://resources.lora-alliance.org/technical-specifications/rp002-1-0-5-lorawan-regional-parameters']]},
    cellular:{name:'Cellular IoT', family:'lpwan', icon:'▥', strap:'Operator-provided wide-area IoT connectivity', brief:'NB-IoT and LTE-M are complementary cellular IoT technologies delivered through mobile-network infrastructure. They target different performance envelopes, so even “cellular IoT” is a family decision.', good:['Wide-area operator coverage','Large fleets without local access infrastructure','Use cases benefiting from managed cellular connectivity'], care:['Assuming coverage/service availability','Ignoring subscriptions/modules/operator dependencies','Treating NB-IoT and LTE-M as identical'], architecture:['Device','Cellular base station','Operator network','Application'], compare:{layer:'3GPP cellular radio access family',spectrum:'Licensed operator spectrum',infra:'Operator RAN + mobile core',traffic:'LPWA; NB-IoT and LTE-M provide different envelopes',mobility:'LTE-M generally serves more mobility/richer interaction profiles; NB-IoT emphasises lower-complexity LPWA profiles',power:'Power-saving mechanisms are central to both families'}, deeper:[['NB-IoT vs LTE-M','They are complementary rather than interchangeable labels; LTE-M supports a richer performance/mobility envelope while NB-IoT targets narrower-band low-complexity operation.'],['Coverage is an assumption','Operator infrastructure removes local gateway deployment only where the required service is actually available.'],['NTN','3GPP Release 17 studied/specified support for NB-IoT/eMTC over non-terrestrial networks.'],['Discussion','If NB-IoT can be supported over NTN, does “satellite vs NB-IoT” even describe mutually exclusive choices?']], links:[['GSMA Mobile IoT Deployment Guide','https://www.gsma.com/solutions-and-impact/technologies/internet-of-things/wp-content/uploads/2026/02/Mobile-IoT-Deployment-Guide-digital-1.pdf'],['3GPP NB-IoT/eMTC NTN study','https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=3747']]}
  };

  function renderTechnologyLibrary() {
    const host=$('#technologyLibrary');
    const groups=[
      ['Nearby / local access',['ble','wifi']],
      ['Local low-power building block',['dot154']],
      ['Wide-area / low-rate connectivity',['lorawan','cellular']]
    ];
    host.innerHTML=groups.map(([title,ids])=>`<section class="tech-group"><div class="tech-group-title">${title}</div><div class="tech-group-grid">${ids.map(id=>{const t=technologies[id];return `<button type="button" class="tech-card family-${t.family}" data-tech="${id}"><span class="tech-icon">${t.icon}</span><strong>${t.name}</strong><small>${t.strap}</small><span class="open">Open guided card →</span></button>`}).join('')}</div></section>`).join('');
    host.querySelectorAll('.tech-card').forEach(b=>b.addEventListener('click',()=>showTechnology(b.dataset.tech)));
    renderTechnologyCompare(); renderFamilyMapStrip();
  }

  function showTechnology(id) {
    const t=technologies[id], panel=$('#technologyPanel');
    state.lastTechnology=id; saveState(); renderDesignDrawer();
    panel.className=`card tech-panel visible family-panel-${t.family}`;
    panel.innerHTML=`
      <div class="tech-title-row"><div><div class="eyebrow">Guided technology card</div><h2>${t.name}</h2><p class="section-copy">${t.brief}</p></div><span class="tech-icon large">${t.icon}</span></div>
      <div class="tech-essential"><span class="eyebrow">1 · Essential</span><div class="tech-columns"><div><h4>Often credible when…</h4><ul class="clean">${t.good.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><h4>Be careful when…</h4><ul class="clean">${t.care.map(x=>`<li>${x}</li>`).join('')}</ul></div></div></div>
      <div class="tech-architecture"><span class="eyebrow">2 · Network shape</span><div class="arch-chain mini-chain">${t.architecture.map((x,i)=>`${i?'<span class="arch-arrow">→</span>':''}<span class="arch-box">${x}</span>`).join('')}</div></div>
      <details class="tech-terms"><summary>3 · Technical vocabulary — only if useful</summary><p>The technical labels below describe the same ideas more precisely. You do not need to memorise them on first contact.</p><div class="deep-fact-grid">${t.deeper.slice(0,2).map(([a,b])=>`<div><strong>${a}</strong><span>${b}</span></div>`).join('')}</div></details>
      <details class="tech-deep"><summary>4 · Go further / discussion</summary><div class="deep-fact-grid">${t.deeper.slice(2).map(([a,b])=>`<div><strong>${a}</strong><span>${b}</span></div>`).join('')}</div></details>
      <div class="source-list"><strong>Verify / learn more:</strong> ${t.links.map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener">${n} ↗</a>`).join(' · ')}</div>`;
    if(window.matchMedia('(max-width:650px)').matches){ openMobileTechSheet(panel.innerHTML); } else { panel.scrollIntoView({behavior:'smooth', block:'nearest'}); }
  }

  /* ---------- Scenario choices ---------- */
  const scenarioDefs = [
    {id:'wearable', icon:'⌚', title:'A wearable talks to a nearby phone', facts:['small periodic data','battery-powered device','phone is normally nearby'], options:['Bluetooth LE','Wi-Fi','LoRaWAN'], best:'Bluetooth LE', driver:2, why:'Among these candidates, Bluetooth LE aligns naturally with low-energy nearby device-to-phone communication. Wi-Fi can be feasible but adds different energy/infrastructure assumptions; LoRaWAN targets a very different network model.', twist:'Now the phone may be hundreds of metres away for long periods.', twistImpact:'The assumption that made nearby BLE connectivity natural has disappeared. You would need a different architecture or an intermediary.'},
    {id:'farm', icon:'♧', title:'Sparse sensors across a private rural site', facts:['tiny payload every 15 min','battery autonomy matters','gateway infrastructure can be installed','hundreds of metres to kilometres'], options:['LoRaWAN','Wi-Fi','Bluetooth LE'], best:'LoRaWAN', driver:2, why:'Given a private gateway can be installed and traffic is small/infrequent, LoRaWAN is the strongest fit among these options. The result would change for high-volume or tight-latency traffic.', twist:'Each node now transmits an image every 10 seconds.', twistImpact:'The traffic model has changed radically. Long-range low-data-rate LPWA is no longer an obvious fit.'},
    {id:'camera', icon:'◉', title:'A powered camera inside a connected building', facts:['frequent images','mains power available','managed WLAN already exists'], options:['Wi-Fi','LoRaWAN','NB-IoT'], best:'Wi-Fi', driver:2, why:'The stated workload favours the higher data-rate local WLAN already present. LPWA technologies are not designed for this traffic model.', twist:'The managed WLAN is removed from the deployment assumptions.', twistImpact:'The original answer depended heavily on existing local infrastructure. Re-evaluate access options rather than treating Wi-Fi as intrinsically best.'},
    {id:'meter', icon:'▤', title:'Meters distributed across a city', facts:['small messages','no local gateways to maintain','operator cellular-IoT coverage confirmed','long device lifetime'], options:['NB-IoT','Bluetooth LE','IEEE 802.15.4'], best:'NB-IoT', driver:2, why:'The crucial assumption is confirmed operator LPWA coverage and no desire to deploy local access infrastructure. NB-IoT is therefore the strongest candidate among these choices.', twist:'Operator LPWA coverage is no longer available in part of the city.', twistImpact:'The strongest argument for NB-IoT has vanished. You may need local infrastructure, another operator technology, or a heterogeneous design.'},
    {id:'mesh', icon:'⌬', title:'Many low-rate devices inside one building', facts:['local control/monitoring','constrained nodes','multi-hop higher-layer stack is acceptable'], options:['IEEE 802.15.4','LoRaWAN','NB-IoT'], best:'IEEE 802.15.4', driver:1, why:'A low-rate local network built on a suitable higher-level networking stack is a natural domain for IEEE 802.15.4. The important point is that 802.15.4 provides only the lower-level local communication building block, not the complete IoT system.', twist:'Several devices become high-volume video sources.', twistImpact:'The low-rate premise no longer holds. A single access technology may no longer be appropriate for all device classes.'}
  ];

  function renderScenarios() {
    const host=$('#scenarioGrid');
    host.innerHTML=scenarioDefs.map(s=>{
      const st=state.scenarios[s.id]||{};
      const choice=st.choice||null, committed=!!st.committed, twist=!!st.twist;
      return `<article class="scenario-card"><div class="scenario-top"><span class="scenario-icon">${s.icon}</span><div><div class="eyebrow">Deployment case</div><h3>${s.title}</h3></div></div><div class="fact-chip-row decision-driver">${s.facts.map((f,i)=>`<button type="button" class="fact-chip ${st.driver===i?'driver':''}" data-driver="${i}" data-sid="${s.id}" ${committed?'disabled':''}>${f}${st.driver===i?' · decisive':''}</button>`).join('')}</div><div class="scenario-options ${committed?'locked':''}">${s.options.map(o=>`<button type="button" class="scenario-option ${choice===o?'selected':''}" data-sid="${s.id}" data-choice="${esc(o)}" ${committed?'disabled':''}>${o}</button>`).join('')}</div>${!committed?`<p class="driver-hint">Choose a technology <b>and</b> the assumption doing most of the work in your decision.</p>`:''}<div class="scenario-action-row">${!committed?`<button type="button" class="btn soft commit-scenario" data-sid="${s.id}" ${(choice&&Number.isInteger(st.driver))?'':'disabled'}>Commit decision</button>`:`<button type="button" class="btn ghost twist-scenario" data-sid="${s.id}">${twist?'Hide changed assumption':'Change one assumption'}</button>`}</div>${committed?`<div class="scenario-rationale ${choice===s.best?'good':'challenge'}"><strong>${choice===s.best?'Strongest fit among these options.':'Worth discussing, but not the strongest fit here.'}</strong><span>${s.why}</span><small class="driver-feedback">You treated “${esc(s.facts[st.driver])}” as decisive. ${st.driver===s.driver?'That is also one of the assumptions carrying most weight in the reference reasoning.':`One plausible reference reading gives especially high weight to “${esc(s.facts[s.driver])}”. Your choice may still be defensible if you can explain the trade-off.`}</small></div>`:''}${twist?`<div class="scenario-twist"><strong>New assumption</strong><span>${s.twist}</span><strong style="margin-top:7px">What changes?</strong><span>${s.twistImpact}</span></div>`:''}</article>`;
    }).join('');
    host.querySelectorAll('[data-driver]').forEach(b=>b.addEventListener('click',()=>{const prev=state.scenarios[b.dataset.sid]||{};state.scenarios[b.dataset.sid]={...prev,driver:+b.dataset.driver};saveState();renderScenarios();}));
    host.querySelectorAll('.scenario-option').forEach(b=>b.addEventListener('click',()=>{const prev=state.scenarios[b.dataset.sid]||{};state.scenarios[b.dataset.sid]={...prev,choice:b.dataset.choice,committed:false};saveState();renderScenarios();renderDesignDrawer();}));
    host.querySelectorAll('.commit-scenario').forEach(b=>b.addEventListener('click',()=>{const prev=state.scenarios[b.dataset.sid]||{};if(!prev.choice)return;state.scenarios[b.dataset.sid]={...prev,committed:true};saveState();renderScenarios();renderDesignDrawer();}));
    host.querySelectorAll('.twist-scenario').forEach(b=>b.addEventListener('click',()=>{const prev=state.scenarios[b.dataset.sid]||{};state.scenarios[b.dataset.sid]={...prev,twist:!prev.twist};saveState();renderScenarios();renderStopSnapshots();}));
    renderMissingInfoChallenge(); renderCampusDecision(); renderStopSnapshots();
  }

  const campusDecisionPositions = [
    ['single','One family could be enough','If the relevant campus links share similar constraints and coverage, one access family may be a defensible simplification.'],
    ['mixed','A mixed design is plausible','Indoor and outdoor links, power budgets or coverage conditions may justify different access choices.'],
    ['unknown','Not enough information yet','Refusing to force a choice is valid when key deployment facts are still unknown.']
  ];
  const campusUncertainties = [
    ['power','Power source / maintenance','Are nodes mains-powered, rechargeable, or expected to run for years?'],
    ['coverage','Existing infrastructure / coverage','Where does campus Wi-Fi reach? Is operator coverage available outdoors?'],
    ['traffic','Sampling rate / payload size','How often are the four measurements sent, and are alerts exceptional or frequent?'],
    ['latency','Alert delay tolerance','Does an abnormal condition need action in seconds, minutes, or later?'],
    ['layout','Physical layout / obstacles','How far apart are points, and what walls, floors or outdoor obstacles sit between them?']
  ];
  function renderCampusDecision(){
    const host=$('#campusDecision'); if(!host)return;
    const st=state.campusDecision||{position:null,uncertainty:null};
    host.innerHTML=`<div class="campus-position-grid">${campusDecisionPositions.map(([id,title,desc])=>`<button type="button" class="campus-position ${st.position===id?'active':''}" data-campus-position="${id}"><strong>${title}</strong><small>${desc}</small></button>`).join('')}</div>${st.position?`<div class="campus-uncertainty"><strong>Which missing fact could most change your answer?</strong><div class="challenge-chip-row">${campusUncertainties.map(([id,title])=>`<button type="button" class="chip-button ${st.uncertainty===id?'active':''}" data-campus-uncertainty="${id}">${title}</button>`).join('')}</div>${st.uncertainty?`<div class="campus-feedback"><b>Good engineering habit:</b> state the assumption explicitly. ${campusUncertainties.find(x=>x[0]===st.uncertainty)?.[2]||''}</div>`:''}</div>`:''}`;
    host.querySelectorAll('[data-campus-position]').forEach(b=>b.addEventListener('click',()=>{state.campusDecision={...(state.campusDecision||{}),position:b.dataset.campusPosition};saveState();renderCampusDecision();renderDesignDrawer();renderStopSnapshots();}));
    host.querySelectorAll('[data-campus-uncertainty]').forEach(b=>b.addEventListener('click',()=>{state.campusDecision={...(state.campusDecision||{}),uncertainty:b.dataset.campusUncertainty};saveState();renderCampusDecision();renderDesignDrawer();renderStopSnapshots();}));
  }

  /* ---------- Stress test ---------- */
  const stressDefs = [
    {id:'outage', icon:'⊘', title:'Internet outage', short:'Sam reports that campus Internet disappears for 30 minutes.', broken:'Your original design may have assumed continuous reachability of remote services.'},
    {id:'battery', icon:'ϟ', title:'Two-year battery target', short:'Sam reports that outdoor nodes cannot be regularly maintained.', broken:'Your original design may have treated radio activity and energy as cheap.'},
    {id:'scale', icon:'×20', title:'Scale explosion', short:'Amina expands the service from 30 measurement points to 600.', broken:'Your original design may have assumed that shared network, processing and storage resources scale linearly.'},
    {id:'camera', icon:'▣', title:'High-volume sensor', short:'Leila adds a camera flow: one image every 10 seconds.', broken:'Your original design may have assumed that all sensors have a similar traffic profile.'},
    {id:'remote', icon:'◌', title:'No terrestrial coverage', short:'Amina extends the service to isolated mountain sites with no terrestrial coverage.', broken:'Your original design may have assumed terrestrial access infrastructure is available everywhere.'}
  ];
  const responseChoices = [
    ['local-buffer','Add local buffering','Keep data locally while a remote path is unavailable.'],
    ['gateway','Introduce / change a gateway','Aggregate, translate or bridge between access and upstream networks.'],
    ['heterogeneous','Use heterogeneous access','Different device classes do not have to use the same connectivity.'],
    ['edge','Move processing closer','Filter or decide locally instead of sending every raw datum remotely.'],
    ['operator','Use managed wide-area access','Rely on operator infrastructure where local deployment is impractical.'],
    ['satellite','Consider satellite access or backhaul','First decide whether satellite replaces the device access link or only the upstream/backhaul link.']
  ];

  function renderStress() {
    const host=$('#stressGrid');
    host.innerHTML=stressDefs.map(s=>`<button type="button" class="event ${state.selectedStress===s.id?'selected':''}" data-stress="${s.id}"><span class="event-icon">${s.icon}</span><span><strong>${s.title}</strong><small>${s.short}</small></span></button>`).join('');
    host.querySelectorAll('.event').forEach(b=>b.addEventListener('click',()=>{state.selectedStress=b.dataset.stress;state.stressRequirement=null;state.stressResponse=null;state.doubleStress=null;saveState();renderStress();renderStressResponse();renderRevisionStudio();renderDoubleFailure();}));
    renderStressResponse(); renderDoubleFailure();
  }

  function renderStressResponse() {
    const box=$('#stressResponse');
    if(!state.selectedStress){box.hidden=true;return;}
    box.hidden=false;
    const s=stressDefs.find(x=>x.id===state.selectedStress);
    $('#brokenPrompt').textContent=s.broken;
    $('#stressRequirementChoices').innerHTML=requirementDefs.map(([id,,name])=>`<button type="button" class="chip-button ${state.stressRequirement===id?'active':''}" data-stress-req="${id}">${name}</button>`).join('');
    $('#stressRequirementChoices').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{state.stressRequirement=b.dataset.stressReq;saveState();renderStressResponse();renderRevisionStudio();}));
    $('#architectureResponseChoices').innerHTML=responseChoices.map(([id,name,desc])=>`<button type="button" class="choice-card compact ${state.stressResponse===id?'state-2':''}" data-response="${id}"><span><strong>${name}</strong><small>${desc}</small></span></button>`).join('');
    $('#architectureResponseChoices').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{state.stressResponse=b.dataset.response;saveState();renderStressResponse();renderRevisionStudio();}));
    $('#revisionNote').value=state.revisionNote||'';
  }
  $('#revisionNote').addEventListener('input', e=>{state.revisionNote=e.target.value;saveState();});


  /* ---------- Optional challenge modes + STOP snapshots ---------- */
  function renderArchitectureChallenge(){
    const host=$('#architectureChallenge');if(!host)return;
    if(!state.components.length){host.innerHTML='<p class="challenge-copy">Build the architecture first. This challenge uses your own components.</p>';return;}
    const selected=Number(state.architectureChallenge)||null;
    const c=state.components.find(x=>x.id===selected);
    const affected=c?state.flows.filter(f=>f.from===c.id||f.to===c.id):[];
    const resilienceChoices=[['replicate','Replicate the responsibility'],['buffer','Buffer through the outage'],['bypass','Create an alternate path'],['degrade','Accept degraded service']];
    host.innerHTML=`<p class="challenge-copy">Temporarily remove one component. Nothing is deleted from your real architecture. Then choose the <b>single response</b> you would try first.</p><div class="challenge-chip-row">${state.components.map(x=>`<button type="button" class="chip-button ${selected===x.id?'active':''}" data-remove-test="${x.id}">${esc(x.name)}</button>`).join('')}</div>${c?`<div class="impact-card"><span class="impact-number">${affected.length}</span><div><strong>information flow${affected.length===1?'':'s'} directly affected</strong><p>${affected.length?affected.map(f=>{const a=state.components.find(x=>x.id===f.from),b=state.components.find(x=>x.id===f.to);return `${esc(a?.name||'?')} → ${esc(b?.name||'?')}${f.label?' ('+esc(f.label)+')':''}`}).join('<br>'):'No labelled flow touches this component — is that itself suspicious?'}</p></div></div><div class="expert-decision"><strong>One move only. What would you try first?</strong><div class="challenge-chip-row">${resilienceChoices.map(([id,label])=>`<button type="button" class="chip-button ${state.architectureResilience===id?'active':''}" data-resilience="${id}">${label}</button>`).join('')}</div>${state.architectureResilience?`<p>Now defend the trade-off: what failure does this response <em>not</em> solve?</p>`:''}</div>`:''}`;
    host.querySelectorAll('[data-remove-test]').forEach(b=>b.addEventListener('click',()=>{state.architectureChallenge=+b.dataset.removeTest;state.architectureResilience=null;saveState();renderArchitectureChallenge();}));
    host.querySelectorAll('[data-resilience]').forEach(b=>b.addEventListener('click',()=>{state.architectureResilience=b.dataset.resilience;markChallenge('architecture');renderArchitectureChallenge();}));
  }

  function renderFlowLens(){
    const host=$('#flowLens');if(!host)return;
    if(!state.flows.length){host.innerHTML='<p class="challenge-copy">Add at least one information flow first.</p>';return;}
    const idx=Number.isInteger(state.flowLens?.flowIndex)?state.flowLens.flowIndex:0;
    if(idx>=state.flows.length) state.flowLens={flowIndex:0,requirements:[]};
    const current=state.flows[state.flowLens.flowIndex??0];
    const reqs=Array.isArray(state.flowLens.requirements)?state.flowLens.requirements:[];
    const globalTop=requirementDefs.filter(([id])=>state.requirements[id]===2).map(([id])=>id);
    const overlap=reqs.filter(x=>globalTop.includes(x)).length;
    host.innerHTML=`<p class="challenge-copy">Pick one arrow, then choose up to three constraints specifically for that flow — not for the whole system.</p><label class="challenge-select"><span>Flow</span><select id="flowLensSelect">${state.flows.map((f,i)=>{const a=state.components.find(x=>x.id===f.from),b=state.components.find(x=>x.id===f.to);return `<option value="${i}" ${i===(state.flowLens.flowIndex??0)?'selected':''}>${esc(a?.name||'?')} → ${esc(b?.name||'?')}${f.label?' · '+esc(f.label):''}</option>`}).join('')}</select></label><div class="challenge-chip-row">${requirementDefs.map(([id,,name])=>`<button type="button" class="chip-button ${reqs.includes(id)?'active':''}" data-flow-req="${id}">${name}</button>`).join('')}</div>${reqs.length?`<div class="micro-feedback"><b>Compare with your system-wide Top 3</b>${globalTop.length?`${overlap} of your ${reqs.length} flow-specific choices overlap with the global priorities. ${overlap===reqs.length?'Maybe this flow dominates your overall thinking.':'That difference is exactly the point: flows can have distinct requirements.'}`:'You have not starred a global Top 3 yet.'}</div>`:''}`;
    $('#flowLensSelect')?.addEventListener('change',e=>{state.flowLens={flowIndex:+e.target.value,requirements:[]};saveState();renderFlowLens();});
    host.querySelectorAll('[data-flow-req]').forEach(b=>b.addEventListener('click',()=>{let a=[...(state.flowLens.requirements||[])],id=b.dataset.flowReq;if(a.includes(id))a=a.filter(x=>x!==id);else if(a.length<3)a.push(id);else{flashMessage('Choose up to three for this flow.');return;}state.flowLens.requirements=a;if(a.length)markChallenge('requirements');else saveState();renderFlowLens();renderStopSnapshots();}));
  }

  const layerPairs=[
    {id:'lora',left:'LoRa',right:'LoRaWAN',answer:'No',why:'LoRa names the radio modulation/PHY technology; LoRaWAN defines the network protocol and architecture using LoRa radios.'},
    {id:'154',left:'IEEE 802.15.4',right:'LoRaWAN',answer:'Not really',why:'802.15.4 is a PHY/MAC foundation; LoRaWAN names a broader network protocol/architecture. They can still compete in a design decision, but not at identical abstraction levels.'},
    {id:'ntn',left:'NB-IoT',right:'Satellite',answer:'No',why:'NB-IoT is a cellular radio-access technology. Satellite/NTN describes a non-terrestrial transmission/access path; Release 17 work explicitly connects these concepts.'},
    {id:'backhaul',left:'LoRaWAN',right:'Satellite',answer:'Depends',why:'A LoRaWAN gateway could use satellite only as backhaul, while other designs may use a satellite-facing device link. “Satellite” does not tell you which architectural link it replaces.'}
  ];
  function renderLayerTrap(){const host=$('#layerTrap');if(!host)return;host.innerHTML=`<p class="challenge-copy">For each pair, answer the question: <b>are these two names describing comparable things at the same architectural level?</b></p><div class="micro-game-grid">${layerPairs.map(x=>{const c=state.layerTrap[x.id];return `<div class="micro-game-card"><div class="pair-title"><strong>${x.left}</strong><span>vs</span><strong>${x.right}</strong></div><div class="micro-options">${['Yes','No','Not really','Depends'].map(o=>`<button class="micro-option ${c===o?'active':''}" type="button" data-layer="${x.id}" data-choice="${o}">${o}</button>`).join('')}</div>${c?`<div class="micro-feedback"><b>${c===x.answer?'Useful distinction.':'Compare your answer with this framing.'}</b>${x.why}</div>`:''}</div>`}).join('')}</div>`;host.querySelectorAll('[data-layer]').forEach(b=>b.addEventListener('click',()=>{state.layerTrap[b.dataset.layer]=b.dataset.choice;markChallenge('investigate');renderLayerTrap();}));}

  function renderTechnologyCompare(){
    const host=$('#technologyCompare');if(!host)return;
    let a=state.technologyCompare?.a||'lorawan',b=state.technologyCompare?.b||'cellular'; if(a===b)b=a==='wifi'?'ble':'wifi';
    const ta=technologies[a],tb=technologies[b];
    const rows=[['What level?',ta.compare.layer,tb.compare.layer],['Spectrum',ta.compare.spectrum,tb.compare.spectrum],['Infrastructure',ta.compare.infra,tb.compare.infra],['Traffic profile',ta.compare.traffic,tb.compare.traffic],['Mobility',ta.compare.mobility,tb.compare.mobility],['Energy angle',ta.compare.power,tb.compare.power]];
    host.innerHTML=`<div class="compare-controls"><label><span>Technology A</span><select id="compareA">${Object.entries(technologies).map(([id,t])=>`<option value="${id}" ${id===a?'selected':''}>${t.name}</option>`).join('')}</select></label><span class="compare-vs">VS</span><label><span>Technology B</span><select id="compareB">${Object.entries(technologies).map(([id,t])=>`<option value="${id}" ${id===b?'selected':''}>${t.name}</option>`).join('')}</select></label></div><div class="compare-table">${rows.map(([k,x,y])=>`<div class="compare-row"><strong>${k}</strong><span>${x}</span><span>${y}</span></div>`).join('')}</div><div class="ntn-lens"><div class="eyebrow">Satellite / NTN lens</div><h4>Satellite is not automatically a sixth equivalent access technology.</h4><div class="ntn-diagrams"><div><b>Direct / NTN access</b><span>Device → satellite / NTN access → network → application</span></div><div><b>Backhaul</b><span>Device → local gateway → satellite backhaul → application/network</span></div></div><p>3GPP Release 17 includes NB-IoT/eMTC NTN work. That is why “NB-IoT or satellite?” can be the wrong question: the two concepts can coexist in one architecture.</p></div><div id="mythLabInner" class="myth-lab"></div>`;
    $('#compareA')?.addEventListener('change',e=>{state.technologyCompare.a=e.target.value;if(state.technologyCompare.a===state.technologyCompare.b)state.technologyCompare.b=state.technologyCompare.a==='wifi'?'ble':'wifi';markChallenge('investigate');renderTechnologyCompare();});
    $('#compareB')?.addEventListener('change',e=>{state.technologyCompare.b=e.target.value;if(state.technologyCompare.a===state.technologyCompare.b)state.technologyCompare.a=state.technologyCompare.b==='wifi'?'ble':'wifi';markChallenge('investigate');renderTechnologyCompare();});
    renderMythLab();
  }

  const mythCards=[
    {id:'lora',text:'LoRa and LoRaWAN are interchangeable names.',answer:'False',why:'LoRa names the radio modulation/PHY technology; LoRaWAN defines a network protocol and architecture above it.'},
    {id:'wifi-battery',text:'Wi-Fi is a poor choice for battery-powered sensors.',answer:'Depends',why:'It can be a poor fit, but duty cycle, traffic, sleep behaviour, Wi-Fi variant, coverage and lifetime target all matter. “Battery-powered” alone is not enough to reject it.'},
    {id:'mesh',text:'An IEEE 802.15.4-based system can use a mesh topology if higher layers implement it.',answer:'True',why:'802.15.4 supplies PHY/MAC functions; a higher-layer stack can add mesh networking. The important distinction is that mesh is not implied by 802.15.4 itself.'},
    {id:'ntn',text:'NB-IoT and satellite are mutually exclusive connectivity choices.',answer:'False',why:'3GPP Release 17 work supports NB-IoT/eMTC over NTN, so the concepts can coexist in one architecture.'},
    {id:'lorawan-private',text:'A LoRaWAN deployment can be private rather than operator-managed.',answer:'True',why:'LoRaWAN networks can be deployed under different ownership models. Choosing LoRaWAN does not by itself imply a mobile-network operator.'},
    {id:'spectrum-cost',text:'Using unlicensed spectrum is cheaper than using licensed operator connectivity.',answer:'Depends',why:'Spectrum access is only one cost dimension. Gateways, site deployment, maintenance, subscriptions, operations and scale can reverse the comparison.'}
  ];
  function renderMythLab(){const host=$('#mythLabInner');if(!host)return;host.innerHTML=`<div class="eyebrow">Expert mini-game · Claim lab</div><h4>Myth, fact, or “it depends”?</h4><p class="challenge-copy">Some claims are true, some are false, and some cannot be judged without additional assumptions.</p><div class="myth-grid">${mythCards.map(m=>{const st=state.mythLab?.[m.id]||{};return `<div class="myth-card"><strong>${m.text}</strong><div class="micro-options">${['True','False','Depends'].map(x=>`<button type="button" class="micro-option ${st.choice===x?'active':''}" data-myth="${m.id}" data-choice="${x}" ${st.locked?'disabled':''}>${x}</button>`).join('')}</div>${!st.locked?`<button type="button" class="text-button lock-myth" data-myth="${m.id}" ${st.choice?'':'disabled'}>Lock answer</button>`:`<div class="micro-feedback"><b>${st.choice===m.answer?'Good distinction.':'Compare the assumptions.'}</b>${m.why}</div>`}</div>`}).join('')}</div>`;host.querySelectorAll('[data-myth]').forEach(b=>b.addEventListener('click',()=>{const prev=state.mythLab[b.dataset.myth]||{};state.mythLab[b.dataset.myth]={...prev,choice:b.dataset.choice};saveState();renderMythLab();}));host.querySelectorAll('.lock-myth').forEach(b=>b.addEventListener('click',()=>{const prev=state.mythLab[b.dataset.myth]||{};state.mythLab[b.dataset.myth]={...prev,locked:true};markChallenge('investigate');renderMythLab();}));}


  const missingInfoCases=[
    {id:'wildlife',title:'A wildlife tracker in a remote region',given:'It must send location to researchers.',options:['Expected update frequency','Terrestrial/operator coverage','Battery/size budget','Whether the animal moves'],key:['Expected update frequency','Terrestrial/operator coverage','Battery/size budget'],why:'“Remote tracker” is not enough to choose a radio. Traffic frequency, coverage and energy budget can completely change the architecture; mobility also matters but is already implicit here.'},
    {id:'factory',title:'A factory alarm sensor',given:'It must be reliable.',options:['Maximum acceptable alarm delay','Consequence of a missed alarm','Existing local infrastructure','Colour of the enclosure'],key:['Maximum acceptable alarm delay','Consequence of a missed alarm','Existing local infrastructure'],why:'“Reliable” is underspecified. Latency target, failure consequence and available infrastructure are engineering inputs; enclosure colour is not relevant to this communication decision.'}
  ];
  function renderMissingInfoChallenge(){const host=$('#missingInfoChallenge');if(!host)return;host.innerHTML=`<p class="challenge-copy">Select the information you would demand <b>before</b> naming a technology. Then lock the case.</p><div class="micro-game-grid">${missingInfoCases.map(c=>{const st=state.missingInfo[c.id]||{choices:[],locked:false};return `<div class="micro-game-card"><strong>${c.title}</strong><small>${c.given}</small><div class="missing-options">${c.options.map(o=>`<button type="button" class="missing-option ${st.choices.includes(o)?'active':''}" data-missing="${c.id}" data-info="${esc(o)}" ${st.locked?'disabled':''}>${o}</button>`).join('')}</div>${!st.locked?`<button class="btn soft lock-missing" data-missing="${c.id}" type="button" ${st.choices.length?'':'disabled'}>Lock what we need to know</button>`:`<div class="micro-feedback"><b>Engineering answer: do not guess yet.</b>${c.why}</div>`}</div>`}).join('')}</div>`;host.querySelectorAll('[data-info]').forEach(b=>b.addEventListener('click',()=>{let st=state.missingInfo[b.dataset.missing]||{choices:[],locked:false};let a=[...st.choices],x=b.dataset.info;a=a.includes(x)?a.filter(y=>y!==x):[...a,x];state.missingInfo[b.dataset.missing]={...st,choices:a};saveState();renderMissingInfoChallenge();}));host.querySelectorAll('.lock-missing').forEach(b=>b.addEventListener('click',()=>{let st=state.missingInfo[b.dataset.missing]||{choices:[],locked:false};state.missingInfo[b.dataset.missing]={...st,locked:true};markChallenge('choose');renderMissingInfoChallenge();}));}

  const compoundInsights={
    'outage|scale':'Buffering may preserve data during the outage, but 600 devices can create a reconnection burst. Local aggregation/back-pressure now matter too.',
    'battery|camera':'High-volume sensing and a two-year battery target pull in opposite directions. Local filtering, duty cycling or heterogeneous powered nodes become central.',
    'camera|scale':'A ×20 fleet plus image traffic is a capacity problem, not just a range problem. One homogeneous access technology becomes increasingly questionable.',
    'battery|remote':'Remote access and strict battery autonomy force an explicit link-budget and duty-cycle discussion. Satellite/NTN does not remove the energy constraint.',
    'camera|remote':'A remote high-volume sensor raises both upstream-capacity and energy questions. Direct satellite access and satellite backhaul are very different designs.',
    'outage|remote':'When remote sites also lose upstream connectivity, local autonomy and store-and-forward become first-class architectural responsibilities.'
  };
  function renderDoubleFailure(){const host=$('#doubleFailureChallenge');if(!host)return;if(!state.selectedStress){host.innerHTML='<p class="challenge-copy">Complete the main stress test first, then add a second event.</p>';return;}const first=stressDefs.find(x=>x.id===state.selectedStress);const others=stressDefs.filter(x=>x.id!==state.selectedStress);const second=state.doubleStress?stressDefs.find(x=>x.id===state.doubleStress):null;const key=second?[first.id,second.id].sort().join('|'):null;host.innerHTML=`<p class="challenge-copy">Your first event is <b>${first.title}</b>. Add one more. Then assume you are allowed <b>one architectural change only</b>.</p><div class="challenge-chip-row">${others.map(x=>`<button type="button" class="chip-button ${second?.id===x.id?'active':''}" data-double="${x.id}">${x.title}</button>`).join('')}</div>${second?`<div class="impact-card compound"><span class="impact-number">2×</span><div><strong>${first.title} + ${second.title}</strong><p>${compoundInsights[key]||'The two events change more than one design dimension at once. Revisit which assumption, requirement and component becomes the actual bottleneck.'}</p></div></div><div class="expert-decision"><strong>One-change budget</strong><div class="challenge-chip-row">${responseChoices.map(([id,name])=>`<button type="button" class="chip-button ${state.doubleResponse===id?'active':''}" data-double-response="${id}">${name}</button>`).join('')}</div>${state.doubleResponse?`<p>Now attack your own answer: which of the two failures is still only partially handled?</p>`:''}</div>`:''}`;host.querySelectorAll('[data-double]').forEach(b=>b.addEventListener('click',()=>{state.doubleStress=state.doubleStress===b.dataset.double?null:b.dataset.double;state.doubleResponse=null;saveState();renderDoubleFailure();}));host.querySelectorAll('[data-double-response]').forEach(b=>b.addEventListener('click',()=>{state.doubleResponse=b.dataset.doubleResponse;markChallenge('stress');renderDoubleFailure();}));}

  function landscapeSnapshotMarkup(){return `<div class="snapshot-landscape">${landscapeCases.map(c=>{const x=landscapeSelection(c.id);return `<div><span class="snapshot-case">${c.icon}</span><span><strong>${esc(c.title)}</strong><small>${x.primary?`${domainName(x.primary)}${x.secondary?' + '+domainName(x.secondary):''}`:'Not mapped'}</small></span></div>`}).join('')}</div>`;}
  function renderStopSnapshots(){
    const l=$('#stopLandscapeSnapshot');if(l){const cross=landscapeCases.filter(c=>landscapeSelection(c.id).secondary).length;l.innerHTML=`<div class="snapshot-head"><strong>Our IoT landscape</strong><span>${cross} cross-domain choices</span></div>${landscapeSnapshotMarkup()}<div class="snapshot-signal"><b>Discussion signal</b>${cross===0?'Your group used one domain for every case. Was the overlap genuinely negligible, or did the main/secondary framing hide useful ambiguity?':`${cross} of 8 cases crossed a boundary. Pick the hardest one to defend.`}</div>`;}
    const a=$('#stopArchitectureSnapshot');if(a){const degrees=state.components.map(c=>[c,state.flows.filter(f=>f.from===c.id||f.to===c.id).length]).sort((x,y)=>y[1]-x[1]);const hot=degrees[0];a.innerHTML=`<div class="snapshot-head"><strong>Our architecture v1</strong><span>${state.components.length} components · ${state.flows.length} flows</span></div>${miniGraphMarkup()}${state.flows.length?`<div class="snapshot-flow-list">${state.flows.slice(0,6).map(f=>{const x=state.components.find(c=>c.id===f.from),y=state.components.find(c=>c.id===f.to);return `<span>${esc(x?.name||'?')} → ${esc(y?.name||'?')}${f.label?' · '+esc(f.label):''}</span>`}).join('')}</div>`:''}${hot?`<div class="snapshot-signal"><b>Discussion signal</b>${esc(hot[0].name)} touches ${hot[1]} flow${hot[1]===1?'':'s'}. Is that architectural centrality intentional?</div>`:''}`;}
    const cl=$('#stopLoopSnapshot');if(cl){const chosen=new Set(state.loopClosure?.elements||[]);cl.innerHTML=`<div class="snapshot-head"><strong>Our closed-loop extension</strong><span>${chosen.size} design elements selected</span></div><div class="loop-snapshot-grid">${loopElements.map(([id,n])=>`<span class="${chosen.has(id)?'active':''}">${esc(n)}</span>`).join('')}</div>${state.loopClosure?.rationale?`<div class="snapshot-insight">${esc(state.loopClosure.rationale)}</div>`:''}`;}
    const r=$('#stopRequirementsSnapshot');if(r){const sel=requirementDefs.filter(([id])=>state.requirements[id]);const top=sel.filter(([id])=>state.requirements[id]===2);r.innerHTML=`<div class="snapshot-head"><strong>Our communication requirements</strong><span>${sel.length} selected</span></div><div class="snapshot-requirements"><div><small>Selected</small><div class="chip-row">${sel.map(([id,,n])=>`<span class="chip">${esc(n)}</span>`).join('')||'<span class="empty-copy">None</span>'}</div></div><div><small>Top 3</small><div class="chip-row">${top.map(([id,,n])=>`<span class="chip priority">★ ${esc(n)}</span>`).join('')||'<span class="empty-copy">None starred</span>'}</div></div></div>${state.flowLens?.requirements?.length?`<div class="snapshot-insight">Flow lens completed: its priorities were ${state.flowLens.requirements.map(id=>requirementDefs.find(x=>x[0]===id)?.[2]).filter(Boolean).join(', ')}.</div>`:''}`;}
    const t=$('#stopTechnologySnapshot');if(t){const mystery=mysteryTechs.map(m=>{const x=state.mystery[m.id];return `<span class="snapshot-tech ${x?.revealed?(x.choice===m.answer?'correct':'wrong'):''}">${x?.revealed?(x.choice===m.answer?'✓':'↺'):'·'} ${m.answer}</span>`}).join('');const dec=scenarioDefs.map(x=>{const st=state.scenarios[x.id]||{};return st.committed?`<div><strong>${esc(x.title)}</strong><span>${esc(st.choice||'')}</span>${st.twist?'<small>assumption challenged</small>':''}</div>`:''}).filter(Boolean).join('');const cp=state.campusDecision?.position?campusDecisionPositions.find(x=>x[0]===state.campusDecision.position):null;const cu=state.campusDecision?.uncertainty?campusUncertainties.find(x=>x[0]===state.campusDecision.uncertainty):null;t.innerHTML=`<div class="snapshot-head"><strong>Our technology reasoning</strong><span>${Object.values(state.scenarios||{}).filter(x=>x?.committed).length} transfer decisions</span></div><div class="snapshot-tech-row">${mystery}</div><div class="snapshot-decisions">${dec||'<p class="empty-copy">No deployment decision committed yet.</p>'}</div>${cp?`<div class="snapshot-campus-return"><small>Back to campus</small><strong>${esc(cp[1])}</strong>${cu?`<span>Most decision-sensitive missing fact: ${esc(cu[1])}</span>`:''}</div>`:''}`;}
  }
  $$('.review-activity').forEach(b=>b.addEventListener('click',()=>showScreen(b.dataset.reviewScreen)));


  /* ---------- Persistent design summary + mobile graph ---------- */
  function graphLayoutFor(model) {
    const components=model?.components||[], flows=model?.flows||[];
    const nodes=components.map(c=>({id:c.id,name:c.name}));
    const ids=new Set(nodes.map(n=>n.id));
    const incoming=Object.fromEntries(nodes.map(n=>[n.id,0]));
    const out=Object.fromEntries(nodes.map(n=>[n.id,[]]));
    flows.forEach(f=>{if(ids.has(f.from)&&ids.has(f.to)){incoming[f.to]=(incoming[f.to]||0)+1;out[f.from].push(f.to);}});
    const level=Object.fromEntries(nodes.map(n=>[n.id,0]));
    const q=nodes.filter(n=>incoming[n.id]===0).map(n=>n.id);
    const indeg={...incoming}; let seen=0;
    while(q.length){const id=q.shift();seen++;(out[id]||[]).forEach(to=>{level[to]=Math.max(level[to]||0,(level[id]||0)+1);indeg[to]--;if(indeg[to]===0)q.push(to);});}
    if(seen<nodes.length){nodes.forEach((n,i)=>{if(indeg[n.id]>0)level[n.id]=Math.max(level[n.id]||0,i);});}
    const groups={}; nodes.forEach(n=>(groups[level[n.id]]??=[]).push(n));
    const positions={}; let y=28; const width=330, boxW=132, boxH=42;
    Object.keys(groups).map(Number).sort((a,b)=>a-b).forEach(l=>{const arr=groups[l];for(let i=0;i<arr.length;i+=2){const row=arr.slice(i,i+2);row.forEach((n,j)=>{const x=row.length===1?(width-boxW)/2:(j===0?18:width-boxW-18);positions[n.id]={x,y,w:boxW,h:boxH};});y+=72;}y+=10;});
    return {nodes,positions,width,height:Math.max(170,y+18),flows};
  }

  function miniGraphMarkupFor(model) {
    const components=model?.components||[], flows=model?.flows||[];
    if(!components.length) return '<p class="drawer-empty">No architecture yet.</p>';
    const {nodes,positions,width,height}=graphLayoutFor({components,flows});
    const marker='miniArrow'+Math.random().toString(36).slice(2,7);
    const edges=flows.map(f=>{const a=positions[f.from],b=positions[f.to];if(!a||!b)return'';const x1=a.x+a.w/2,y1=a.y+a.h,x2=b.x+b.w/2,y2=b.y;const mid=(y1+y2)/2;return `<path class="mini-edge" marker-end="url(#${marker})" d="M${x1},${y1} C${x1},${mid} ${x2},${mid} ${x2},${y2}"/>${f.label?`<text class="mini-flow-label" x="${(x1+x2)/2}" y="${mid-3}" text-anchor="middle">${esc(f.label.slice(0,22))}</text>`:''}`;}).join('');
    const boxes=nodes.map(n=>{const p=positions[n.id];const label=n.name.length>20?n.name.slice(0,19)+'…':n.name;return `<rect class="mini-node" x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="9"/><text class="mini-label" x="${p.x+p.w/2}" y="${p.y+p.h/2+3}" text-anchor="middle">${esc(label)}</text>`;}).join('');
    return `<div class="mini-architecture"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Automatically generated architecture graph"><defs><marker id="${marker}" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#72849a"/></marker></defs>${edges}${boxes}</svg></div>`;
  }
  function currentArchitectureModel(){return {components:state.components,flows:state.flows};}
  function miniGraphMarkup(){return miniGraphMarkupFor(currentArchitectureModel());}
  function cloneArchitecture(model){return JSON.parse(JSON.stringify(model));}
  function captureArchitectureV1(){state.architectureV1=cloneArchitecture(currentArchitectureModel());state.architectureV2=cloneArchitecture(state.architectureV1);saveState();}
  function ensureArchitectureV2(){if(!state.architectureV1)captureArchitectureV1();if(!state.architectureV2)state.architectureV2=cloneArchitecture(state.architectureV1);return state.architectureV2;}
  function renderMobileGraph(){const host=$('#mobileGraph');if(host)host.innerHTML=miniGraphMarkup();}

  function renderDesignDrawer(){
    const host=$('#designDrawerContent'); if(!host)return;
    const priorities=requirementDefs.filter(([id])=>state.requirements[id]===2).map(([,icon,name])=>name);
    const selected=requirementDefs.filter(([id])=>state.requirements[id]).map(([,icon,name])=>name);
    const tech=state.lastTechnology&&technologies[state.lastTechnology]?technologies[state.lastTechnology].name:null;
    const committed=Object.values(state.scenarios||{}).filter(v=>v&&v.committed).length;
    const cp=state.campusDecision?.position?campusDecisionPositions.find(x=>x[0]===state.campusDecision.position):null;
    const v1=state.architectureV1||currentArchitectureModel(), v2=state.architectureV2;
    host.innerHTML=`<section class="design-section mission-drawer-section"><div class="design-section-head"><strong>Campus mission</strong><span class="design-stat">30 points</span></div><div class="drawer-mission-facts"><span>Buildings + outdoor</span><span>Temperature · humidity · CO₂ · noise</span><span>History + alerts</span></div>${cp?`<div class="drawer-flow">Current connectivity stance: <strong>${esc(cp[1])}</strong></div>`:''}</section><section class="design-section"><div class="design-section-head"><strong>Architecture ${state.architectureV1?'v1 · frozen':'working'}</strong><span class="design-stat">${v1.components.length} components · ${v1.flows.length} flows</span></div>${miniGraphMarkupFor(v1)}</section>${v2&&architectureChanged()?`<section class="design-section design-v2-section"><div class="design-section-head"><strong>Architecture v2 · revised</strong><span class="design-stat">after incident</span></div>${miniGraphMarkupFor(v2)}</section>`:''}<section class="design-section"><div class="design-section-head"><strong>Requirements</strong><span class="design-stat">${selected.length} selected</span></div>${priorities.length?`<div class="chip-row">${priorities.map(x=>`<span class="chip priority">★ ${esc(x)}</span>`).join('')}</div>`:'<p class="drawer-empty">No top-three priorities yet.</p>'}</section><section class="design-section"><div class="design-section-head"><strong>Current investigation</strong></div>${tech?`<div class="drawer-flow">Last technology opened: <strong>${esc(tech)}</strong></div>`:'<p class="drawer-empty">No technology card opened yet.</p>'}<div class="drawer-flow" style="margin-top:6px">Committed transfer decisions: <strong>${committed}</strong></div></section>`;
  }

  function openDesign(){renderDesignDrawer();$('#designDrawer').classList.add('open');$('#designDrawer').setAttribute('aria-hidden','false');$('#designScrim').hidden=false;}
  function closeDesign(){$('#designDrawer').classList.remove('open');$('#designDrawer').setAttribute('aria-hidden','true');$('#designScrim').hidden=true;}
  $('#designBtn').addEventListener('click',openDesign); $('#closeDesign').addEventListener('click',closeDesign); $('#designScrim').addEventListener('click',closeDesign);
  function openFieldGuide(){renderFieldGuide();$('#fieldGuideDrawer').classList.add('open');$('#fieldGuideDrawer').setAttribute('aria-hidden','false');$('#fieldGuideScrim').hidden=false;}
  function closeFieldGuide(){$('#fieldGuideDrawer').classList.remove('open');$('#fieldGuideDrawer').setAttribute('aria-hidden','true');$('#fieldGuideScrim').hidden=true;}
  $('#fieldGuideBtn').addEventListener('click',openFieldGuide); $('#closeFieldGuide').addEventListener('click',closeFieldGuide); $('#fieldGuideScrim').addEventListener('click',closeFieldGuide);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDesign();closeFieldGuide();closeDomainPicker();}});

  function openMobileTechSheet(html){
    let sheet=document.querySelector('.mobile-tech-overlay');
    if(sheet)sheet.remove();
    sheet=document.createElement('div');sheet.className='mobile-tech-overlay';sheet.innerHTML=`<div class="mobile-tech-sheet"><button type="button" class="icon-button mobile-tech-close" aria-label="Close">×</button>${html}</div>`;document.body.appendChild(sheet);sheet.querySelector('.mobile-tech-close').addEventListener('click',()=>sheet.remove());sheet.addEventListener('click',e=>{if(e.target===sheet)sheet.remove();});
  }


  /* ---------- Adaptive depth: same objective, less scaffolding ---------- */
  const adaptiveDepthDefs = {
    architecture:{
      host:'#depthArchitecture',
      title:'A component disappears. Keep the service alive.',
      problem:'Choose one important component in your architecture. Assume it becomes unavailable for 30 minutes. With one architectural move only, explain what you would change and what still remains vulnerable.',
      supports:[
        'Start by tracing every information flow that touches the failed component.',
        'Think in architectural responses rather than products: alternate path, buffering, replication, or degraded service.',
        'A strong answer states both the response and its remaining failure mode.'
      ],
      placeholder:'Which component fails? What single architectural move do you make? What does that move still fail to solve?'
    },
    requirements:{
      host:'#depthRequirements',
      title:'One system, two flows, different priorities.',
      problem:'The indoor CO₂ measurements may arrive several minutes late. Outdoor abnormal-noise alerts should arrive within 5 seconds, and outdoor nodes may later be battery powered. Does one system-wide Top 3 still describe both flows? Defend a per-flow view.',
      supports:[
        'Compare the two flows independently before looking at your global Top 3.',
        'Ask which dimensions change: latency, energy, reliability, data volume, range, infrastructure…',
        'A strong answer identifies at least one priority that changes between the flows and one design consequence.'
      ],
      placeholder:'Flow A priorities… Flow B priorities… Therefore I would reconsider…'
    },
    discover:{
      host:'#depthDiscover',
      title:'Design the network shape before naming a technology.',
      problem:'150 outdoor nodes send a 20-byte report every 5 minutes. They are battery powered, spread over about 1.5 km, and the university may install a small amount of infrastructure. Propose a communication shape without using any technology name.',
      supports:[
        'Classify the problem first: local vs wide area, tiny vs heavy traffic, constrained vs powered devices.',
        'Decide whether devices should reach a nearby peer, local access point, gateway, or operator infrastructure.',
        'Only after the shape is clear, ask which technology families could plausibly implement it.'
      ],
      placeholder:'Device → … → … → application. Why this shape? Which assumptions make it plausible?'
    },
    stress:{
      host:'#depthStress',
      title:'Two failures. One architectural move.',
      problem:'Combine your selected campus incident with a 30-minute upstream Internet outage. You are allowed one structural change only. Choose it, then explain which failure is still only partially handled.',
      supports:[
        'Separate what fails locally from what fails only because an upstream service is unreachable.',
        'Look for one response that helps both events, such as local buffering, local processing, or an alternate path.',
        'A strong answer explicitly names the residual risk after the one-change budget is spent.'
      ],
      placeholder:'My one change is… It helps incident A because… It helps the outage because… It still does not solve…'
    }
  };
  function depthEntry(id){
    state.adaptiveDepth = state.adaptiveDepth || {};
    if(!state.adaptiveDepth[id]) state.adaptiveDepth[id]={support:0,response:''};
    return state.adaptiveDepth[id];
  }
  function renderAdaptiveDepth(){
    Object.entries(adaptiveDepthDefs).forEach(([id,d])=>{
      const host=$(d.host); if(!host)return;
      const x=depthEntry(id), support=Math.max(0,Math.min(3,Number(x.support)||0));
      const complete=(x.response||'').trim().length>=30;
      const selectedIncident=id==='stress'&&state.selectedStress?stressDefs.find(z=>z.id===state.selectedStress):null;
      const problem=id==='stress'&&selectedIncident?`Your first incident is <b>${esc(selectedIncident.title)}</b>. At the same time, the upstream Internet path is unavailable for 30 minutes. You are allowed <b>one structural change only</b>. Choose it and identify the residual risk.`:d.problem;
      host.innerHTML=`<div class="depth-intro"><div><strong>${d.title}</strong><p>Try the open problem first. Open support only when it genuinely helps.</p></div><span class="depth-rule">Beat the scaffold</span></div><div class="depth-problem"><strong>Open problem</strong><p>${problem}</p></div><div class="depth-supports">${d.supports.map((h,i)=>{const n=i+1,shown=support>=n,enabled=n===1||support>=n-1;return `<button type="button" class="depth-support-btn ${shown?'used':''}" data-depth-support="${id}" data-level="${n}" ${enabled?'':'disabled'}>${shown?'✓ ':''}Support ${n}</button>`}).join('')}</div><div class="depth-support-reveal">${d.supports.slice(0,support).map((h,i)=>`<div><b>Support ${i+1}</b> · ${h}</div>`).join('')}</div><label class="depth-response"><span class="label">Your reasoning</span><textarea data-depth-response="${id}" maxlength="900" placeholder="${esc(d.placeholder)}">${esc(x.response||'')}</textarea></label><div class="depth-status"><span>Support used: <strong>${support}/3</strong>${complete&&support===0?' · solved without support':''}</span><span class="${complete?'depth-complete':''}">${complete?'Depth route explored':'Write a short defended answer to complete this route.'}</span></div>`;
      const parent=host.closest('.adaptive-depth'); const badge=parent?.querySelector('.depth-badge'); if(badge)badge.textContent=`${support}/3 support`;
    });
    document.querySelectorAll('[data-depth-support]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.depthSupport,n=+b.dataset.level,x=depthEntry(id);x.support=Math.max(Number(x.support)||0,n);saveState();renderAdaptiveDepth();}));
    document.querySelectorAll('[data-depth-response]').forEach(t=>t.addEventListener('input',()=>{const id=t.dataset.depthResponse,x=depthEntry(id);x.response=t.value;if(t.value.trim().length>=30){state.challengeProgress={...(state.challengeProgress||{}),[id]:true};}saveState();renderExpertProgress();const status=t.closest('.adaptive-depth-body')?.querySelector('.depth-status span:last-child');if(status){const done=t.value.trim().length>=30;status.textContent=done?'Depth route explored':'Write a short defended answer to complete this route.';status.classList.toggle('depth-complete',done);}}));
  }

  /* ---------- Research trails: authentic source + prediction + reflection ---------- */
  const researchDefs=[
    {id:'ble-range',title:'Is Bluetooth LE a “10 metre technology”?',claim:'A colleague rejects BLE for a large building because “Bluetooth only works for about 10 metres.” Is that a defensible engineering claim?',choices:['Agree','Disagree','Depends'],source:'https://www.bluetooth.com/learn-about-bluetooth/feature-enhancements/',sourceLabel:'Bluetooth SIG · Feature enhancements',reflection:'After checking the source, name the variables or radio-mode trade-offs that make one fixed range number misleading.'},
    {id:'154-scope',title:'What does IEEE 802.15.4 actually give you?',claim:'A design note says: “We selected IEEE 802.15.4, so routing and the application protocol are now defined.” Predict whether that statement survives the standard description.',choices:['Agree','Disagree','Depends'],source:'https://standards.ieee.org/ieee/802.15.4/11041/',sourceLabel:'IEEE · 802.15.4 standard family',reflection:'What responsibilities does the standard cover, and what still has to be supplied above it?'},
    {id:'lorawan-private',title:'Does LoRaWAN imply an operator subscription?',claim:'A teammate says LoRaWAN is unsuitable for campus because it necessarily requires buying connectivity from a network operator. Make a prediction before checking the LoRa Alliance.',choices:['Agree','Disagree','Depends'],source:'https://lora-alliance.org/lorawan-for-developers/',sourceLabel:'LoRa Alliance · LoRaWAN for Developers',reflection:'Can LoRaWAN be private? If yes, what infrastructure or service responsibilities does the organisation then take on?'}
  ];
  function researchEntry(id){state.researchTrails=state.researchTrails||{};if(!state.researchTrails[id])state.researchTrails[id]={prediction:null,reflection:''};return state.researchTrails[id];}
  function renderResearchTrails(){
    const host=$('#researchTrailGrid');if(!host)return;
    host.innerHTML=researchDefs.map((d,i)=>{const x=researchEntry(d.id),done=!!x.prediction&&(x.reflection||'').trim().length>=20;return `<article class="research-card ${done?'research-complete':''}"><span class="research-kicker">Research trail ${i+1}</span><h4>${d.title}</h4><div class="research-claim">${d.claim}</div><div><span class="label">Prediction first</span><div class="research-predict">${d.choices.map(c=>`<button type="button" data-research-predict="${d.id}" data-choice="${c}" class="${x.prediction===c?'active':''}">${c}</button>`).join('')}</div></div>${x.prediction?`<div class="research-source"><a href="${d.source}" target="_blank" rel="noopener noreferrer">Open official source ↗</a><small>${d.sourceLabel}</small></div><div class="research-reflection"><label>${d.reflection}<textarea data-research-reflection="${d.id}" maxlength="700" placeholder="What did the source confirm, nuance or overturn?">${esc(x.reflection||'')}</textarea></label></div>`:`<div class="research-source"><small>Commit a prediction to unlock the source.</small></div>`}</article>`}).join('');
    host.querySelectorAll('[data-research-predict]').forEach(b=>b.addEventListener('click',()=>{const x=researchEntry(b.dataset.researchPredict);x.prediction=b.dataset.choice;saveState();renderResearchTrails();}));
    host.querySelectorAll('[data-research-reflection]').forEach(t=>t.addEventListener('input',()=>{const x=researchEntry(t.dataset.researchReflection);x.reflection=t.value;saveState();const card=t.closest('.research-card');if(card)card.classList.toggle('research-complete',!!x.prediction&&t.value.trim().length>=20);}));
  }


  /* ---------- Architecture v1 → v2 revision studio ---------- */
  function architectureChanged(){
    if(!state.architectureV1||!state.architectureV2)return false;
    return JSON.stringify(state.architectureV1)!==JSON.stringify(state.architectureV2);
  }
  function renderRevisionStudio(){
    const studio=$('#revisionStudio'); if(!studio)return;
    const ready=!!(state.selectedStress&&state.stressRequirement&&state.stressResponse);
    studio.hidden=!ready;
    const finish=$('#finishSessionBtn');
    if(!ready){if(finish){finish.disabled=true;finish.textContent='Complete the incident analysis first →';}return;}
    const v2=ensureArchitectureV2(),v1=state.architectureV1;
    $('#revisionV1Graph').innerHTML=miniGraphMarkupFor(v1);
    $('#revisionV2Graph').innerHTML=miniGraphMarkupFor(v2);
    const status=$('#revisionStatus'); const changed=architectureChanged(); if(status){status.textContent=changed?'v2 changed':'No change yet';status.classList.toggle('changed',changed);}
    const opts='<option value="">Choose…</option>'+v2.components.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join('');
    $('#v2RemoveComponent').innerHTML=opts; $('#v2FlowFrom').innerHTML=opts.replace('Choose…','From…'); $('#v2FlowTo').innerHTML=opts.replace('Choose…','To…');
    const list=$('#v2FlowList');
    list.innerHTML=v2.flows.length?v2.flows.map((f,i)=>{const a=v2.components.find(c=>String(c.id)===String(f.from)),b=v2.components.find(c=>String(c.id)===String(f.to));return `<div class="list-item"><span><strong>${esc(a?.name||'?')}</strong> <span class="flow-arrow-inline">→</span> <strong>${esc(b?.name||'?')}</strong><small>${esc(f.label||'unlabelled flow')}</small></span><button class="icon-button v2-remove-flow" data-i="${i}" type="button" aria-label="Remove revision flow">×</button></div>`}).join(''):'<p class="empty-copy">No flows in v2.</p>';
    list.querySelectorAll('.v2-remove-flow').forEach(b=>b.addEventListener('click',()=>{v2.flows.splice(+b.dataset.i,1);saveState();renderRevisionStudio();renderDesignDrawer();renderDesignEvolution();}));
    if(finish){finish.disabled=!changed;finish.textContent=changed?'Architecture v2 recorded → finish':'Record a v2 revision to finish →';}
  }
  $('#v2ComponentForm')?.addEventListener('submit',e=>{e.preventDefault();const inp=$('#v2ComponentInput'),name=inp.value.trim();if(!name)return;const v2=ensureArchitectureV2();const ids=v2.components.map(c=>Number(c.id)).filter(Number.isFinite);const id=(ids.length?Math.max(...ids):0)+1;v2.components.push({id,name,x:0,y:0});inp.value='';saveState();renderRevisionStudio();renderDesignDrawer();renderDesignEvolution();});
  $('#v2RemoveComponentBtn')?.addEventListener('click',()=>{const id=+$('#v2RemoveComponent').value;if(!id)return;const v2=ensureArchitectureV2();v2.components=v2.components.filter(c=>c.id!==id);v2.flows=v2.flows.filter(f=>f.from!==id&&f.to!==id);saveState();renderRevisionStudio();renderDesignDrawer();renderDesignEvolution();});
  $('#v2FlowForm')?.addEventListener('submit',e=>{e.preventDefault();const from=+$('#v2FlowFrom').value,to=+$('#v2FlowTo').value,label=$('#v2FlowLabel').value.trim();if(!from||!to||from===to){flashMessage('Choose two different components.');return;}const v2=ensureArchitectureV2();v2.flows.push({from,to,label});$('#v2FlowLabel').value='';saveState();renderRevisionStudio();renderDesignDrawer();renderDesignEvolution();});
  $('#resetV2')?.addEventListener('click',()=>{if(!state.architectureV1)return;state.architectureV2=cloneArchitecture(state.architectureV1);saveState();renderRevisionStudio();renderDesignDrawer();renderDesignEvolution();});
  function architectureDelta(){
    const v1=state.architectureV1,v2=state.architectureV2;if(!v1||!v2)return {added:[],removed:[],addedFlows:0,removedFlows:0};
    const m1=new Map(v1.components.map(c=>[String(c.id),c.name])),m2=new Map(v2.components.map(c=>[String(c.id),c.name]));
    const added=[...m2].filter(([id])=>!m1.has(id)).map(([,n])=>n),removed=[...m1].filter(([id])=>!m2.has(id)).map(([,n])=>n);
    const sig=f=>`${f.from}|${f.to}|${f.label||''}`,s1=new Set(v1.flows.map(sig)),s2=new Set(v2.flows.map(sig));
    return {added,removed,addedFlows:[...s2].filter(x=>!s1.has(x)).length,removedFlows:[...s1].filter(x=>!s2.has(x)).length};
  }
  function renderDesignEvolution(){
    const host=$('#designEvolution');if(!host)return;
    if(!state.architectureV1){host.innerHTML='';return;}
    const v2=state.architectureV2||state.architectureV1,d=architectureDelta(),changed=architectureChanged();
    const deltas=[...d.added.map(x=>`+ ${esc(x)}`),...d.removed.map(x=>`− ${esc(x)}`),d.addedFlows?`+ ${d.addedFlows} flow${d.addedFlows>1?'s':''}`:'',d.removedFlows?`− ${d.removedFlows} flow${d.removedFlows>1?'s':''}`:''].filter(Boolean);
    const incident=stressDefs.find(x=>x.id===state.selectedStress), req=requirementDefs.find(x=>x[0]===state.stressRequirement), response=responseChoices.find(x=>x[0]===state.stressResponse);
    host.innerHTML=`<div class="evolution-head"><span class="eyebrow">Visible learning artifact</span><h3>Architecture v1 → v2</h3><p>${changed?'Your final design is not the same object you started with. The incident forced a structural revision.':'No structural revision was recorded; compare your verbal response with the frozen v1.'}</p></div>${incident&&req&&response?`<div class="evolution-cause"><span>Changed assumption</span><strong>${esc(incident.title)}</strong><b>→</b><span>Requirement under pressure</span><strong>${esc(req[2])}</strong><b>→</b><span>Response</span><strong>${esc(response[1])}</strong></div>`:''}<div class="evolution-grid"><div><span>V1 · before requirements and incident</span>${miniGraphMarkupFor(state.architectureV1)}</div><div><span>V2 · after the incident</span>${miniGraphMarkupFor(v2)}</div></div><div class="evolution-delta">${deltas.length?deltas.map(x=>`<span>${x}</span>`).join(''):'<span>No structural delta recorded</span>'}</div>`;
  }

  /* ---------- Retrieval checkpoint ---------- */
  const recallPrompts = [
    {id:'beforetech', q:'Before choosing a communication technology, what should you make explicit first?', a:'The application need, architecture/flows, and the requirements or constraints that matter for those flows.'},
    {id:'operator', q:'Which network shape makes operator coverage an explicit design assumption?', a:'Operator-managed wide-area / cellular IoT: the device relies on cellular base stations and an operator network.'},
    {id:'scope', q:'Why is IEEE 802.15.4 not the same kind of object as LoRaWAN?', a:'802.15.4 provides lower-level local radio/link building blocks; LoRaWAN defines a wider network architecture around devices, gateways and network services.'},
    {id:'feedback', q:'Why does an acknowledged command not prove that the physical action succeeded?', a:'An acknowledgement can confirm message or controller handling, while the actuator or physical process may still fail. Closed-loop control needs evidence of the resulting physical state.'},
    {id:'transfer', q:'Tomorrow one CO₂ sensor is replaced by a camera sending frequent images. Which part of your reasoning should you revisit first?', a:'Revisit the requirements of that flow first — especially data volume/throughput, and potentially energy/latency — then re-evaluate the communication path and technology choice.'}
  ];
  function renderMemoryLock(){
    const host=$('#memoryLock'); if(!host)return;
    host.innerHTML=`<div class="memory-head"><span class="memory-icon">↺</span><div><strong>30-second memory lock</strong><small>Say the answer to your group before revealing it.</small></div></div><div class="memory-grid">${recallPrompts.map((x,i)=>{const shown=!!state.recall?.[x.id];return `<article class="memory-card ${shown?'revealed':''}"><span class="memory-number">${i+1}</span><strong>${x.q}</strong>${shown?`<p>${x.a}</p>`:`<button type="button" class="text-button recall-reveal" data-recall="${x.id}">Reveal after answering</button>`}</article>`}).join('')}</div><div class="memory-progress">${recallPrompts.filter(x=>state.recall?.[x.id]).length} / ${recallPrompts.length} revealed</div>`;
    host.querySelectorAll('[data-recall]').forEach(b=>b.addEventListener('click',()=>{state.recall={...(state.recall||{}),[b.dataset.recall]:true};saveState();renderMemoryLock();}));
    const synth=$('#sessionSynthesis'); if(synth) synth.hidden=recallPrompts.some(x=>!state.recall?.[x.id]);
  }

  /* ---------- Export / import ---------- */
  function exportSession() {
    const output = {course:'IoT Systems Design', session:'Session 1', exportedAt:new Date().toISOString(), data:state};
    const blob=new Blob([JSON.stringify(output,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob), a=document.createElement('a');
    a.href=url; a.download='iot-systems-design-session1.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1200);
  }
  $('#exportBtn').addEventListener('click',exportSession);
  $('#finishExport').addEventListener('click',exportSession);
  $('#importInput').addEventListener('change', e=>{
    const file=e.target.files?.[0]; if(!file)return;
    const reader=new FileReader();
    reader.onload=()=>{try{const parsed=JSON.parse(reader.result);const candidate=parsed.data||parsed;if(!Array.isArray(candidate.components)||!Array.isArray(candidate.flows))throw new Error();state={...structuredClone(defaultState),...candidate};state.maxUnlockedScreen=Math.max(Number(state.maxUnlockedScreen)||0,Number(state.screen)||0);nextComponentId=Math.max(1,...state.components.map(c=>+c.id||0))+1;saveState();renderAll();showScreen(state.screen,{scroll:false});}catch(_){alert('This is not a valid Session 1 export.');}};
    reader.readAsText(file); e.target.value='';
  });
  $('#resetBtn').addEventListener('click',()=>{if(!confirm('Reset all work stored for this session on this device?'))return;state=structuredClone(defaultState);nextComponentId=1;saveState();renderAll();showScreen(0);});
  $('#reviewSession').addEventListener('click',()=>showScreen(0));

  function flashMessage(text) {
    let el=document.querySelector('.toast');
    if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el);} el.textContent=text;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1800);
  }

  function renderAll() {
    renderLandscape();
    renderArchitecture();
    renderClosedLoop();
    renderRequirements();
    renderTechDiscovery();
    renderShapeChallenge();
    renderMysteries();
    renderTechnologyLibrary();
    renderScenarios();
    renderCampusDecision();
    renderStress();
    renderAdaptiveDepth(); renderResearchTrails(); renderStopSnapshots(); renderExpertProgress(); renderMemoryLock(); renderStopRitual(); renderFieldGuide(); renderRevisionStudio(); renderDesignEvolution();
    renderStepper(); renderHistoryNav();
  }

  loadState();
  renderAll();
  showScreen(state.screen, {scroll:false});
})();
