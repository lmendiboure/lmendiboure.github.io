/*
  Environnements connectés — configuration de publication
  Modifier uniquement releasedThrough lorsqu'une nouvelle séance est publiée.
*/
window.ENV_COURSE_CONFIG = {
  release: { releasedThrough: 1 },
  course: {
    code: "Environnements connectés et données",
    title: "Observer, représenter et piloter le monde réel.",
    subtitle: "Cinq missions guidées partent d'un environnement physique, construisent sa représentation numérique puis éprouvent les décisions qui en découlent."
  },
  sessions: [
    {
      id: 1, number: "01", kicker: "OBSERVER",
      title: "Comment savoir ce qui se passe ?",
      question: "De quelles informations avons-nous besoin, et que pouvons-nous réellement observer ?",
      summary: "Partir des décisions, identifier les observables et les sources, qualifier la qualité d'une observation puis réviser une stratégie lorsque la vision du réel devient incertaine.",
      objectives: ["besoin → observation", "sources & métadonnées", "qualité & représentativité"],
      storageKey: "environnements-connectes-session1-v1",
      progressKind: "activity-frontier",
      progressLabels: ["Besoin", "Décision", "Observable", "Sources", "Direct / proxy", "Contexte", "Espace & temps", "Qualité", "Stratégie", "Stress-test"]
    },
    {
      id: 2, number: "02", kicker: "CONNECTER",
      title: "Comment faire circuler l'information ?",
      question: "Comment les observations arrivent-elles là où elles seront utiles ?",
      summary: "Construire une architecture de collecte, comparer les grandes familles de connectivité, raisonner sur les volumes et décider ce qui doit rester local ou partir vers le cloud.",
      objectives: ["chaîne de collecte", "contraintes de communication", "local · edge · cloud"]
    },
    {
      id: 3, number: "03", kicker: "REPRÉSENTER",
      title: "Comment reconstruire l'état du monde ?",
      question: "Comment plusieurs observations partielles deviennent-elles une représentation cohérente ?",
      summary: "Combiner données temporelles, spatiales et hétérogènes, remettre le contexte au centre et traiter les incohérences entre sources.",
      objectives: ["temps & espace", "interopérabilité", "fusion & incertitude"]
    },
    {
      id: 4, number: "04", kicker: "DÉCIDER",
      title: "Que faire de cette représentation ?",
      question: "Quand faut-il visualiser, alerter, prédire, optimiser ou agir ?",
      summary: "Construire la boucle de décision, comparer règles simples et modèles, raisonner sur les erreurs et faire émerger le rôle potentiel d'un jumeau numérique.",
      objectives: ["détection & prédiction", "human-in-the-loop", "jumeau numérique"]
    },
    {
      id: 5, number: "05", kicker: "ÉPROUVER",
      title: "Le système survivra-t-il au terrain ?",
      question: "Une architecture séduisante reste-t-elle pertinente sur dix ou quinze ans ?",
      summary: "Attaquer le système par ses pannes, sa maintenance, sa sécurité, sa gouvernance, ses coûts et son obsolescence puis supprimer ce qui n'apporte pas assez de valeur.",
      objectives: ["résilience", "maintenance & sécurité", "coût & sobriété"]
    }
  ]
};
