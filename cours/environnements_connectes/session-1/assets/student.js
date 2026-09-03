(() => {
  const STORAGE_KEY = 'environnements-connectes-session1-v9';
  const MissionStore = window.ECMissionStore;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const clone = x => JSON.parse(JSON.stringify(x));
  const labelFrom = (list,id) => list.find(x=>x[0]===id)?.[1] || id || '';

  const defaultState = {
    version:9, screen:0, frontier:0, completed:false, teamName:'', conceptUnlocks:{}, stopChallenges:{},
    needs:[], customNeeds:[], ranks:['','',''], priorityImpacts:{},
    decisions:{}, decisionChallenge:{decision:'',removed:'',assumption:''},
    chain:[], floodChain:[],
    sources:[], sourceProfiles:{}, sourceProfilesLocked:false, forestPair:[], forestComplement:'', sourceUseCases:{},
    classify:{}, classifyOrigin:'', classifyLocked:false, bridgeChain:[],
    metadata:[], timeMatch:{}, comparisonReasons:[], timeChallenge:'',
    observationCases:{}, freshness:'', representativity:[], representativityLocked:false,
    quality:{}, qualityLocked:false, qualityUsage:{}, qualityUsageReason:{}, qualityDossierReason:{}, qualityFocus:0, qualityUsageLocked:false, bridgeQuality:[], qualityMismatch:{data:'',use:''},
    strategy:[], strategyClaims:{}, blindSpot:'', strategyV1:null,
    incident:null, strategyV2:null, revisionDecisionImpact:'', revisionCausal:{hypothesis:'',information:'',action:'',weakness:''}, revisionNote:'', retrieval:{}
  };
  let state=clone(defaultState);

  const needDefs = [
    ['water_level','Eau & crue','Niveau de la Nive','grandeur locale et évolution'],
    ['upstream_rain','Eau & crue','Pluie locale / amont','contexte et anticipation'],
    ['road_access','Routes & accès','Praticabilité d’un accès','eau, obstacle, visibilité'],
    ['slope','Routes & accès','Mouvement d’un versant','instabilité / chute de blocs'],
    ['bridge','Ouvrages','Comportement d’un ouvrage','déformation, vibration, fissure'],
    ['fire','Forêt','Signal de départ de feu','fumée, anomalie thermique, contexte'],
    ['vegetation','Forêt','État / sécheresse de la végétation','évolution spatiale'],
    ['soil','Agriculture','Humidité du sol','état hydrique local'],
    ['pasture','Agriculture','État des pâtures','ressource disponible'],
    ['building','Bâtiments','Occupation / confort','présence, température, CO₂'],
    ['energy','Bâtiments','Consommation d’énergie / eau','usage et anomalie'],
    ['weather','Contexte','Prévisions météo locales','évolution attendue'],
    ['history','Contexte','Historique d’incidents / inspections','mémoire du territoire'],
    ['tourism_stats','Contexte long terme','Statistiques annuelles de fréquentation','utile pour planifier, rarement décisif à court terme'],
    ['climate_norm','Contexte long terme','Moyenne climatique pluriannuelle','référence utile, peu sensible à une situation immédiate']
  ];
  const needImpactOptions=[['safety','Sécurité / mise en protection'],['access','Continuité d’accès / service'],['inspection','Inspection / maintenance'],['resources','Gestion de ressources'],['anticipation','Anticipation d’un événement'],['comfort','Confort / performance']];
  const decisionDefs=[
    {id:'road',title:'Fermer temporairement un accès routier',limit:1,options:[['road_state','État actuel de l’accès : eau, obstacle, visibilité'],['trend','Évolution attendue dans les prochaines minutes'],['alt','Possibilité d’un itinéraire alternatif'],['traffic','Importance du trafic à cet instant']]},
    {id:'bridge',title:'Envoyer une équipe inspecter un ouvrage après un événement',limit:1,options:[['trigger','Nature de l’événement et anomalie observée'],['history','État connu lors de la dernière inspection'],['traffic','Importance de l’ouvrage pour la circulation'],['weather','Conditions météo depuis l’événement']]},
    {id:'flood',title:'Déclencher une vigilance locale liée à la Nive',limit:1,options:[['level','Niveau / débit et tendance locale'],['upstream','Pluie et évolution amont'],['forecast','Prévision de pluie à très court terme'],['exposure','Accès et zones potentiellement exposés']]},
    {id:'pasture',title:'Adapter l’usage d’une pâture / d’un point d’eau',limit:1,options:[['hydric','État hydrique / disponibilité en eau'],['resource','État de la ressource végétale'],['weather','Météo attendue à court terme'],['usage','Usage récent de la parcelle / du point d’eau']]}
  ];
  const decisionTagLabels={road:'ROUTE',bridge:'PONT',flood:'CRUE',pasture:'PÂTURE'};
  const challengeActions=[['act','J’agis quand même avec ce que j’ai','Vous supposez implicitement que l’incertitude restante est acceptable et que la situation ne changera pas assez vite pour invalider l’action.'],['confirm','Je cherche une confirmation indépendante','Vous rendez visible une dépendance : la décision tient encore seulement si une autre source peut confirmer à temps.'],['suspend','Je suspends / diffère la décision','Vous reconnaissez que l’information retirée était réellement critique pour justifier l’action immédiate.']];
  const chainItems=['Phénomène réel','Observable','Mesure produite','Information interprétée','Décision'];
  const floodSlotLabels=['DÉCISION · Que faut-il décider ?','INFORMATION · Que faut-il savoir ?','PHÉNOMÈNE · Que se passe-t-il physiquement ?','OBSERVABLE · Quelle grandeur renseigne ce phénomène ?','MESURE · Quelle valeur est produite ?'];
  const floodChainDefs=[['decision_close','Fermer ou maintenir l’accès'],['info_risk','Savoir si l’accès est menacé dans les prochaines minutes'],['phen_hydro','Montée / débordement de la Nive au droit de l’accès'],['obs_level','Hauteur d’eau et vitesse d’évolution au point suivi'],['measure_station','1,24 m à 14:02 · +8 cm en 10 min'],['noise_dashboard','Afficher un tableau de bord plus lisible'],['noise_sensor','Installer un capteur connecté'],['noise_weather','Prévision météo régionale à J+3']];
  const sourceDefs=[['sensor','MESURE FIXE','Capteur / station in situ','fréquent et local, si l’équipement reste opérationnel'],['mobile','MOBILE','Capteur embarqué / mobile','échantillonne le long d’un trajet ou d’un usage'],['camera','IMAGE','Caméra visible / thermique','contexte local riche, dépendant de visibilité et interprétation'],['drone','AÉRIEN','Drone / inspection aérienne','détail élevé, déclenché à la demande'],['satellite','TÉLÉDÉTECTION','Satellite optique / radar','grande couverture, revisite et exploitabilité contraintes'],['external','EXTERNE','Service météo / hydrométrie / cartographie','information déjà produite par un autre système'],['records','MÉTIER','Historique d’inspection / maintenance','mémoire utile, pas observation temps réel'],['human','HUMAIN','Signalement / expertise terrain','contexte riche, disponibilité irrégulière']];
  const profileTargets=['sensor','satellite','drone','human'];
  const sourceZones=[['local_fast','Local + fréquent'],['wide_fast','Large + périodique'],['local_event','Local + ponctuel'],['wide_event','Zone + à la demande']];
  const profileSpace=[['point','Un point / un site'],['zone','Une zone / un ouvrage / une parcelle'],['wide','Une grande partie du territoire']];
  const profileTime=[['continuous','En continu ou toutes les quelques minutes'],['periodic','À intervalles réguliers plus espacés'],['ondemand','Quand on déclenche une observation / après un événement']];
  const sourceProfileContexts={sensor:'Station hydrométrique fixe au droit d’un point suivi',satellite:'Imagerie couvrant régulièrement un territoire étendu',drone:'Mission déclenchée pour documenter une zone ciblée',human:'Inspection ou signalement déclenché sur un site / accès'};
  const sourceProfileExpected={sensor:{space:'point',time:'continuous'},satellite:{space:'wide',time:'periodic'},drone:{space:'zone',time:'ondemand'},human:{space:'point',time:'ondemand'}};
  const sourceProfileWhy={
    sensor:'Une station fixe reste attachée à un site, mais peut renouveler sa mesure très souvent.',
    satellite:'Une scène couvre un territoire large ; une nouvelle observation dépend du passage et de l’exploitabilité de la scène.',
    drone:'La mission est déclenchée lorsqu’un besoin apparaît et couvre une zone ciblée pendant le vol.',
    human:'Une inspection ou un signalement concerne un lieu précis et existe lorsqu’une personne est présente ou mobilisée.'
  };
  const complementOptions=[['precision','Précision / exactitude de la valeur'],['latency','Latence et fraîcheur réelle au moment de décider'],['availability','Disponibilité et dépendances de service'],['operations','Accès, maintenance, météo ou conditions d’exploitation'],['space','Étendue spatiale couverte'],['time','Rythme / fréquence d’observation']];
  const mapReadingOptions=[['profile','La carte compare un profil spatial et temporel ; elle ne classe pas la qualité globale des sources.'],['ranking','Une source placée plus haut ou plus à droite est globalement meilleure.'],['fixed','Chaque technologie possède une position universelle, indépendante du contexte de déploiement.']];
  const sourceUseCaseDefs=[['fast_point','Crue · suivre le niveau au même point toutes les 2 minutes','local_fast'],['slope_event','Versant · documenter une zone après un glissement','wide_event'],['valley_periodic','Végétation · revoir régulièrement l’état à l’échelle de la vallée','wide_fast']];
  const classifyDefs=[
    ['c1','CRUE · station locale','La station produit une hauteur d’eau à son emplacement.','On cherche la hauteur d’eau à cet endroit.','direct'],
    ['c2','PÂTURE · décision d’usage','Un capteur produit l’humidité du sol en un point.','On cherche à juger le besoin hydrique de toute la parcelle.','proxy'],
    ['c3','FEU · vigilance','Images thermiques + météo alimentent un modèle.','On cherche une probabilité de départ de feu.','inference'],
    ['c4','MÉTÉO · anticipation','Un service fournit une prévision de pluie calculée.','On cherche la pluie attendue dans les prochaines heures.','inference'],
    ['c5','OUVRAGE · instrumentation','Un accéléromètre produit l’accélération du tablier.','On cherche l’accélération au point instrumenté.','direct'],
    ['c6','OUVRAGE · diagnostic','On suit l’évolution d’une fréquence propre calculée à partir des vibrations.','On cherche un changement possible d’état structurel.','proxy']
  ];
  const classifyOptions=[['direct','Observation directe'],['proxy','Proxy / indicateur'],['inference','Inférence / état estimé']];
  const bridgeChainDefs=[['signal','Accélération / vibration mesurée'],['indicator','Indicateur de comportement dynamique'],['state','Suspicion de changement / désordre'],['decision','Inspection, restriction ou surveillance renforcée'],['noise','Le capteur mesure directement la santé du pont']];
  const metadataDefs=[['variable','Grandeur observée'],['unit','Unité'],['where','Lieu / objet d’intérêt'],['when','Temps du phénomène'],['source','Source / procédure'],['quality','Qualité / contexte'],['dashboard','Couleur du widget dans le dashboard']];
  const timeRows=[['14:02','phenomenon'],['14:08','result'],['14:30','arrival']];
  const timeLabels=[['phenomenon','Temps du phénomène observé'],['result','Temps de production du résultat'],['arrival','Temps d’arrivée dans l’application']];
  const comparisonReasonDefs=[['variable','Grandeur différente'],['where','Lieu / objet différent'],['time','Temps du phénomène différent'],['source','Procédure / provenance différente'],['quality','Qualité / incertitude différente'],['value','La valeur numérique est différente']];
  const obsDefs=[
    ['flood','Crue rapide près d’un accès','Le niveau peut évoluer fortement en ≈10 min ; décision attendue dans le quart d’heure',[
      ['fit','Point critique + contexte amont · acquisition toutes les 2 min'],
      ['slow','Même point · acquisition toutes les 60 min'],
      ['wide','Toute la vallée · nouvelle vue tous les 5 jours']
    ],'fit','La dynamique temporelle domine : il faut renouveler l’observation plus vite que le phénomène ne devient dangereux, tout en gardant le point critique sous surveillance.'],
    ['bridge','Ouvrage après un choc','Événement brutal et localisé ; décider dans l’heure s’il faut inspecter ou restreindre',[
      ['event','Observation ciblée déclenchée par l’événement + comparaison à un état de référence'],
      ['weekly','Observation ciblée une fois par semaine'],
      ['valley','Vue générale de la vallée chaque jour']
    ],'event','Le phénomène est localisé et l’événement est court : le plan doit être déclenché au bon moment et sur le bon objet, pas seulement être fréquent en moyenne.'],
    ['pasture','État d’une pâture de 50 ha','Décision dans les prochains jours ; forte variabilité possible à l’intérieur de la parcelle',[
      ['spatial','Plusieurs points / zones + couverture régulière de la parcelle'],
      ['single','Un seul point très précis mesuré en continu'],
      ['annual','Une observation exhaustive une fois par an']
    ],'spatial','La variabilité spatiale domine : un point très précis peut rester peu représentatif de 50 ha.']
  ];
  const spaceOptions=[['point','Point / objet'],['zone','Zone / bâtiment'],['wide','Large territoire']];
  const timeOptions=[['minutes','Secondes / minutes'],['hours','Heures'],['days','Jours / semaines']];
  const representativityDefs=[['r1','La valeur peut être très précise au point mesuré.',true],['r2','Cette précision suffit à représenter les 50 ha.',false],['r3','La variabilité spatiale de la parcelle peut rester inconnue.',true],['r4','Ajouter des points peut améliorer la représentativité, pas la précision intrinsèque du capteur.',true]];
  const qualityDefs=[['q1','Capteur très précis, un seul point','±0,1 unité mais une seule localisation pour toute la vallée.','representativite'],['q2','Carte complète datant de trois semaines','Très bonne couverture spatiale, mais le phénomène a pu évoluer.','fraicheur'],['q4','Deux sources donnent des valeurs incompatibles','Même zone et même heure, résultats fortement divergents.','coherence'],['q5','Service indisponible pendant l’épisode critique','Donnée correcte mais inaccessible au moment de décider.','disponibilite']];
  const qualityOptions=[['precision','Précision / exactitude'],['fraicheur','Fraîcheur'],['representativite','Représentativité'],['completude','Complétude'],['coherence','Cohérence'],['disponibilite','Disponibilité']];
  const qualityUsageDefs=[
    ['map_alert','Relevé complet de l’état des accès datant de trois semaines','Décider aujourd’hui de fermer un accès après l’épisode pluvieux','fragile','État des accès · relevé il y a 3 semaines'],
    ['map_history','Relevé complet de l’état des accès datant de trois semaines','Préparer la tournée d’inspection de demain en ciblant d’abord les accès déjà dégradés lors du dernier relevé','acceptable','État des accès · relevé il y a 3 semaines'],
    ['point_parcel','Capteur très précis sur un seul point','Décrire l’état de toute une pâture de 50 ha','fragile','Mesure locale · ±0,1'],
    ['point_local','Capteur très précis sur un seul point','Suivre précisément ce point d’eau instrumenté','acceptable','Mesure locale · ±0,1'],
    ['service_now','Service externe correct mais indisponible pendant 40 min','Décider maintenant si une intervention est sûre','fragile','Service externe · interruption 40 min'],
    ['service_audit','Service externe correct mais indisponible pendant 40 min','Analyser demain l’épisode après rétablissement et récupération des données','acceptable','Service externe · interruption 40 min']
  ];
  const qualityScenarioContext={
    'État des accès · relevé il y a 3 semaines':'Dossier 1 · Après plusieurs jours de pluie, Maialen retrouve un relevé complet de l’état des accès réalisé trois semaines plus tôt. Le document est le même ; seule la décision change.',
    'Mesure locale · ±0,1':'Dossier 2 · Peio dispose d’un capteur étalonné très précisément sur un seul point d’eau, au sein d’une pâture d’environ 50 ha.',
    'Service externe · interruption 40 min':'Dossier 3 · Samir sait que le service externe est habituellement fiable, mais il a été inaccessible pendant 40 minutes au moment critique.'
  };
  const qualityScenarioDimension={
    'État des accès · relevé il y a 3 semaines':'fraicheur',
    'Mesure locale · ±0,1':'representativite',
    'Service externe · interruption 40 min':'disponibilite'
  };
  const qualityScenarioWhy={
    'État des accès · relevé il y a 3 semaines':'Le document est complet dans les deux cas. Ce qui change est l’exigence de fraîcheur : préparer une tournée peut exploiter un historique, alors qu’une fermeture aujourd’hui exige un état beaucoup plus récent.',
    'Mesure locale · ±0,1':'La précision du capteur ne change pas. Ce qui change est l’objet à représenter : un point instrumenté peut être très bien suivi sans représenter une pâture de 50 ha.',
    'Service externe · interruption 40 min':'La donnée peut rester correcte après rétablissement. Pour une décision immédiate, son indisponibilité au moment critique suffit pourtant à la rendre insuffisante.'
  };
  const qualityDimensionCandidates={
    'État des accès · relevé il y a 3 semaines':['fraicheur','completude','coherence'],
    'Mesure locale · ±0,1':['precision','representativite','completude'],
    'Service externe · interruption 40 min':['disponibilite','fraicheur','coherence']
  };
  const qualityUsageActors={map_alert:'Maialen · sécurité maintenant',map_history:'Inès · préparation inspection',point_parcel:'Peio · gestion de la pâture',point_local:'Samir · suivi du point instrumenté',service_now:'Peio · intervention immédiate',service_audit:'Samir · analyse après l’épisode'};
  const mismatchData=[['oldmap','Carte complète vieille de trois semaines'],['monthly','Mesure structurelle mensuelle très précise'],['local','Capteur local très précis'],['holes','Série récente avec de nombreux trous']];
  const mismatchUse=[['alert','Alerte immédiate'],['history','Analyse historique'],['territory','Représenter tout le territoire'],['continuous','Suivi continu sans interruption']];
  const strategyDefs=[['river','Station hauteur / débit','état local fréquent'],['rain','Pluie / météo locale','contexte météo local'],['hydroext','Hydrométrie existante','contexte amont / aval'],['weather','Radar / prévision météo','anticipation à large échelle'],['camera','Caméra locale','contrôle visuel local'],['topo','Topographie / zones à risque','contexte spatial stable'],['satellite','Satellite','couverture large périodique'],['drone','Drone d’inspection','détail local à la demande'],['human','Inspection / signalement terrain','validation contextualisée']];
  const strategyGroups=[['terrain','SUR LE TERRAIN','Mesures ou observations locales, maintenues ou déclenchées.',['river','rain','camera','drone','human']],['context','SERVICES / CONTEXTE','Données déjà produites ou couvrant une portion plus large du territoire.',['hydroext','weather','topo','satellite']]];
  const roleOptions=[['local_level','État hydraulique local'],['upstream','Évolution amont / météo'],['spatial','Contexte spatial / zones exposées'],['visual','Vérification visuelle'],['validation','Validation / expertise terrain'],['trend','Tendance / historique']];
  const limitOptions=[['point','Très local / représentativité limitée'],['delay','Temporalité / retard'],['availability','Disponibilité / accès au service'],['visibility','Visibilité / conditions d’observation'],['maintenance','Maintenance / alimentation / accès'],['model','Dépendance à un modèle ou produit dérivé'],['human','Dépendance à une intervention humaine']];
  const blindSpotOptions=[['upstream','Un événement amont mal observé'],['local','Une zone locale reste peu couverte'],['freshness','La fraîcheur reste insuffisante pour une décision rapide'],['common','Plusieurs sources partagent une dépendance commune'],['maintenance','La disponibilité à long terme / maintenance reste fragile'],['impact','Les observations décrivent mal les conséquences sur les personnes / ouvrages']];
  const incidentDefs=[['fail','Station locale indisponible','Votre source locale la plus fréquente ne transmet plus.'],['drift','Capteur en dérive','La station continue à produire des valeurs plausibles mais biaisées.'],['delay','Données externes retardées','Le flux météo arrive avec 45 minutes de retard.'],['conflict','Sources contradictoires','Une observation visuelle suggère un danger, la station indique un état normal.']];
  const decisionImpactOptions=[['yes','Oui · je peux encore décider avec la même règle'],['conditional','Seulement sous condition · confirmation ou règle plus prudente'],['no','Non · je dois suspendre la décision ou changer de mode']];
  const revisionActionMap={fail:['alternate','human','degrade','wait'],drift:['exclude','crosscheck','human','degrade'],delay:['wait','degrade','alternate','localrule'],conflict:['crosscheck','human','exclude','degrade']};
  const revisionHypotheses=[['available','La source principale resterait disponible'],['accurate','Une valeur plausible serait correcte'],['fresh','La donnée externe serait suffisamment fraîche'],['consistent','Les sources convergeraient'],['independent','Les sources seraient réellement indépendantes']];
  const revisionInfoOptions=[['local','État local actuel'],['trend','Évolution / tendance'],['forecast','Anticipation à court terme'],['spatial','Contexte spatial'],['confidence','Confiance dans la situation'],['access','Praticabilité / impact sur un accès']];
  const revisionActions=[['alternate','Ajouter / mobiliser une source alternative'],['crosscheck','Exiger un recoupement avant décision'],['exclude','Écarter temporairement la source suspecte'],['human','Passer en validation / inspection humaine'],['degrade','Passer en mode dégradé : état inconnu / marge de sécurité'],['wait','Différer la décision si le coût du retard est acceptable'],['localrule','Changer la règle d’exploitation plutôt que le matériel']];
  const revisionWeaknesses=[['cost','Coût / maintenance supplémentaire'],['delay','Décision plus lente'],['coverage','Zone toujours non couverte'],['dependency','Nouvelle dépendance commune'],['human','Besoin d’une intervention humaine'],['uncertainty','Incertitude résiduelle sur l’état réel']];
  const incidentCausalMap={fail:{hypothesis:['available'],information:['local','trend','confidence']},drift:{hypothesis:['accurate','consistent'],information:['local','trend','confidence']},delay:{hypothesis:['fresh','available'],information:['forecast','trend','confidence']},conflict:{hypothesis:['consistent','independent','accurate'],information:['confidence','local','access']}};
  const retrievalDefs=[{id:'r1',q:'Avant de choisir une source, par quoi faut-il commencer ?',opts:[['decision','La décision et l’information nécessaire'],['sensor','Le type de capteur'],['cloud','La plateforme de données']],correct:'decision',why:'On part de l’action à soutenir, puis de l’information nécessaire — pas de la technologie disponible.'},{id:'r2',q:'Un capteur mesure très précisément l’accélération d’un pont. Mesure-t-il directement « la santé du pont » ?',opts:[['no','Non : il mesure une grandeur ; l’état du pont demande encore interprétation ou indicateurs'],['yes','Oui : une mesure précise donne directement l’état du pont']],correct:'no',why:'Une mesure peut être directe pour une grandeur et seulement un proxy ou une entrée d’inférence pour l’état réellement recherché.'},{id:'r3',q:'Une donnée vieille de trois semaines est-elle forcément une « mauvaise donnée » ?',opts:[['depends','Non : cela dépend de la décision et de l’horizon considéré'],['yes','Oui : une donnée ancienne est toujours inutilisable']],correct:'depends',why:'La qualité est relative à l’usage : trois semaines peuvent être trop anciennes pour fermer une route aujourd’hui et encore utiles comme contexte pour prioriser une inspection, sans prétendre décrire l’état actuel.'},{id:'r4',q:'Deux sources différentes utilisent le même service météo en amont. Sont-elles vraiment indépendantes ?',opts:[['no','Pas complètement : elles partagent une dépendance commune'],['yes','Oui : deux sources différentes sont forcément redondantes']],correct:'no',why:'Deux technologies différentes peuvent échouer ensemble si elles dépendent du même réseau, fournisseur, modèle ou service amont.'},{id:'r5',q:'Un capteur très précis en un point suffit-il à rendre l’observation représentative de toute une parcelle ?',opts:[['no','Non : précision locale et représentativité spatiale sont deux propriétés différentes'],['yes','Oui : une mesure plus précise représente nécessairement mieux toute la zone']],correct:'no',why:'La précision décrit la qualité de la valeur au point observé ; la représentativité décrit la capacité de ce point à renseigner l’objet ou la zone visée.'}];

  const conceptDefs={
    need:{title:'Une priorité informationnelle n’est pas absolue',bridge:'Vos Top 3 diffèrent parce que vous n’avez pas tous donné le même poids à la sécurité, à l’accès, à la maintenance, à l’anticipation ou au même horizon temporel.',formal:'Une information devient prioritaire relativement à un <strong>usage</strong>, un <strong>horizon</strong> et au <strong>coût d’une erreur</strong>. La disponibilité d’une donnée ne crée pas automatiquement sa valeur.',carry:'Quand une liste de besoins semble évidente, demandez : <strong>pour quel usage cette information passe-t-elle réellement devant les autres ?</strong>',summary:'Priorité = relative à un usage, un horizon et un coût d’erreur.',keep:'Disponible ≠ prioritaire.'},
    chain:{title:'Deux sens pour une même chaîne',bridge:'À Banca, deux mouvements coexistent : pendant la conception, vous partez de la décision pour descendre vers ce qu’il faut mesurer ; en exploitation, l’information remonte du phénomène observé vers la décision.',formal:'<strong>Concevoir :</strong> décision → information nécessaire → phénomène → observable → mesure. <strong>Exploiter :</strong> phénomène → observable → mesure → information interprétée → décision.',carry:'Si une technologie semble évidente, revenez d’abord au sens conception : <strong>quelle décision, quelle information, quel observable ?</strong>',summary:'Conception : décision → mesure · exploitation : phénomène → décision.',keep:'Ne confondez pas le sens du raisonnement de conception et le sens de circulation de l’information.'},
    proxy:{title:'Sources, proxies et inférences',bridge:'Température, pixels, accélération ou humidité peuvent être directement produits ; “santé du pont”, “stress hydrique” ou “départ de feu” demandent une relation, une règle ou un modèle.',formal:'Séparez d’abord <strong>observation directe</strong>, <strong>proxy / indicateur</strong> et <strong>inférence</strong> : ils décrivent la relation entre ce qui est produit et l’état recherché. Traitez ensuite la <strong>provenance interne / externe</strong> comme un axe distinct, qui ajoute des dépendances.',carry:'Pour chaque information, écrivez mentalement : <strong>ce qui est réellement observé → ce qui est interprété</strong>.',summary:'Direct ≠ proxy ≠ inférence ; provenance interne/externe = autre axe.',keep:'Un modèle ne transforme pas un proxy en vérité terrain, et une donnée externe ajoute une dépendance.'},
    context:{title:'Une observation a un lieu et plusieurs temps',bridge:'Deux valeurs identiques peuvent être incomparables sans grandeur, objet, temps, provenance et qualité. Le besoin de couverture et de cadence dépend ensuite du phénomène et de la décision.',formal:'Une observation a une <strong>couverture / résolution spatiale</strong>, une <strong>fréquence / résolution temporelle</strong> et une <strong>fraîcheur</strong>. Distinguez le <strong>temps du phénomène</strong>, le temps de production du résultat et le temps d’arrivée.',carry:'Demandez toujours : <strong>où, quand, à quelle échelle, avec quel retard ?</strong>',summary:'Espace · temps du phénomène · fréquence · fraîcheur · représentativité.',keep:'Précision locale ≠ représentativité spatiale.'},
    quality:{title:'Qualité et composition des sources',bridge:'La même donnée a changé de statut quand l’usage a changé ; puis votre stratégie a dû combiner plusieurs sources sans pouvoir supprimer toutes leurs limites.',formal:'La qualité est multidimensionnelle : <strong>précision, fraîcheur, complétude, cohérence, représentativité, disponibilité</strong>. Une stratégie multisource attribue ensuite à chaque source un <strong>rôle</strong>, une <strong>limite</strong> et des <strong>dépendances</strong> explicites. Ajouter des sources ne crée pas automatiquement de la robustesse.',carry:'Identifiez d’abord <strong>la dimension de qualité critique pour la décision</strong>, puis demandez ce que chaque source apporte réellement et quelle faiblesse subsiste.',summary:'Qualité relative à l’usage · rôles · limites · dépendances · angle mort.',keep:'Plus de sources ≠ plus d’indépendance.'},
    revision:{title:'Observer est une stratégie sous hypothèses',bridge:'L’incident a rendu visible une hypothèse de votre v1 : disponibilité, exactitude, fraîcheur, cohérence ou indépendance.',formal:'Une stratégie combine des sources dont les limites doivent être <strong>explicites et complémentaires</strong>. Lorsqu’une hypothèse tombe, on révise le système ou sa règle d’exploitation.',carry:'Conservez la causalité : <strong>hypothèse cassée → information menacée → modification → faiblesse restante</strong>.',summary:'Hypothèses → limites → combinaison → révision.',keep:'La bonne v2 n’est pas parfaite ; elle sait ce qu’elle ne garantit toujours pas.'}
  };
  const conceptOrder=['need','chain','proxy','context','quality','revision'];
  const stopChallenges={need:['Disponible ≠ utile','Un fournisseur vous offre gratuitement 50 nouveaux capteurs. Rien ne prouve qu’ils produisent une information capable de changer une décision.'],chain:['Mesure parfaite, représentation insuffisante','Le niveau est mesuré au millimètre mais un affluent critique n’est pas observé. Le défaut n’est pas la précision du capteur.'],proxy:['Proxy séduisant','Un indicateur historiquement corrélé à un départ de feu cesse de l’être après un changement de pratiques forestières.'],context:['Même valeur, mauvaise échelle','Deux points donnent la même humidité. Cela ne démontre pas que 50 ha sont homogènes.'],quality:['Plus de sources, pas forcément plus d’indépendance','Trois applications réutilisent le même produit météo amont. La diversité d’interface ne crée pas de redondance.'],revision:['Une v2 crée aussi de nouvelles contraintes','Toute réponse ajoute souvent coût, délai, dépendance ou maintenance. Rendez le risque résiduel visible.']};
  const stepLabels=['Prioriser','Décider','Observer','Comparer','Interpréter','Contextualiser','Choisir','Tester l’usage','Composer','Réviser'];
  const entryScreens=[0,2,3,5,6,8,9,11,12,14];
  const screenToStep=[0,0,1,2,2,3,4,4,5,6,6,7,8,8,9,9];

  function load(){try{const raw=localStorage.getItem(STORAGE_KEY);if(raw)state={...clone(defaultState),...JSON.parse(raw)};state.frontier=Math.max(Number(state.frontier)||0,screenToStep[state.screen]||0)}catch(_){}}
  function save(){
    let persisted=true;
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch(_){persisted=false}
    try{syncMission()}catch(_){}
    const p=$('#saveState');
    if(p){p.textContent=persisted?'Dossier sauvegardé':'Progression active';p.classList.toggle('saved-flash',persisted);if(persisted)setTimeout(()=>p.classList.remove('saved-flash'),220)}
    // UI progression must never depend on browser storage being available.
    setTimeout(()=>{try{syncCompletionUI();renderWorkflowStatuses()}catch(_){}},0)
  }
  function toast(msg){const t=$('#toast');if(!t)return;t.textContent=msg;t.hidden=false;setTimeout(()=>t.hidden=true,2300)}
  function needLabel(id){if(!id)return '';if(id.startsWith('custom:'))return id.slice(7);return needDefs.find(x=>x[0]===id)?.[2]||id}
  function sourceName(id){return strategyDefs.find(x=>x[0]===id)?.[1]||id}
  function missionObservation(){
    const claims=state.strategyV1?.claims||state.strategyClaims||{};
    const v1=(state.strategyV1?.sources||state.strategy||[]).map(id=>({id,label:sourceName(id),role:labelFrom(roleOptions,claims[id]?.role),limit:labelFrom(limitOptions,claims[id]?.limit)}));
    const v2=(state.strategyV2||[]).map(id=>({id,label:sourceName(id)}));
    return {
      schemaVersion:3,episode:1,title:'Observer un environnement',
      status:state.completed?'completed':(state.frontier>0||state.teamName.trim()?'in-progress':'not-started'),updatedAt:new Date().toISOString(),
      priorities:state.ranks.filter(Boolean).map(id=>({id,label:needLabel(id),decisionLens:labelFrom(needImpactOptions,state.priorityImpacts[id])})),
      decisionRequirements:decisionDefs.map(d=>({id:d.id,decision:d.title,firstInformation:(state.decisions[d.id]||[]).map(x=>d.options.find(o=>o[0]===x)?.[1]||x)[0]||''})),
      observationChain:{design:state.floodChain.filter(Boolean).map(id=>floodChainDefs.find(x=>x[0]===id)?.[1]||id),operation:[...chainItems]},
      sourceComparison:profileTargets.map(id=>({id,label:sourceDefs.find(x=>x[0]===id)?.[2]||id,profile:[labelFrom(profileSpace,state.sourceProfiles[id]?.space),labelFrom(profileTime,state.sourceProfiles[id]?.time)].filter(Boolean).join(' · ')})),
      interpretation:{relations:classifyDefs.map(([id,ctx,produced,target])=>({id,context:ctx,produced,target,kind:labelFrom(classifyOptions,state.classify[id])})),forecastProvenance:state.classifyOrigin},
      context:{metadata:state.metadata.map(id=>labelFrom(metadataDefs,id)),timeMatch:clone(state.timeMatch)},
      observationChoices:obsDefs.map(([id,title,decision,plans])=>({id,title,decision,choice:plans.find(x=>x[0]===state.observationCases[id])?.[1]||''})),
      fitnessForUse:qualityUsageDefs.map(([id,_data,use,expected,label])=>({id,data:label,use,assessment:state.qualityUsage[id]||'',decisiveDimension:labelFrom(qualityOptions,state.qualityDossierReason[label]),reference:expected})),
      strategy:{
        v1:state.strategyV1?{frozenAt:state.strategyV1.at,sources:v1,blindSpot:labelFrom(blindSpotOptions,state.strategyV1.blindSpot)}:null,
        v2:state.strategyV2?{sources:v2,incident:incidentDefs.find(x=>x[0]===state.incident)?.[1]||'',revision:{hypothesis:labelFrom(revisionHypotheses,state.revisionCausal.hypothesis),operatingRule:labelFrom(revisionActions,state.revisionCausal.action),information:labelFrom(revisionInfoOptions,state.revisionCausal.information),weakness:labelFrom(revisionWeaknesses,state.revisionCausal.weakness)}}:null
      }
    };
  }
  function syncMission(){if(!MissionStore)return;MissionStore.update(d=>{d.team={...(d.team||{}),name:state.teamName||''};d.observation=missionObservation();d.progress=d.progress||{lastEpisodeTouched:0,lastEpisodeCompleted:0,episodes:{}};d.progress.episodes=d.progress.episodes||{};d.progress.episodes['1']={status:d.observation.status,frontier:state.frontier,completed:state.completed,updatedAt:d.observation.updatedAt};d.progress.lastEpisodeTouched=Math.max(Number(d.progress.lastEpisodeTouched)||0,1);if(state.completed)d.progress.lastEpisodeCompleted=Math.max(Number(d.progress.lastEpisodeCompleted)||0,1);return d})}

  function renderStepper(){const viewed=screenToStep[state.screen]||0;$('#stepper').innerHTML=stepLabels.map((l,i)=>`<button class="step-dot ${i<=state.frontier?'':'locked'} ${i<state.frontier?'done':''} ${i===viewed?'active':''}" ${i<=state.frontier?'':'disabled'} data-step="${entryScreens[i]}"><span>${i<state.frontier?'✓':i+1}</span><small>${l}</small></button>`).join('');$$('[data-step]').forEach(b=>b.onclick=()=>showScreen(+b.dataset.step))}
  function renderHistory(){const h=$('#historyNav');const frontierScreen=entryScreens[state.frontier]||0;const reviewing=state.screen<frontierScreen;if(state.screen===0&&state.frontier===0){h.hidden=true;return}h.hidden=false;h.innerHTML=`${state.screen>0?`<button class="btn ghost" data-hist="${state.screen-1}">← Précédent</button>`:'<span></span>'}<div class="history-status ${reviewing?'reviewing':''}"><strong>${reviewing?'Mode révision':'Mission actuelle'}</strong> <span>${reviewing?'Vous revisitez une étape déjà débloquée.':'Vous êtes au point le plus avancé.'}</span></div>${reviewing?`<button class="btn soft" data-hist="${frontierScreen}">Retour à la mission actuelle →</button>`:'<span></span>'}`;h.querySelectorAll('[data-hist]').forEach(b=>b.onclick=()=>showScreen(+b.dataset.hist))}
  function setWorkflowStatus(id,progress,complete=false){const h=$('#'+id);if(!h)return;const s=h.querySelector('[data-workflow-progress]')||h.querySelector('strong');if(s)s.textContent=progress;h.classList.toggle('complete',!!complete)}
  function setGuidedSubstep(id,unlocked){const h=$('#'+id);if(!h)return;h.classList.toggle('guided-locked',!unlocked);h.inert=!unlocked;h.setAttribute('aria-disabled',unlocked?'false':'true')}
  function renderWorkflowStatuses(){
    const decisionsDone=decisionDefs.filter(d=>(state.decisions[d.id]||[]).length>=1).length;
    const floodDone=state.floodChain.filter(Boolean).length;setWorkflowStatus('floodChainStatus',`${floodDone} / 5 niveaux`,floodDone===5);
    const profDone=profileTargets.filter(id=>state.sourceProfiles[id]?.space&&state.sourceProfiles[id]?.time).length;setWorkflowStatus('profileStatus',`${profDone} / 4 profils`,profDone===4);
    const coreMeta=['variable','where','when','source'];const metaDone=coreMeta.filter(x=>state.metadata.includes(x)).length;setWorkflowStatus('metadataStatus',`${metaDone} / 4 éléments manquants`,metaDone===4);
    const tm=Object.keys(state.timeMatch).length;setWorkflowStatus('timeStatus',`${tm} / 3 temps`,tm===3);
    const obsDone=obsDefs.filter(([id])=>!!state.observationCases[id]).length;setWorkflowStatus('observationStatus',`${obsDone} / 3 choix`,obsDone===3);
    const qualityGroups=[...new Set(qualityUsageDefs.map(x=>x[4]))];const quDone=qualityGroups.filter(data=>qualityUsageDefs.filter(x=>x[4]===data).every(([id])=>!!state.qualityUsage[id])&&!!state.qualityDossierReason[data]).length;setWorkflowStatus('qualityUsageStatus',`${quDone} / ${qualityGroups.length} dossiers`,quDone===qualityGroups.length);
    setWorkflowStatus('strategySourceStatus',state.strategy.length>=2?`${state.strategy.length} source(s) · sélection suffisante`:`${state.strategy.length} / 2 minimum`,state.strategy.length>=2&&state.strategy.length<=3);
    const claimsDone=state.strategy.filter(id=>state.strategyClaims[id]?.role&&state.strategyClaims[id]?.limit).length;setWorkflowStatus('strategyClaimsStatus',`${claimsDone} / ${state.strategy.length||2} source(s) qualifiée(s)`,state.strategy.length>=2&&claimsDone===state.strategy.length);setWorkflowStatus('blindSpotStatus',state.blindSpot?'1 / 1 angle mort ✓':'0 / 1 angle mort',!!state.blindSpot);
    setWorkflowStatus('incidentStatus',state.incident?'1 / 1 incident ✓':'0 / 1 incident',!!state.incident);
    const c=state.revisionCausal,diagDone=(state.revisionDecisionImpact?1:0)+['hypothesis','information'].filter(k=>!!c[k]).length;setWorkflowStatus('diagnosticStatus',`${diagDone} / 3 décisions de diagnostic`,diagDone===3);
    const delta=!!c.action;setWorkflowStatus('revisionStatusUI',delta?'1 / 1 réponse retenue':'0 / 1 réponse',delta);setWorkflowStatus('residualStatus',c.weakness?'1 / 1 limite ✓':'0 / 1 limite',!!c.weakness);
    const retDone=retrievalDefs.filter(r=>r.opts.some(([id])=>id===state.retrieval[r.id])).length;setWorkflowStatus('retrievalStatus',`${retDone} / ${retrievalDefs.length} réponses`,retDone===retrievalDefs.length);
    setGuidedSubstep('guidedA3Generalise',floodDone===5);
    const classDone=classifyDefs.filter(([id])=>!!state.classify[id]).length;setGuidedSubstep('guidedA5Origin',classDone===classifyDefs.length);
    setGuidedSubstep('guidedA6Time',metaDone===4);setGuidedSubstep('guidedA6Compare',tm===3);setGuidedSubstep('guidedA9Qualify',state.strategy.length>=2);setGuidedSubstep('guidedA9Blind',state.strategy.length>=2&&claimsDone===state.strategy.length);
    setGuidedSubstep('guidedA10Diagnose',!!state.incident);setGuidedSubstep('guidedA10Revision',!!state.incident&&diagDone===3);setGuidedSubstep('guidedA10Residual',!!state.incident&&diagDone===3&&delta);
  }
  function gate(screen,index){
    if(screen===0&&index===1){const ranked=state.ranks.filter(Boolean);if(state.needs.length<5||ranked.length<3||new Set(ranked).size<3||ranked.some(id=>!state.priorityImpacts[id]))return 'Retenez au moins 5 informations, fixez 3 priorités et associez chacune à un enjeu.'}
    if(screen===2&&index===3&&!decisionDefs.every(d=>(state.decisions[d.id]||[]).length>=1))return 'Choisissez l’information que vous demanderiez en premier pour chacune des quatre situations.';
    if(screen===3&&index===4){if(state.floodChain.filter(Boolean).length<5)return 'Complétez les cinq niveaux du cas de Banca.';}
    if(screen===5&&index===6){if(!profileTargets.every(id=>state.sourceProfiles[id]?.space&&state.sourceProfiles[id]?.time))return 'Qualifiez la couverture et le rythme des quatre sources avant de poursuivre.'}
    if(screen===6&&index===7&&(!classifyDefs.every(([id])=>state.classify[id])||!state.classifyOrigin))return 'Classez les six situations puis distinguez la provenance de la prévision météo.';
    if(screen===8&&index===9){const core=['variable','where','when','source'];if(!core.every(x=>state.metadata.includes(x))||Object.keys(state.timeMatch).length<3||state.comparisonReasons.length<2)return 'Reconstituez le contexte manquant, distinguez les trois temps et identifiez au moins deux différences qui fragilisent la comparaison A/B.'}
    if(screen===9&&index===10&&(!obsDefs.every(([id])=>state.observationCases[id])||!state.freshness))return 'Choisissez un plan d’observation pour les trois situations et terminez le mini-calcul de fraîcheur.';
    if(screen===11&&index===12){const groups=[...new Set(qualityUsageDefs.map(x=>x[4]))];if(!groups.every(data=>qualityUsageDefs.filter(x=>x[4]===data).every(([id])=>state.qualityUsage[id])&&state.qualityDossierReason[data]))return 'Terminez les trois dossiers : deux jugements puis une dimension expliquant le contraste dans chacun.';}
    if(screen===12&&index===13&&!state.strategyV1)return 'Figez une stratégie v1 complète avant de poursuivre.';
    if(screen===14&&index===15){const c=state.revisionCausal;if(!state.incident)return 'Choisissez un incident qui concerne votre stratégie v1.';if(!state.revisionDecisionImpact||!c.hypothesis||!c.information)return 'Dites d’abord si la décision reste défendable, puis identifiez l’hypothèse tombée et l’information menacée.';if(!c.action)return 'Choisissez une réponse minimale de fonctionnement pour votre v2.';if(!c.weakness)return 'Terminez en nommant ce que cette réponse ne résout toujours pas.';}
    return ''}
  function showScreen(index,{unlock=false}={}){const step=screenToStep[index]||0;if(step>state.frontier&&!unlock){toast('Cette étape n’est pas encore disponible.');return}if(unlock){const msg=gate(state.screen,index);if(msg){toast(msg);return}if(step>state.frontier)state.frontier=step}state.screen=index;$$('.activity-screen').forEach(s=>s.hidden=+s.dataset.screen!==index);renderAll();save();window.scrollTo({top:0,behavior:'smooth'})}

  function renderNeeds(){
    const h=$('#needLandscape'); if(!h)return;
    const groups={}; needDefs.forEach(d=>(groups[d[1]]??=[]).push(d));
    h.innerHTML=Object.entries(groups).map(([g,items])=>`
      <section class="need-family">
        <div class="need-family-head"><strong>${g}</strong> <span>${items.length} pistes</span></div>
        <div class="need-family-grid">
          ${items.map(([id,,title,sub])=>{
            const active=state.needs.includes(id);
            return `<button type="button" class="need-card ${active?'active':''}" data-need="${id}" aria-pressed="${active}">
              <span class="need-card-mark" aria-hidden="true">${active?'✓':'+'}</span>
              <span class="need-card-copy"><strong>${title}</strong> <span>${sub}</span></span>
              <span class="need-card-action">${active?'RETENU':'RETENIR'}</span>
            </button>`;
          }).join('')}
        </div>
      </section>`).join('');
    h.querySelectorAll('[data-need]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.need;
      if(state.needs.includes(id)){
        state.needs=state.needs.filter(x=>x!==id);
        state.ranks=state.ranks.map(x=>x===id?'':x);
        delete state.priorityImpacts[id];
      }else if(state.needs.length<7) state.needs.push(id);
      else return toast('Maximum 7 informations : retirez-en une avant d’en ajouter une autre.');
      save(); renderNeeds(); renderSnapshots(); renderDesign();
    });
    const progress=$('#needProgress');
    if(progress){
      const n=state.needs.length;
      progress.textContent=n<5?`${n} / 5 minimum`:n<=7?`${n} retenues · sélection suffisante`:`${n} retenues`;
      progress.classList.toggle('complete',n>=5&&n<=7);
    }
    const ch=$('#customNeedChips');
    if(ch){ch.innerHTML=state.customNeeds.map((x,i)=>`<span class="idea-chip">${esc(x)}<button data-custom-remove="${i}" type="button" aria-label="Retirer ${esc(x)}">×</button></span>`).join('')||'<span class="idea-empty">Aucune proposition ajoutée — ce n’est pas obligatoire.</span>';
    ch.querySelectorAll('[data-custom-remove]').forEach(b=>b.onclick=()=>{
      const label=state.customNeeds[+b.dataset.customRemove],id='custom:'+label;
      state.customNeeds.splice(+b.dataset.customRemove,1);
      state.needs=state.needs.filter(x=>x!==id);
      state.ranks=state.ranks.map(x=>x===id?'':x);
      delete state.priorityImpacts[id]; save(); renderNeeds(); renderSnapshots(); renderDesign();
    })}
    const inp=$('#customNeedInput'),add=$('#addCustomNeed');
    if(inp&&add){
      const push=()=>{
        const v=inp.value.trim(); if(!v)return;
        const id='custom:'+v;
        if(!state.customNeeds.includes(v)){
          state.customNeeds.push(v);
          if(state.needs.length<7)state.needs.push(id);
          else toast('Idée ajoutée au dossier, mais votre sélection est déjà limitée à 7.');
          save();
        }
        inp.value=''; renderNeeds(); renderSnapshots(); renderDesign();
      };
      add.onclick=push; inp.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();push()}};
    }
    renderPriorityBoard();
  }
  function renderPriorityBoard(){
    const h=$('#priorityBoard'); if(!h)return;
    const selectionReady=state.needs.length>=5;
    const completed=state.ranks.filter(Boolean).length;
    const impactDone=state.ranks.filter(Boolean).filter(id=>state.priorityImpacts[id]).length;
    const pp=$('#priorityProgress');
    if(pp){
      pp.textContent=!selectionReady?'sélectionnez d’abord 5 cartes':`${completed} / 3 priorités · ${impactDone} / 3 enjeux`;
      pp.classList.toggle('complete',completed===3&&impactDone===3);
    }
    if(!selectionReady){
      h.innerHTML=`<div class="interaction-locked"><span class="lock-symbol">2</span><div><strong>Commencez par ouvrir suffisamment le champ.</strong><p>Retenez au moins 5 informations ci-dessus, puis défendez-en seulement trois.</p></div></div>`;
      return;
    }
    h.innerHTML=`
      <div class="priority-source">
        <div class="priority-source-head"><span class="eyebrow">Vos ${state.needs.length} informations retenues</span><small>Cliquez pour les placer dans le Top 3</small></div>
        <div class="priority-candidates">
          ${state.needs.map(id=>`<button type="button" class="priority-candidate ${state.ranks.includes(id)?'ranked':''}" data-rank-add="${esc(id)}" ${state.ranks.includes(id)?'disabled':''}><span>${esc(needLabel(id))}</span><b>${state.ranks.includes(id)?'PLACÉ ✓':'PLACER →'}</b></button>`).join('')}
        </div>
      </div>
      <div class="priority-slots">
        ${[0,1,2].map(i=>{
          const id=state.ranks[i];
          return `<article class="priority-slot ${id?'filled':'empty'}">
            <span class="rank-number">${i+1}</span>
            <div class="priority-slot-main">
              <strong>${id?esc(needLabel(id)):'Priorité à choisir'}</strong>
              ${id?`<button type="button" class="text-button" data-rank-remove="${i}">retirer</button>`:'<span class="artifact-empty">Choisissez une carte ci-dessus.</span>'}
            </div>
            ${id?`<div class="impact-block"><span>Pourquoi est-ce prioritaire ?</span><div class="impact-choices">${needImpactOptions.map(([v,l])=>`<button type="button" data-impact-id="${esc(id)}" data-impact="${v}" class="${state.priorityImpacts[id]===v?'active':''}" aria-pressed="${state.priorityImpacts[id]===v}">${l}</button>`).join('')}</div></div>`:''}
          </article>`;
        }).join('')}
      </div>`;
    h.querySelectorAll('[data-rank-add]').forEach(b=>b.onclick=()=>{
      const slot=state.ranks.findIndex(x=>!x);
      if(slot<0)return toast('Votre Top 3 est déjà complet. Retirez une priorité pour la remplacer.');
      state.ranks[slot]=b.dataset.rankAdd; save(); renderPriorityBoard(); renderSnapshots(); renderDesign(); syncCompletionUI();
    });
    h.querySelectorAll('[data-rank-remove]').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.rankRemove,id=state.ranks[i]; state.ranks[i]=''; delete state.priorityImpacts[id]; save(); renderPriorityBoard(); renderSnapshots(); renderDesign(); syncCompletionUI();
    });
    h.querySelectorAll('[data-impact]').forEach(b=>b.onclick=()=>{
      state.priorityImpacts[b.dataset.impactId]=b.dataset.impact; save(); renderPriorityBoard(); renderSnapshots(); renderDesign(); syncCompletionUI();
    });
  }
  function renderDecisions(){
    const h=$('#decisionCases');if(!h)return;
    const done=decisionDefs.filter(d=>(state.decisions[d.id]||[]).length).length;
    let focus=state.decisionFocus||decisionDefs.find(d=>!(state.decisions[d.id]||[]).length)?.id||decisionDefs[0].id;
    if(!decisionDefs.some(d=>d.id===focus))focus=decisionDefs[0].id;
    const d=decisionDefs.find(x=>x.id===focus),selected=(state.decisions[d.id]||[])[0]||'';
    h.innerHTML=`<div class="decision-deck-tabs">${decisionDefs.map((x,i)=>`<button type="button" data-decision-tab="${x.id}" class="${x.id===focus?'active':''} ${(state.decisions[x.id]||[]).length?'done':''}"><span>${i+1}</span> <strong>${decisionTagLabels[x.id]}</strong> <small>${(state.decisions[x.id]||[]).length?'✓':'à faire'}</small></button>`).join('')}</div><article class="decision-focus-card"><div class="decision-focus-head"><span>${decisionTagLabels[d.id]}</span> <strong>${d.title}</strong> <small>${done} / 4 décisions traitées</small></div><div class="decision-focus-options">${d.options.map(([id,l])=>`<button type="button" data-decision="${d.id}" data-info="${id}" class="${selected===id?'active':''}"><span>${l}</span><b>${selected===id?'CHOIX RETENU ✓':'CHOISIR →'}</b></button>`).join('')}</div><div class="decision-rule">Laquelle demanderiez-vous en premier avant d’agir ? Les autres peuvent rester utiles comme contexte.</div></article>`;
    h.querySelectorAll('[data-decision-tab]').forEach(b=>b.onclick=()=>{state.decisionFocus=b.dataset.decisionTab;save();renderDecisions()});
    h.querySelectorAll('[data-decision]').forEach(b=>b.onclick=()=>{state.decisions[b.dataset.decision]=[b.dataset.info];const current=decisionDefs.findIndex(x=>x.id===b.dataset.decision),next=decisionDefs.find((x,i)=>i>current&&!(state.decisions[x.id]||[]).length)||decisionDefs.find(x=>!(state.decisions[x.id]||[]).length);state.decisionFocus=next?.id||b.dataset.decision;save();renderDecisions();renderSnapshots();renderWorkflowStatuses();syncCompletionUI()});
    renderDecisionChallenge();
  }
  function renderDecisionChallenge(){
    const h=$('#decisionChallenge');if(!h)return;const c=state.decisionChallenge;
    const d=decisionDefs.find(x=>x.id==='flood'),chosenInfo=(state.decisions.flood||[])[0]||'';
    if(c.decision!=='flood'||c.removed!==chosenInfo){c.decision='flood';c.removed=chosenInfo;c.assumption=''}
    if(!chosenInfo){h.innerHTML='<div class="inline-feedback warn">Commencez par trancher le cas CRUE. Cette situation repart de l’information que vous avez choisie.</div>';return}
    const chosenLabel=d.options.find(x=>x[0]===chosenInfo)?.[1]||chosenInfo;
    const picked=challengeActions.find(x=>x[0]===c.assumption);
    h.innerHTML=`<div class="challenge-loss"><span>INFORMATION RETIRÉE</span><strong>${chosenLabel}</strong></div><div class="challenge-question"><strong>Que faites-vous maintenant ?</strong><span>Un seul choix. Votre décision revient à accepter une hypothèse sur l’information qui manque.</span></div><div class="challenge-action-grid">${challengeActions.map(([id,l])=>`<button type="button" data-assumption="${id}" class="${c.assumption===id?'active':''}">${l}</button>`).join('')}</div>${picked?`<div class="inline-feedback ok"><b>Hypothèse acceptée</b> ${picked[2]}</div>`:''}`;
    h.querySelectorAll('[data-assumption]').forEach(b=>b.onclick=()=>{state.decisionChallenge={decision:'flood',removed:chosenInfo,assumption:b.dataset.assumption};save();renderDecisionChallenge()})
  }
  function renderSimpleChain(hostSel,defs,arr,max,cb,slotLabels=[]){
    const h=$(hostSel); if(!h)return;
    h.innerHTML=`
      <div class="chain-instruction"><span>CHOISISSEZ UNE PROPOSITION PAR EMPLACEMENT</span> <strong>${arr.length} / ${max} étapes placées</strong></div>
      <div class="case-chain-output labeled">${Array.from({length:max},(_,i)=>{const id=arr[i];return `<div class="chain-slot ${id?'filled':''}"><small>${slotLabels[i]||`ÉTAPE ${i+1}`}</small><span>${i+1}</span>${id?`<button type="button" class="placed" data-case-remove="${i}">${defs.find(x=>x[0]===id)?.[1]||id}<b>retirer ×</b></button>`:'<em>choisissez la proposition correspondante</em>'}</div>`}).join('<span class="chain-arrow">→</span>')}</div>
      <div class="case-chain-bank">${defs.map(([id,l])=>`<button type="button" class="case-chain-token ${arr.includes(id)?'used':''}" data-case-token="${id}" ${arr.includes(id)?'disabled':''}>${l}<b>${arr.includes(id)?'PLACÉ':'AJOUTER →'}</b></button>`).join('')}</div>`;
    h.querySelectorAll('[data-case-token]').forEach(b=>b.onclick=()=>{if(arr.length>=max)return toast(`Maximum ${max} éléments.`);cb([...arr,b.dataset.caseToken])});
    h.querySelectorAll('[data-case-remove]').forEach(b=>b.onclick=()=>{const x=[...arr];x.splice(+b.dataset.caseRemove,1);cb(x)});
  }
  function renderChain(){
    const h=$('#floodCaseChain');if(!h)return;
    const expected=['decision_close','info_risk','phen_hydro','obs_level','measure_station'];
    h.innerHTML=`<div class="flood-level-grid">${floodSlotLabels.map((slot,i)=>{const parts=slot.split('·').map(x=>x.trim()),picked=state.floodChain[i]||'';return `<label class="flood-level-row"><span><b>${i+1} · ${parts[0]}</b><small>${parts.slice(1).join(' · ')}</small></span><select data-flood-slot="${i}"><option value="">— choisir la proposition —</option>${floodChainDefs.map(([id,l])=>`<option value="${id}" ${picked===id?'selected':''} ${state.floodChain.some((x,j)=>j!==i&&x===id)?'disabled':''}>${l}</option>`).join('')}</select></label>`}).join('')}</div>`;
    h.querySelectorAll('[data-flood-slot]').forEach(sel=>sel.onchange=()=>{const i=+sel.dataset.floodSlot,next=[...(state.floodChain||[])];while(next.length<5)next.push('');next[i]=sel.value;state.floodChain=next;save();renderChain();renderSnapshots();renderWorkflowStatuses();syncCompletionUI()});
    if(state.floodChain.filter(Boolean).length===5){const ok=expected.every((id,i)=>state.floodChain[i]===id);h.insertAdjacentHTML('beforeend',`<div class="inline-feedback ${ok?'ok':'warn'}">${ok?'Chaîne cohérente : chaque niveau répond à une question différente, jusqu’à la valeur effectivement produite.':'Au moins un niveau contient encore un raccourci. Relisez la question de la ligne : décision, information, phénomène, observable et mesure ne sont pas interchangeables.'}</div>`);state.chain=[...chainItems]}
  }
  function renderSources(){
    const h=$('#sourceProfiles');if(!h)return;state.sourceProfiles=state.sourceProfiles||{};
    h.innerHTML=`<div class="source-profile-grid">${profileTargets.map(id=>{const d=sourceDefs.find(x=>x[0]===id),p=state.sourceProfiles[id]||{};return `<article class="source-profile-card"><div class="source-profile-head"><span>${d[1]}</span><strong>${d[2]}</strong><small>${sourceProfileContexts[id]}</small></div><div class="profile-axis"><b>1 · QUE COUVRE UNE OBSERVATION ?</b><div>${profileSpace.map(([v,l])=>`<button type="button" data-profile-source="${id}" data-profile-field="space" data-profile-value="${v}" class="${p.space===v?'active':''}">${l}</button>`).join('')}</div></div><div class="profile-axis"><b>2 · QUAND OBTIENT-ON UNE NOUVELLE OBSERVATION ?</b><div>${profileTime.map(([v,l])=>`<button type="button" data-profile-source="${id}" data-profile-field="time" data-profile-value="${v}" class="${p.time===v?'active':''}">${l}</button>`).join('')}</div></div>${p.space&&p.time?`<div class="profile-card-reading"><b>LECTURE</b><span>${sourceProfileWhy[id]}</span></div>`:''}</article>`}).join('')}</div>`;
    h.querySelectorAll('[data-profile-source]').forEach(b=>b.onclick=()=>{const id=b.dataset.profileSource;state.sourceProfiles[id]={...(state.sourceProfiles[id]||{}),[b.dataset.profileField]:b.dataset.profileValue};save();renderSources();renderWorkflowStatuses();syncCompletionUI()});
    const sum=$('#sourceProfileSummary');if(sum){const done=profileTargets.every(id=>state.sourceProfiles[id]?.space&&state.sourceProfiles[id]?.time);sum.innerHTML=done?`<div class="profile-summary-head"><b>LECTURE DE VOS PROFILS</b><span>Vous pouvez maintenant comparer les sources sans dire qu’une position est « meilleure ».</span></div><div class="profile-summary-grid">${profileTargets.map(id=>{const p=state.sourceProfiles[id],e=sourceProfileExpected[id],exact=p.space===e.space&&p.time===e.time;return `<div class="${exact?'coherent':'discuss'}"><strong>${sourceDefs.find(x=>x[0]===id)?.[2]||id}</strong><span>${labelFrom(profileSpace,p.space)} · ${labelFrom(profileTime,p.time)}</span><small>${exact?'Lecture cohérente avec la situation décrite.':'Pour cette situation, retenez plutôt '+labelFrom(profileSpace,e.space)+' · '+labelFrom(profileTime,e.time)+'.'}</small></div>`}).join('')}</div>`:''}
  }
  function renderForestPair(){return}
  function renderClassify(){
    const bank=$('#classifyGrid'),bins=$('#classifyBins');if(!bank||!bins)return;
    const selected=state.classifySelected||'';
    bank.innerHTML=classifyDefs.map(([id,ctx,produced,target])=>`<button type="button" class="sorting-card ${selected===id?'selected':''} ${state.classify[id]?'placed':''}" data-sort-card="${id}"><span class="eyebrow">${ctx}</span> <strong>${produced}</strong> <small><b>État recherché :</b> ${target}</small><span>${state.classify[id]?labelFrom(classifyOptions,state.classify[id]):'à ranger'}</span></button>`).join('');
    bank.querySelectorAll('[data-sort-card]').forEach(b=>b.onclick=()=>{state.classifySelected=b.dataset.sortCard;save();renderClassify()});
    bins.querySelectorAll('[data-classify-bin]').forEach(bin=>{const v=bin.dataset.classifyBin,host=bin.querySelector('.bin-items'),items=classifyDefs.filter(([id])=>state.classify[id]===v);host.innerHTML=items.map(([_id,ctx,produced])=>`<span><b>${ctx}</b> · ${produced}</span>`).join('')||'<em>déposez une carte ici</em>';bin.classList.toggle('ready',!!selected);bin.onclick=()=>{if(!state.classifySelected)return toast('Choisissez d’abord une situation à ranger.');state.classify[state.classifySelected]=v;state.classifySelected='';save();renderClassify();renderSnapshots();renderWorkflowStatuses();syncCompletionUI()}});
    const progress=$('#classifyProgress');if(progress)progress.textContent=`${classifyDefs.filter(([id])=>state.classify[id]).length} / ${classifyDefs.length} rangées`;
    const oc=$('#originChoice');if(oc){oc.querySelectorAll('[data-origin]').forEach(b=>{b.classList.toggle('active',state.classifyOrigin===b.dataset.origin);b.onclick=()=>{state.classifyOrigin=b.dataset.origin;save();renderClassify();renderWorkflowStatuses();syncCompletionUI()}});const f=$('#originFeedback');if(f){f.textContent=state.classifyOrigin?(state.classifyOrigin==='external'?'Oui. La prévision est une inférence, et sa provenance est externe : deux dimensions distinctes.':'Ici le service météo est extérieur à votre système : la provenance externe crée une dépendance supplémentaire.') : '';f.className='inline-feedback '+(state.classifyOrigin==='external'?'ok':state.classifyOrigin?'warn':'')}}
  }
  function renderMetadata(){const h=$('#metadataTokens');if(!h)return;const selectable=metadataDefs.filter(([id])=>!['unit','dashboard'].includes(id));h.innerHTML=selectable.map(([id,l])=>`<button class="token ${state.metadata.includes(id)?'active':''}" data-meta="${id}">${l}</button>`).join('');h.querySelectorAll('[data-meta]').forEach(b=>b.onclick=()=>{const id=b.dataset.meta;state.metadata=state.metadata.includes(id)?state.metadata.filter(x=>x!==id):[...state.metadata,id];save();renderMetadata();renderSnapshots()});const labels={variable:'température de l’air',where:'station RIV-03',when:'phénomène 14:02',source:'capteur T-17',quality:'±0,3 °C · capteur abrité'};$('#metadataResult').innerHTML=`<strong>Observation reconstituée</strong><span>32 °C</span><span>réception 14:30</span>${state.metadata.map(id=>`<span>${labels[id]}</span>`).join('')}`;renderTimeMatch();const c=$('#comparisonReasons');if(c){c.innerHTML=comparisonReasonDefs.map(([id,l])=>`<button class="token ${state.comparisonReasons.includes(id)?'active':''}" data-comp-reason="${id}">${l}</button>`).join('');c.querySelectorAll('[data-comp-reason]').forEach(b=>b.onclick=()=>{const id=b.dataset.compReason;state.comparisonReasons=state.comparisonReasons.includes(id)?state.comparisonReasons.filter(x=>x!==id):[...state.comparisonReasons,id];save();renderMetadata();renderSnapshots()})}renderTimeChallenge()}
  function renderTimeMatch(){const h=$('#timeMatch');if(!h)return;
    const questions=[
      ['phenomenon','Quand l’état physique du terrain a-t-il réellement été observé ?','C’est le temps du phénomène : celui à utiliser pour dater ce que la mesure décrit.'],
      ['result','Quand la passerelle a-t-elle fini de produire le résultat transmis ?','C’est le temps de production du résultat : il renseigne sur le traitement, pas directement sur l’âge du terrain.'],
      ['arrival','Quand l’information est-elle devenue disponible dans l’application ?','C’est le temps d’arrivée : utile pour le transport et la disponibilité, mais il peut masquer une observation déjà ancienne.']
    ];
    const chosenFor=label=>Object.entries(state.timeMatch).find(([,v])=>v===label)?.[0]||'';
    h.innerHTML=questions.map(([label,q,formal])=>{const picked=chosenFor(label);return `<article class="time-question-card"><span class="time-question-kicker">QUESTION OPÉRATIONNELLE</span><strong>${q}</strong><div class="time-answer-row">${timeRows.map(([time])=>`<button type="button" data-time-question="${label}" data-time-choice="${time}" class="${picked===time?'active':''}">${time}</button>`).join('')}</div>${picked?`<p class="time-formalisation"><b>${labelFrom(timeLabels,label)}</b><span>${formal}</span></p>`:''}</article>`}).join('');
    h.querySelectorAll('[data-time-question]').forEach(b=>b.onclick=()=>{const label=b.dataset.timeQuestion,time=b.dataset.timeChoice;Object.keys(state.timeMatch).forEach(t=>{if(state.timeMatch[t]===label)delete state.timeMatch[t]});if(state.timeMatch[time]&&state.timeMatch[time]!==label)delete state.timeMatch[time];state.timeMatch[time]=label;save();renderTimeMatch();renderSnapshots();renderWorkflowStatuses();syncCompletionUI()});
    if(Object.keys(state.timeMatch).length===3){const ok=timeRows.every(([time,label])=>state.timeMatch[time]===label);h.insertAdjacentHTML('beforeend',`<div class="inline-feedback ${ok?'ok':'warn'}">${ok?'<b>Lecture correcte.</b> À 14:30, l’application vient de recevoir la donnée, mais l’état physique qu’elle décrit date de 14:02 : il a déjà 28 minutes. « Reçu maintenant » ne veut donc pas dire « observé maintenant ».':'Une réponse mélange encore âge du terrain, production du résultat et réception. Repartez des trois événements concrets plutôt que des noms techniques.'}</div>`)}}
  function renderTimeChallenge(){const h=$('#timeChallenge');if(!h)return;h.innerHTML=`<p>A : phénomène 14:12, réception 14:50. B : phénomène 14:25, réception 14:30. À 14:50, quelle donnée décrit le monde physique le plus récemment ?</p><div class="compact-choice"><button data-time-challenge="A" class="${state.timeChallenge==='A'?'active':''}">A · reçue en dernier</button><button data-time-challenge="B" class="${state.timeChallenge==='B'?'active':''}">B · phénomène le plus récent</button></div>${state.timeChallenge?`<div class="inline-feedback ${state.timeChallenge==='B'?'ok':'warn'}">${state.timeChallenge==='B'?'Oui. Pour savoir quelle donnée décrit le terrain le plus récemment, comparez d’abord le temps du phénomène : 14:25 est plus récent que 14:12.':'Attention : la donnée arrivée en dernier n’est pas forcément celle qui décrit l’état physique le plus récent.'}</div>`:''}`;h.querySelectorAll('[data-time-challenge]').forEach(b=>b.onclick=()=>{state.timeChallenge=b.dataset.timeChallenge;save();renderTimeChallenge()})}
  function renderObservationCases(){
    const h=$('#observationCases');if(!h)return;
    h.innerHTML=obsDefs.map(([id,t,d,plans,expected,why])=>{const chosen=state.observationCases[id]||'',ok=chosen===expected;return `<article class="observation-scenario"><div class="scenario-copy"><span>${d}</span><strong>${t}</strong></div><div class="scenario-options">${plans.map(([pid,l])=>`<button type="button" data-observation-plan="${id}" data-value="${pid}" class="${chosen===pid?'active':''}">${l}</button>`).join('')}</div>${chosen?`<div class="plan-feedback ${ok?'ok':'warn'}"><b>${ok?'Plan cohérent':'Point à revoir'}</b><span>${why}</span></div>`:''}</article>`}).join('');
    h.querySelectorAll('[data-observation-plan]').forEach(b=>b.onclick=()=>{state.observationCases[b.dataset.observationPlan]=b.dataset.value;save();renderObservationCases();renderSnapshots();renderWorkflowStatuses();syncCompletionUI()});
    $$('[data-freshness]').forEach(b=>{b.classList.toggle('active',state.freshness===b.dataset.freshness);b.onclick=()=>{state.freshness=b.dataset.freshness;save();renderObservationCases();renderWorkflowStatuses();syncCompletionUI()}});
    const ff=$('#freshnessFeedback');if(ff){ff.textContent=state.freshness?(state.freshness==='60'?'Oui. Dans le pire cas, presque toute la période de 60 minutes s’est écoulée depuis la dernière acquisition.':'Regardez le pire instant : juste avant la mesure suivante, la précédente peut dater de presque toute la période d’échantillonnage.') : '';ff.className='inline-feedback '+(state.freshness==='60'?'ok':state.freshness?'warn':'')}
  }
  function renderRepresentativity(){const h=$('#representativityCheck');if(!h)return;h.innerHTML=representativityDefs.map(([id,t])=>`<button class="statement ${state.representativity.includes(id)?'active':''}" data-rep="${id}" ${state.representativityLocked?'disabled':''}>${t}</button>`).join('')+`<button id="lockRepresentativity" class="btn soft" ${state.representativityLocked?'disabled':''}>${state.representativityLocked?'Choix confirmé':'Confirmer ces affirmations'}</button>${state.representativityLocked?`<div class="inline-feedback ${['r1','r3','r4'].every(id=>state.representativity.includes(id))&&!state.representativity.includes('r2')?'ok':'warn'}">Une mesure peut être excellente localement sans représenter correctement toute la parcelle.</div>`:''}`;h.querySelectorAll('[data-rep]').forEach(b=>b.onclick=()=>{const id=b.dataset.rep;state.representativity=state.representativity.includes(id)?state.representativity.filter(x=>x!==id):[...state.representativity,id];save();renderRepresentativity()});$('#lockRepresentativity').onclick=()=>{if(!state.representativity.length)return toast('Choisissez au moins une affirmation avant de confirmer.');state.representativityLocked=true;save();renderRepresentativity();renderSnapshots()}}
  function renderQuality(){renderQualityUsage()}
  function renderQualityUsage(){
    const h=$('#qualityUsageGrid');if(!h)return;
    const groups=[];qualityUsageDefs.forEach(x=>{if(!groups.includes(x[4]))groups.push(x[4])});
    const dossierComplete=data=>qualityUsageDefs.filter(x=>x[4]===data).every(([id])=>!!state.qualityUsage[id])&&!!state.qualityDossierReason[data];
    let focus=Number.isInteger(state.qualityFocus)?state.qualityFocus:0;
    if(focus<0||focus>=groups.length)focus=0;
    const firstIncomplete=groups.findIndex(data=>!dossierComplete(data));
    if(!dossierComplete(groups[focus]) && firstIncomplete>=0 && focus>firstIncomplete)focus=firstIncomplete;
    state.qualityFocus=focus;
    const data=groups[focus],items=qualityUsageDefs.filter(x=>x[4]===data),reason=state.qualityDossierReason[data]||'',expectedReason=qualityScenarioDimension[data],candidates=qualityDimensionCandidates[data]||qualityOptions.map(x=>x[0]);
    const judgmentsDone=items.every(([id])=>!!state.qualityUsage[id]);
    const complete=judgmentsDone&&!!reason;
    const judgmentMatch=items.every(([id,_d,_u,expected])=>state.qualityUsage[id]===expected);
    const referenceOk=complete&&judgmentMatch&&reason===expectedReason;
    const tabs=`<div class="quality-dossier-tabs">${groups.map((g,i)=>`<button type="button" data-quality-tab="${i}" class="${i===focus?'active':''} ${dossierComplete(g)?'done':''}"><span>${i+1}</span><b>Dossier ${i+1}</b><small>${dossierComplete(g)?'terminé ✓':i===focus?'en cours':'à venir'}</small></button>`).join('')}</div>`;
    const uses=items.map(([id,_d,use,expected],i)=>{const v=state.qualityUsage[id]||'',ok=v===expected;return `<section class="usage-case ${v?'judged':''}"><span class="usage-decision-label">${qualityUsageActors[id]||`DÉCISION ${i+1}`}</span><strong>${use}</strong><div class="use-decision"><button type="button" data-use="${id}" data-value="acceptable" class="${v==='acceptable'?'active good':''}">Oui · suffisante ici</button><button type="button" data-use="${id}" data-value="fragile" class="${v==='fragile'?'active warn':''}">Non · insuffisante seule</button></div>${v?`<div class="use-reference ${ok?'ok':'discuss'}"><b>${ok?'✓ Lecture cohérente':'↺ À reconsidérer'}</b><span>${ok?'Ce jugement est cohérent avec l’horizon et l’objet de cette décision.':'Relisez l’horizon et l’objet de la décision : ici, l’autre jugement est plus défendable.'}</span></div>`:''}</section>`}).join('');
    h.innerHTML=`${tabs}<article class="usage-duel focused ${complete?'duel-complete':''}"><div class="usage-data"><span>DOSSIER ${focus+1} · DONNÉE INCHANGÉE</span><strong>${data}</strong><small>${qualityScenarioContext[data]}</small></div><div class="usage-sides">${uses}</div><div class="dossier-dimension ${judgmentsDone?'ready':'locked'}"><span>3 · EXPLIQUER LE CONTRASTE</span><strong>${judgmentsDone?'Quelle propriété explique le mieux pourquoi les deux décisions n’exigent pas la même chose ?':'Jugez d’abord les deux usages.'}</strong><div class="quality-dimension-grid">${candidates.map(qid=>`<button type="button" data-dossier-reason="${esc(data)}" data-value="${qid}" ${judgmentsDone?'':'disabled'} class="quality-dimension ${reason===qid?'active':''}">${labelFrom(qualityOptions,qid)}</button>`).join('')}</div></div>${complete?`<div class="duel-reference ${referenceOk?'ok':'discuss'}"><b>${referenceOk?'✓ LECTURE COHÉRENTE':'POINT À REVOIR'}</b><strong>${labelFrom(qualityOptions,expectedReason)}</strong><span>${qualityScenarioWhy[data]}</span>${!referenceOk?`<small>Une autre lecture peut se défendre si vous explicitez une hypothèse différente ; vérifiez surtout qu’elle reste compatible avec l’usage décrit.</small>`:''}</div>`:''}${complete&&focus<groups.length-1?`<button type="button" class="btn primary quality-next" data-quality-next="${focus+1}">Dossier suivant →</button>`:''}</article>`;
    h.querySelectorAll('[data-quality-tab]').forEach(b=>b.onclick=()=>{state.qualityFocus=+b.dataset.qualityTab;save();renderQualityUsage()});
    h.querySelectorAll('[data-use]').forEach(b=>b.onclick=()=>{state.qualityUsage[b.dataset.use]=b.dataset.value;save();renderQualityUsage();renderWorkflowStatuses();syncCompletionUI()});
    h.querySelectorAll('[data-dossier-reason]').forEach(b=>b.onclick=()=>{state.qualityDossierReason[b.dataset.dossierReason]=b.dataset.value;save();renderQualityUsage();renderWorkflowStatuses();syncCompletionUI()});
    h.querySelectorAll('[data-quality-next]').forEach(b=>b.onclick=()=>{state.qualityFocus=+b.dataset.qualityNext;save();renderQualityUsage();h.scrollIntoView({behavior:'smooth',block:'start'})});
  }

  function renderStrategy(){
    const h=$('#strategySources');if(!h)return;
    h.innerHTML=`<div class="strategy-source-groups">${strategyGroups.map(([_gid,label,help,ids])=>`<section class="strategy-source-group"><div class="strategy-source-group-head"><strong>${label}</strong> <span>${help}</span></div><div class="strategy-source-group-grid">${ids.map(id=>{const def=strategyDefs.find(x=>x[0]===id),t=def?.[1]||id,d=def?.[2]||'',active=state.strategy.includes(id);return `<button type="button" class="source-card strategy-source ${active?'active':''}" data-strategy="${id}" ${state.strategyV1?'disabled':''} aria-pressed="${active}"><strong>${t}</strong> <span>${d}</span><b class="source-card-action">${active?'RETENUE ✓':'AJOUTER À LA STRATÉGIE +'}</b></button>`}).join('')}</div></section>`).join('')}</div>`;
    h.querySelectorAll('[data-strategy]').forEach(b=>b.onclick=()=>{const id=b.dataset.strategy;if(state.strategy.includes(id)){state.strategy=state.strategy.filter(x=>x!==id);delete state.strategyClaims[id]}else if(state.strategy.length<3)state.strategy.push(id);else return toast('Maximum trois sources.');save();renderStrategy();renderSnapshots();renderDesign();renderWorkflowStatuses();syncCompletionUI()});
    const basket=$('#strategyBasket');basket.classList.toggle('strategy-frozen',!!state.strategyV1);basket.innerHTML=`<div class="eyebrow">Stratégie ${state.strategyV1?'v1 figée':'en construction'}</div><h3>${state.strategy.length}/3 sources</h3><div class="strategy-claim-grid">${state.strategy.map(id=>{const c=(state.strategyV1?.claims||state.strategyClaims)[id]||{};return `<article class="strategy-claim"><strong>${sourceName(id)}</strong><label>Rôle informationnel<select data-claim="${id}" data-field="role" ${state.strategyV1?'disabled':''}><option value="">— choisir —</option>${roleOptions.map(([v,l])=>`<option value="${v}" ${c.role===v?'selected':''}>${l}</option>`).join('')}</select></label><label>Limite assumée<select data-claim="${id}" data-field="limit" ${state.strategyV1?'disabled':''}><option value="">— choisir —</option>${limitOptions.map(([v,l])=>`<option value="${v}" ${c.limit===v?'selected':''}>${l}</option>`).join('')}</select></label></article>`}).join('')||'<span class="artifact-empty">Sélectionnez 2 ou 3 sources.</span>'}</div>`;basket.querySelectorAll('[data-claim]').forEach(x=>x.onchange=()=>{state.strategyClaims[x.dataset.claim]={...(state.strategyClaims[x.dataset.claim]||{}),[x.dataset.field]:x.value};save();renderSnapshots();renderDesign();renderWorkflowStatuses();syncCompletionUI()});const bs=$('#blindSpotChoices');bs.innerHTML=blindSpotOptions.map(([id,l])=>`<button type="button" class="token ${state.blindSpot===id?'active':''}" data-blind="${id}" ${state.strategyV1?'disabled':''}>${l}</button>`).join('');bs.querySelectorAll('[data-blind]').forEach(b=>b.onclick=()=>{state.blindSpot=b.dataset.blind;save();renderStrategy();renderSnapshots();renderWorkflowStatuses();syncCompletionUI()});const f=$('#freezeStrategy');f.textContent=state.strategyV1?'Stratégie v1 figée ✓':'Figer la stratégie v1';f.disabled=!!state.strategyV1;f.onclick=()=>freezeStrategy(true)}
  function freezeStrategy(show=true){if(state.strategyV1)return true;const ready=state.strategy.length>=2&&state.strategy.every(id=>state.strategyClaims[id]?.role&&state.strategyClaims[id]?.limit)&&state.blindSpot;if(!ready){if(show)toast('Choisissez 2–3 sources, affectez un rôle et une limite à chacune, puis un angle mort global.');return false}state.strategyV1={sources:[...state.strategy],claims:clone(state.strategyClaims),blindSpot:state.blindSpot,at:new Date().toISOString()};state.strategyV2=null;save();renderStrategy();renderSnapshots();renderDesign();if(show)toast('Stratégie v1 figée.');return true}
  function incidentIsRelevant(id,v1){
    if(id==='fail')return v1.some(x=>['river','rain','camera'].includes(x));
    if(id==='drift')return v1.some(x=>['river','rain'].includes(x));
    if(id==='delay')return v1.some(x=>['weather','hydroext','satellite'].includes(x));
    if(id==='conflict')return v1.length>=2;
    return true;
  }
  function renderIncident(){
    const h=$('#incidentGrid');if(!h)return;const v1=state.strategyV1?.sources||state.strategy||[];
    const reminder=$('#revisionV1Reminder');if(reminder){const claims=state.strategyV1?.claims||state.strategyClaims;reminder.innerHTML=`<div><span>VOTRE STRATÉGIE v1 SOUS TEST</span><strong>${v1.length?v1.map(sourceName).join(' · '):'Aucune v1 figée'}</strong></div><p>${v1.length?'Rappelez-vous ses dépendances : '+v1.map(id=>`${sourceName(id)} — ${labelFrom(limitOptions,claims[id]?.limit)||'limite non explicitée'}`).join(' · '):'Figez d’abord une stratégie v1 avant de tester un incident.'}</p>`}
    h.innerHTML=incidentDefs.map(([id,t,d])=>{const active=state.incident===id,relevant=incidentIsRelevant(id,v1);return `<button type="button" class="incident ${active?'active':''} ${relevant?'':'not-relevant'}" data-incident="${id}" ${relevant?'':'disabled'} aria-pressed="${active}"><strong>${t}</strong><span>${d}</span><b class="incident-action">${active?'INCIDENT RETENU ✓':relevant?'CONCERNE VOTRE V1 →':'NON PERTINENT POUR VOTRE V1'}</b></button>`}).join('');
    h.querySelectorAll('[data-incident]:not([disabled])').forEach(b=>b.onclick=()=>{state.incident=b.dataset.incident;state.strategyV2=null;state.revisionDecisionImpact='';state.revisionCausal={hypothesis:'',information:'',action:'',weakness:''};save();renderIncident();renderSnapshots();renderDesign();renderWorkflowStatuses();syncCompletionUI()});renderCausal();renderRevisionStudio();renderRetrieval()
  }
  function renderRevisionStudio(){
    const h=$('#revisionStudio');if(!h)return;const v1=state.strategyV1?.sources||state.strategy||[],allowed=revisionActionMap[state.incident]||revisionActions.map(x=>x[0]),action=state.revisionCausal.action||'';
    h.innerHTML=`<div class="revision-policy"><div class="revision-policy-v1"><span>v1 · CE QUI RESTE EN PLACE</span><strong>${v1.map(sourceName).join(' · ')||'Aucune stratégie figée'}</strong><small>Vous ne redessinez pas toute l’architecture : choisissez la règle minimale qui permet de gérer l’incident.</small></div><div class="revision-policy-actions">${revisionActions.filter(([id])=>allowed.includes(id)).map(([id,l])=>`<button type="button" data-v2-rule="${id}" class="${action===id?'active':''}"><b>${l}</b><span>${id==='crosscheck'?'Ne plus accepter une source seule pour cette décision.':id==='exclude'?'Ne plus utiliser la source suspecte tant qu’elle n’est pas validée.':id==='human'?'Faire confirmer l’état par une inspection ou un opérateur.':id==='degrade'?'Déclarer l’état incertain et appliquer une marge de sécurité.':id==='wait'?'Attendre une donnée suffisamment fraîche si le coût du délai reste acceptable.':id==='alternate'?'Mobiliser une autre voie d’observation pour retrouver l’information manquante.':'Rendre la règle de décision plus prudente tant que l’incertitude persiste.'}</span></button>`).join('')}</div>${action?`<div class="revision-delta has-delta"><b>v2 = v1 + NOUVELLE RÈGLE</b><span>${labelFrom(revisionActions,action)}</span></div>`:''}</div>`;
    h.querySelectorAll('[data-v2-rule]').forEach(b=>b.onclick=()=>{state.revisionCausal.action=b.dataset.v2Rule;state.strategyV2=[...v1];save();renderRevisionStudio();renderSnapshots();renderDesign();renderWorkflowStatuses();syncCompletionUI()})
  }
  function renderCausal(){
    const h=$('#revisionCausalBuilder'),impact=$('#revisionDecisionImpact'),r=$('#revisionResidualBuilder'),c=state.revisionCausal,map=incidentCausalMap[state.incident]||{};
    const filter=(defs,ids)=>ids?.length?defs.filter(([id])=>ids.includes(id)):defs;
    const block=(title,key,defs,help='')=>`<section><strong>${title}</strong>${help?`<small>${help}</small>`:''}<div class="choice-grid compact">${defs.map(([id,l])=>`<button type="button" data-causal="${key}" data-value="${id}" class="${c[key]===id?'active':''}">${l}</button>`).join('')}</div></section>`;
    if(impact){impact.innerHTML=`<div class="decision-impact-grid">${decisionImpactOptions.map(([id,l])=>`<button type="button" data-decision-impact="${id}" class="${state.revisionDecisionImpact===id?'active':''}">${l}</button>`).join('')}</div>`;impact.querySelectorAll('[data-decision-impact]').forEach(b=>b.onclick=()=>{state.revisionDecisionImpact=b.dataset.decisionImpact;save();renderCausal();renderWorkflowStatuses();syncCompletionUI()})}
    if(h){h.innerHTML=block('3a · Quelle hypothèse de votre v1 vient de tomber ?','hypothesis',filter(revisionHypotheses,map.hypothesis),'Choisissez l’hypothèse directement remise en cause par l’incident.')+block('3b · Quelle information ne pouvez-vous plus tenir pour acquise ?','information',filter(revisionInfoOptions,map.information),'Reliez la panne à l’information utile à la décision, pas seulement au composant technique.');h.querySelectorAll('[data-causal]').forEach(b=>b.onclick=()=>{state.revisionCausal[b.dataset.causal]=b.dataset.value;save();renderCausal();renderSnapshots();renderDesign();renderWorkflowStatuses();syncCompletionUI()})}
    const live=$('#revisionCausalLive');if(live){const inc=incidentDefs.find(x=>x[0]===state.incident)?.[1]||'incident';const parts=[[inc,!!state.incident],[labelFrom(decisionImpactOptions,state.revisionDecisionImpact),!!state.revisionDecisionImpact],[labelFrom(revisionHypotheses,c.hypothesis),!!c.hypothesis],[labelFrom(revisionInfoOptions,c.information),!!c.information]];live.innerHTML=state.incident?`<span>VOTRE CHAÎNE EN COURS</span><div>${parts.map(([l,on],i)=>`<b class="${on?'filled':''}">${on?esc(l):['incident','effet sur décision','hypothèse','information'][i]}</b>`).join('<em>→</em>')}</div>`:''}
    if(r){r.innerHTML=block('5 · Après cette réponse, qu’est-ce qui reste encore fragile ?','weakness',revisionWeaknesses,'Une bonne v2 déplace ou réduit le risque ; elle ne le fait pas disparaître.');r.querySelectorAll('[data-causal]').forEach(b=>b.onclick=()=>{state.revisionCausal.weakness=b.dataset.value;save();renderCausal();renderSnapshots();renderDesign();renderWorkflowStatuses();syncCompletionUI()})}
  }
  function renderRetrieval(){const h=$('#retrievalBoard');if(!h)return;h.innerHTML=retrievalDefs.map(r=>{const raw=state.retrieval[r.id],picked=r.opts.some(([id])=>id===raw)?raw:null,ok=picked===r.correct;return `<article class="retrieval-card"><strong>${r.q}</strong><div class="choice-grid compact">${r.opts.map(([id,l])=>`<button data-retrieval="${r.id}" data-value="${id}" class="${picked===id?'active':''}">${l}</button>`).join('')}</div>${picked?`<div class="retrieval-feedback ${ok?'ok':'retry'}"><b>${ok?'Bien vu':'À retenir'}</b> <span>${r.why}</span></div>`:''}</article>`}).join('');h.querySelectorAll('[data-retrieval]').forEach(b=>b.onclick=()=>{state.retrieval[b.dataset.retrieval]=b.dataset.value;save();renderRetrieval()})}
  function snapshotHtml(title,items){return `<h3>${title}</h3><div class="artifact-grid">${items.map(([k,v])=>`<div class="artifact-cell"><strong>${k}</strong> <span>${v||'<em class="artifact-empty">non renseigné</em>'}</span></div>`).join('')}</div>`}
  function renderSnapshots(){
    if($('#snapshotNeeds'))$('#snapshotNeeds').innerHTML=snapshotHtml('Votre Top 3',state.ranks.map((id,i)=>[`Priorité ${i+1}`,id?`${esc(needLabel(id))}<br><small>${esc(labelFrom(needImpactOptions,state.priorityImpacts[id]))}</small>`:'']));
    if($('#snapshotChain'))$('#snapshotChain').innerHTML=snapshotHtml('Deux sens de la chaîne',[['Conception · du besoin vers la mesure',state.floodChain.map(id=>esc(floodChainDefs.find(x=>x[0]===id)?.[1]||id)).join(' → ')],['Exploitation · du phénomène vers la décision',chainItems.map(esc).join(' → ')]]);
    if($('#snapshotSources'))$('#snapshotSources').innerHTML=snapshotHtml('Ce que vous avez distingué',[['Classification',classifyDefs.map(([id,ctx,produced])=>`${ctx} · ${produced} → ${labelFrom(classifyOptions,state.classify[id])}`).join('<br>')+`<br><strong>Prévision météo · provenance :</strong> ${state.classifyOrigin==='external'?'externe':state.classifyOrigin==='internal'?'interne':''}`]]);
    if($('#snapshotScale'))$('#snapshotScale').innerHTML=snapshotHtml('Contexte et choix d’observation',[['Dashboard','32 °C · reçu à 14:30'],['Contexte retenu',state.metadata.map(id=>labelFrom(metadataDefs,id)).join(' · ')],['Temps du phénomène',Object.entries(state.timeMatch).find(([,v])=>v==='phenomenon')?.[0]||''],...obsDefs.map(([id,t,_d,plans])=>[t,plans.find(x=>x[0]===state.observationCases[id])?.[1]||''])]);
    if($('#snapshotStrategy')){const claims=state.strategyV1?.claims||state.strategyClaims,s=state.strategyV1?.sources||state.strategy;$('#snapshotStrategy').innerHTML=snapshotHtml('Stratégie d’observation v1',[['Sources',s.map(sourceName).join(' · ')],['Rôles / limites',s.map(id=>`${sourceName(id)} → ${labelFrom(roleOptions,claims[id]?.role)} / ${labelFrom(limitOptions,claims[id]?.limit)}`).join('<br>')],['Angle mort',labelFrom(blindSpotOptions,state.strategyV1?.blindSpot||state.blindSpot)]])}
    if($('#snapshotRevision')){const inc=incidentDefs.find(x=>x[0]===state.incident),c=state.revisionCausal;$('#snapshotRevision').innerHTML=snapshotHtml('Évolution v1 → v2',[['Incident',inc?.[1]||''],['Décision sous incident',labelFrom(decisionImpactOptions,state.revisionDecisionImpact)],['Hypothèse cassée',labelFrom(revisionHypotheses,c.hypothesis)],['v1',(state.strategyV1?.sources||[]).map(sourceName).join(' · ')],['v2',(state.strategyV2||[]).map(sourceName).join(' · ')],['Règle v2',labelFrom(revisionActions,c.action)],['Information menacée',labelFrom(revisionInfoOptions,c.information)],['Faiblesse restante',labelFrom(revisionWeaknesses,c.weakness)]])}
  }
  function renderStopRitual(){$$('[data-stop-challenge]').forEach(h=>{const id=h.dataset.stopChallenge,d=stopChallenges[id];if(!d)return;const shown=!!state.stopChallenges[id];h.innerHTML=`<div class="ritual-card challenge"><span class="ritual-kicker">CONTRE-EXEMPLE</span> <strong>${d[0]}</strong>${shown?`<p>${d[1]}</p>`:`<p>Comparez d’abord vos choix, puis ouvrez ce cas limite.</p><button class="btn soft" data-reveal-challenge="${id}">Ouvrir le cas limite</button>`}</div>`});$$('[data-reveal-challenge]').forEach(b=>b.onclick=()=>{state.stopChallenges[b.dataset.revealChallenge]=true;save();renderStopRitual()});$$('[data-concept]').forEach(h=>{const id=h.dataset.concept,d=conceptDefs[id];if(!d)return;const on=!!state.conceptUnlocks[id];h.innerHTML=`<div class="ritual-card unlock"><span class="ritual-kicker">DANS VOTRE DOSSIER</span>${on?`<strong>${d.title}</strong><div class="unlock-sequence"><section><span>Ce que vos choix révèlent</span><p>${d.bridge}</p></section><section class="formalise"><span>Règle de travail</span><p>${d.formal}</p></section><section class="carry"><span>Pour la suite</span><p>${d.carry}</p></section></div>`:`<strong>Quelle règle voulez-vous garder dans votre dossier ?</strong><p>Mettez vos réponses en regard, puis ouvrez la formulation commune.</p><button class="btn primary" data-unlock="${id}">Ajouter la règle au dossier</button>`}</div>`});$$('[data-unlock]').forEach(b=>b.onclick=()=>{state.conceptUnlocks[b.dataset.unlock]=true;save();renderStopRitual();renderFieldGuide();updateUnlockButtons()});$$('[data-reality]').forEach(r=>r.hidden=!state.conceptUnlocks[r.dataset.reality]);updateUnlockButtons()}
  function updateUnlockButtons(){$$('[data-requires-unlock]').forEach(b=>{const locked=!state.conceptUnlocks[b.dataset.requiresUnlock];b.disabled=false;b.setAttribute('aria-disabled',locked?'true':'false');b.classList.toggle('requirement-locked',locked)})}
  function renderFieldGuide(){const count=conceptOrder.filter(id=>state.conceptUnlocks[id]).length;$('#fieldGuideBtn').hidden=count===0;$('#fieldGuideCount').textContent=`${count}/6`;$('#fieldGuideContent').innerHTML=`<div class="field-guide-progress"><strong>${count} / 6 règles dans votre guide</strong> <span>Les règles que vous avez déjà ajoutées au dossier.</span></div>`+conceptOrder.map((id,i)=>{const d=conceptDefs[id],on=!!state.conceptUnlocks[id];return `<section class="guide-entry ${on?'':'locked'}"><span class="guide-number">${i+1}</span><div>${on?`<strong>${d.title}</strong><p>${d.summary}</p><div class="guide-keep">${d.keep}</div>`:`<strong>Règle à découvrir</strong><p>Elle apparaîtra après la mise en commun concernée.</p>`}</div></section>`}).join('')}
  function renderDesign(){const claims=state.strategyV1?.claims||state.strategyClaims;$('#designContent').innerHTML=`<section class="design-section"><h3>Dossier de mission</h3><div class="drawer-list"><span><strong>Territoire :</strong> Vallée des Aldudes · Banca · Les Aldudes · Urepel</span></div></section><section class="design-section"><h3>1 · Priorités</h3><div class="drawer-list">${state.ranks.filter(Boolean).map((id,i)=>`<span>${i+1}. ${esc(needLabel(id))} — ${esc(labelFrom(needImpactOptions,state.priorityImpacts[id]))}</span>`).join('')||'<span>Pas encore priorisé.</span>'}</div></section><section class="design-section"><h3>2 · Chaîne d’observation</h3><div class="drawer-list"><span>${state.chain.map(esc).join(' → ')||'Pas encore construite.'}</span></div></section><section class="design-section"><h3>3 · Stratégie v1</h3><div class="drawer-list">${(state.strategyV1?.sources||state.strategy).map(id=>`<span>• ${sourceName(id)} — ${labelFrom(roleOptions,claims[id]?.role)} / ${labelFrom(limitOptions,claims[id]?.limit)}</span>`).join('')||'<span>Pas encore construite.</span>'}</div></section><section class="design-section"><h3>4 · Révision v2</h3><div class="drawer-list">${(state.strategyV2||[]).map(id=>`<span>• ${sourceName(id)}</span>`).join('')||'<span>Pas encore révisée.</span>'}${state.revisionCausal.action?`<span><strong>Règle v2 :</strong> ${labelFrom(revisionActions,state.revisionCausal.action)}</span>`:''}${state.revisionCausal.information?`<span><strong>Information menacée :</strong> ${labelFrom(revisionInfoOptions,state.revisionCausal.information)}</span>`:''}${state.revisionCausal.weakness?`<span><strong>Limite restante :</strong> ${labelFrom(revisionWeaknesses,state.revisionCausal.weakness)}</span>`:''}</div></section>`}
  function openDrawer(id,scrim){$(id).classList.add('open');$(id).setAttribute('aria-hidden','false');$(scrim).hidden=false}
  function closeDrawer(id,scrim){$(id).classList.remove('open');$(id).setAttribute('aria-hidden','true');$(scrim).hidden=true}
  function exportSession(){syncMission();const payload=MissionStore?MissionStore.makeBundle({'1':state}):{format:'environnements-connectes-session-export',exportedAt:new Date().toISOString(),sessions:{'1':state}};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='aldudes-dossier-mission.json';a.click();URL.revokeObjectURL(a.href)}

  function syncCompletionUI(){
    $$('.activity-screen').forEach(screen=>{if(screen.hidden)return;screen.querySelectorAll('.next-activity:not([data-requires-unlock])').forEach(btn=>{const next=Number(btn.dataset.next),msg=gate(Number(screen.dataset.screen),next);btn.disabled=false;btn.setAttribute('aria-disabled',msg?'true':'false');btn.classList.toggle('needs-completion',!!msg);let hint=btn.previousElementSibling;if(!hint||!hint.classList?.contains('completion-hint')){hint=document.createElement('div');hint.className='completion-hint';btn.before(hint)}hint.classList.toggle('complete',!msg);hint.innerHTML=msg?`<span>À compléter avant de continuer</span><strong>${esc(msg)}</strong>`:`<span>Étape terminée</span><strong>Vous pouvez passer à la suite.</strong>`})})
  }

  $$('.next-activity').forEach(b=>b.onclick=()=>{if(b.dataset.requiresUnlock&&!state.conceptUnlocks[b.dataset.requiresUnlock])return toast('Ajoutez d’abord au Guide de terrain la règle affichée pendant cette mise en commun.');showScreen(+b.dataset.next,{unlock:true})});
  $('#designBtn').onclick=()=>{renderDesign();openDrawer('#designDrawer','#designScrim')};$('#closeDesign').onclick=()=>closeDrawer('#designDrawer','#designScrim');$('#designScrim').onclick=()=>closeDrawer('#designDrawer','#designScrim');$('#fieldGuideBtn').onclick=()=>{renderFieldGuide();openDrawer('#fieldGuideDrawer','#fieldGuideScrim')};$('#closeFieldGuide').onclick=()=>closeDrawer('#fieldGuideDrawer','#fieldGuideScrim');$('#fieldGuideScrim').onclick=()=>closeDrawer('#fieldGuideDrawer','#fieldGuideScrim');
  $('#exportBtn').onclick=exportSession;$('#finishExport').onclick=exportSession;$('#importInput').onchange=e=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const p=JSON.parse(r.result);let d=null;if(p.format==='environnements-connectes-mission-bundle'&&MissionStore){const imported=MissionStore.importBundle(p);d=imported.sessions?.['1']||imported.sessions?.[1]||null}else d=p.data||p.sessions?.['1']||p.sessions?.[1]||p;if(!d||typeof d!=='object')throw new Error('État S1 absent');if(Number(d.version)!==9)throw new Error('Version S1 incompatible avec cette version');state={...clone(defaultState),...d};save();renderAll();showScreen(state.screen);toast('Dossier de mission importé.')}catch(err){console.warn(err);alert('Fichier de mission invalide ou incompatible avec cette version de S1.')}};r.readAsText(f)};
  $('#resetBtn').onclick=()=>{if(confirm('Effacer le travail de S1 et les décisions de mission qui en dépendent ?')){state=clone(defaultState);if(MissionStore)MissionStore.clearFromEpisode(1);save();renderAll();showScreen(0)}};
  $('#finishBtn').onclick=()=>{if(!state.conceptUnlocks.revision)return toast('Ajoutez d’abord la règle de révision à votre Guide de terrain.');if(!retrievalDefs.every(r=>r.opts.some(([id])=>id===state.retrieval[r.id])))return toast('Répondez aux cinq questions flash avant d’ouvrir la synthèse.');state.completed=true;save();$('#finalSynthesis').hidden=false;$('#finishBtn').hidden=true;renderStepper()};
  function renderAll(){const team=$('#teamName');if(team){team.value=state.teamName||'';team.oninput=e=>{state.teamName=e.target.value;save();renderDesign()}}renderStepper();renderHistory();renderNeeds();renderDecisions();renderChain();renderSources();renderForestPair();renderClassify();renderMetadata();renderObservationCases();renderQuality();renderStrategy();renderIncident();renderSnapshots();renderStopRitual();renderFieldGuide();renderDesign();renderWorkflowStatuses();syncCompletionUI();if(state.completed){$('#finalSynthesis').hidden=false;$('#finishBtn').hidden=true}else{$('#finalSynthesis').hidden=true;$('#finishBtn').hidden=false}}
  load();renderAll();showScreen(state.screen,{unlock:false});
})();
