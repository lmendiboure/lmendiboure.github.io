(() => {
  const KEY = 'environnements-connectes-mission-v1';
  const SCHEMA_VERSION = 1;
  const clone = x => JSON.parse(JSON.stringify(x));
  const now = () => new Date().toISOString();

  function emptyDossier(){
    return {
      schemaVersion: SCHEMA_VERSION,
      dossierVersion: '1.0',
      courseId: 'environnements-connectes',
      missionId: 'vallee-des-aldudes',
      missionTitle: 'Mission Vallée des Aldudes',
      createdAt: null,
      updatedAt: null,
      territory: {
        name: 'Vallée des Aldudes',
        places: ['Banca', 'Les Aldudes', 'Urepel']
      },
      team: {name: ''},
      progress: {lastEpisodeTouched: 0, lastEpisodeCompleted: 0, episodes: {}},
      observation: null,
      collecte: null,
      representation: null,
      decision: null,
      exploitation: null
    };
  }

  function normalise(value){
    const base = emptyDossier();
    if(!value || typeof value !== 'object') return base;
    return {
      ...base,
      ...value,
      territory: {...base.territory, ...(value.territory || {})},
      team: {...base.team, ...(value.team || {})},
      progress: {
        ...base.progress,
        ...(value.progress || {}),
        episodes: {...base.progress.episodes, ...((value.progress || {}).episodes || {})}
      },
      schemaVersion: SCHEMA_VERSION
    };
  }

  function load(){
    try{
      const raw = localStorage.getItem(KEY);
      return raw ? normalise(JSON.parse(raw)) : emptyDossier();
    }catch(_){ return emptyDossier(); }
  }

  function save(dossier){
    const next = normalise(clone(dossier));
    const stamp = now();
    if(!next.createdAt) next.createdAt = stamp;
    next.updatedAt = stamp;
    try{
      localStorage.setItem(KEY, JSON.stringify(next));
      return {ok:true, dossier:next, bytes:new Blob([JSON.stringify(next)]).size};
    }catch(error){
      console.warn('Mission dossier could not be saved', error);
      return {ok:false, dossier:next, error};
    }
  }

  function update(mutator){
    const dossier = load();
    const result = typeof mutator === 'function' ? (mutator(dossier) || dossier) : {...dossier, ...(mutator || {})};
    return save(result);
  }

  function replace(dossier){ return save(dossier); }

  function clearFromEpisode(episode){
    const n = Number(episode) || 1;
    return update(d => {
      const fields = ['observation','collecte','representation','decision','exploitation'];
      fields.slice(Math.max(0,n-1)).forEach(k => d[k] = null);
      Object.keys(d.progress.episodes || {}).forEach(k => { if(Number(k) >= n) delete d.progress.episodes[k]; });
      d.progress.lastEpisodeTouched = Math.min(d.progress.lastEpisodeTouched || 0, n-1);
      d.progress.lastEpisodeCompleted = Math.min(d.progress.lastEpisodeCompleted || 0, n-1);
      return d;
    });
  }

  function sizeBytes(){
    try{return new Blob([localStorage.getItem(KEY) || '']).size}catch(_){return 0}
  }

  function makeBundle(sessionStates={}){
    return {
      format: 'environnements-connectes-mission-bundle',
      schemaVersion: SCHEMA_VERSION,
      exportedAt: now(),
      mission: load(),
      sessions: clone(sessionStates)
    };
  }

  function importBundle(payload){
    if(!payload || typeof payload !== 'object') throw new Error('Format invalide');
    if(payload.format === 'environnements-connectes-mission-bundle' && payload.mission){
      const result = replace(payload.mission);
      if(!result.ok) throw result.error || new Error('Sauvegarde impossible');
      return {mission: result.dossier, sessions: payload.sessions || {}};
    }
    if(payload.mission && payload.mission.missionId === 'vallee-des-aldudes'){
      const result = replace(payload.mission);
      if(!result.ok) throw result.error || new Error('Sauvegarde impossible');
      return {mission: result.dossier, sessions: payload.sessions || {}};
    }
    throw new Error('Ce fichier ne contient pas un dossier de mission compatible.');
  }

  window.ECMissionStore = {KEY, SCHEMA_VERSION, emptyDossier, load, save, update, replace, clearFromEpisode, sizeBytes, makeBundle, importBundle};
})();
