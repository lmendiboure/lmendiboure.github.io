/*
  Environnements connectés — configuration de publication
  Modifier uniquement releasedThrough lorsqu'une nouvelle séance est publiée.

  Cadre narratif : territoire réel (vallée des Aldudes), mission et personnages fictifs.
*/
window.ENV_COURSE_CONFIG = {
  missionStorageKey: "environnements-connectes-mission-v1",
  release: { releasedThrough: 1 },
  course: {
    code: "Environnements connectés et données",
    title: "Mission Vallée des Aldudes",
    subtitle: "Un même dossier, cinq étapes : observer, connecter, représenter, décider puis éprouver le système dans la durée."
  },
  sessions: [
    {
      id: 1, number: "01", kicker: "OBSERVER", episode: "ÉPISODE 1", timecode: "LUNDI · 08:42",
      title: "On vous demande de voir.",
      question: "De quelles informations la vallée a-t-elle réellement besoin, et que peut-on observer ?",
      story: "Le dossier arrive sans liste de capteurs ni solution préconçue. Votre première responsabilité est de décider ce qui mérite d'être connu.",
      summary: "Partir des décisions, identifier observables et sources, qualifier une observation puis réviser la stratégie quand une hypothèse du terrain tombe.",
      objectives: ["besoin → observation", "sources & métadonnées", "qualité & représentativité"],
      storageKey: "environnements-connectes-session1-v3",
      progressKind: "activity-frontier",
      progressLabels: ["Besoin", "Décision", "Observable", "Sources", "Direct / proxy", "Contexte", "Espace & temps", "Qualité", "Stratégie", "Stress-test"]
    },
    {
      id: 2, number: "02", kicker: "CONNECTER", episode: "ÉPISODE 2", timecode: "MARDI · 07:56",
      title: "Faites arriver l'information.",
      question: "Comment récupérer des observations dispersées dans un territoire montagneux ?",
      story: "Votre stratégie d'observation est acceptée. Le responsable technique pose alors une question simple : comment ces données atteignent-elles réellement l'endroit où elles seront utiles ?",
      summary: "Construire une architecture de collecte, comparer les familles de connectivité, raisonner sur les volumes, l'intermittence et le placement local/edge/cloud.",
      objectives: ["chaîne de collecte", "contraintes de communication", "local · edge · cloud"]
    },
    {
      id: 3, number: "03", kicker: "REPRÉSENTER", episode: "ÉPISODE 3", timecode: "MERCREDI · 10:21",
      title: "Votre tableau de bord ment.",
      question: "Les données affichées décrivent-elles vraiment le même état du territoire ?",
      story: "Les flux arrivent. Pourtant l'écran mélange des mesures récentes, des observations plus anciennes, des modèles et des informations humaines comme s'ils décrivaient tous le même instant.",
      summary: "Combiner données temporelles, spatiales et hétérogènes, remettre provenance et contexte au centre, puis traiter les incohérences et l'incertitude.",
      objectives: ["temps & espace", "interopérabilité", "fusion & incertitude"]
    },
    {
      id: 4, number: "04", kicker: "DÉCIDER", episode: "ÉPISODE 4", timecode: "JEUDI · 14:08",
      title: "Le système recommande d'agir.",
      question: "Quand faut-il visualiser, alerter, prédire, optimiser — ou laisser un humain décider ?",
      story: "Pour la première fois, le système ne se contente plus de décrire : il recommande une action. Une recommandation plausible n'est pourtant pas encore une bonne décision.",
      summary: "Construire la boucle décision/action, comparer règles et modèles, raisonner sur les erreurs et faire émerger le rôle potentiel d'un jumeau numérique.",
      objectives: ["détection & prédiction", "human-in-the-loop", "jumeau numérique"]
    },
    {
      id: 5, number: "05", kicker: "ÉPROUVER", episode: "ÉPISODE 5", timecode: "SIX MOIS PLUS TARD",
      title: "Le prototype fonctionne. Maintenant, exploitez-le.",
      question: "Que reste-t-il de votre architecture quand arrivent pannes, factures, maintenance, sécurité et obsolescence ?",
      story: "La démonstration a convaincu. Puis viennent les batteries, les dérives de capteurs, les droits d'accès, les fournisseurs qui changent de service et l'obligation de tenir dans la durée.",
      summary: "Attaquer le système par ses pannes, sa maintenance, sa gouvernance, sa cybersécurité, son coût et son obsolescence, puis supprimer ce qui n'apporte pas assez de valeur.",
      objectives: ["résilience", "maintenance & sécurité", "coût & sobriété"]
    }
  ]
};
