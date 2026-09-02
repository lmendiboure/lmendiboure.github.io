# Briefs narratifs des cinq épisodes — Mission Vallée des Aldudes

Ce document complète `COURSE-DESIGN.md`. Il fixe les **battements narratifs** qui doivent rester présents lors de l'implémentation des séances futures, sans remplacer les contenus scientifiques ni le template MACU.

## Règle générale

Chaque épisode doit suivre cette logique :

1. **Réouvrir le dossier** : une décision antérieure revient.
2. **Nouvelle contrainte** : l'histoire crée le besoin du contenu de la séance.
3. **Choix étudiants** : plusieurs solutions restent défendables.
4. **Engagement avant révélation** : pas de réponse dans le dialogue.
5. **Retour au réel** : un fait documenté replace le raisonnement dans le territoire ou dans une pratique réelle.
6. **Stress-test** : l'hypothèse dominante de la séance tombe.
7. **Trace persistante** : v1/v2 ou décision versionnée.
8. **Teaser minimal** : la prochaine difficulté est annoncée sans pré-enseigner sa solution.

---

# Épisode 1 — Lundi 08:42 — On vous demande de voir

**État : implémenté.**

### Déclencheur

Maialen transmet un dossier territorial sans architecture prescrite.

> « Ne commencez pas par ce qui est facile à mesurer. Dites-moi ce qu'il faudrait réellement savoir pour décider. »

### Arc des 10 activités

1. prioriser les informations ;
2. repartir des décisions ;
3. décision → phénomène → observable → mesure ;
4. sources hétérogènes ;
5. direct / proxy / inférence ;
6. contexte et temps de l'observation ;
7. espace, fréquence, fraîcheur ;
8. qualité relative à l'usage ;
9. stratégie multisource v1 ;
10. incident → v2.

### Trace qui doit revenir plus tard

- sources retenues ;
- fréquence / couverture supposées ;
- angle mort ;
- règle de révision.

### Sortie narrative

> **Mardi · 07:56.** Inès rouvre le dossier : « Très bien. Maintenant faites arriver ces observations jusqu'à nous. »

---

# Épisode 2 — Mardi 07:56 — Faites arriver l'information

### Déclencheur

La stratégie d'observation de S1 est acceptée. Inès superpose les sources choisies au territoire.

> « Vos données sont produites à des endroits différents, à des rythmes différents et parfois loin d'une infrastructure évidente. Comment arrivent-elles réellement là où elles seront utiles ? »

**Ne pas annoncer les technologies de connectivité ici.**

### Arc recommandé — 10 activités

1. **Reprendre les sources de S1** — tracer physiquement le chemin d'une donnée jusqu'à un utilisateur.
2. **Direct ou relais ?** — faire émerger équipement, passerelle, réseau, application.
3. **Tous les flux ne se ressemblent pas** — caractériser portée, volume, latence, énergie, mobilité, criticité.
4. **Connecté ≠ connecté en permanence** — stockage local, synchronisation différée, store-and-forward.
5. **Découvrir les familles de connectivité** — filaire, proximité, Wi-Fi, LPWAN, cellulaire, satellite, à un niveau fonctionnel.
6. **Choisir sous contraintes de terrain** — scénario : certains points n'ont pas une connectivité fiable ; contrainte explicitement fictive, non présentée comme cartographie réelle de couverture.
7. **Combien de données ?** — mini-calculs capteurs vs image/vidéo ; débit et volume deviennent concrets.
8. **Où traiter ?** — device / gateway / edge / cloud ; latence, coût de transfert, confidentialité, autonomie.
9. **Architecture de collecte v1** — technologie choisie par flux, pas « une techno pour toute la vallée ».
10. **Incident : le lien disparaît** — mode dégradé, autonomie locale, v1→v2.

### Interlocuteurs

- **Inès** domine l'épisode : contraintes système.
- **Peio** intervient sur alimentation, accès physique et maintenance.
- **Samir** intervient seulement lorsque le placement ou le transfert modifie la confidentialité / surface d'attaque.

### Retours au réel possibles

- Le tiers-lieu Olha à Banca est annoncé par la Communauté Pays Basque avec un accès internet très haut débit : utile pour montrer qu'un **site équipé** ne décrit pas à lui seul la connectivité d'un territoire.
- Aucune affirmation sur une « zone blanche » précise ne doit être faite sans source de couverture datée.

### Trace persistante

Pour chaque flux : source → données → fréquence/volume → chemin → traitement → dépendance → comportement hors connexion.

### Stress-test

> **11:16 · incident scénarisé.** Une dépendance réseau de votre architecture n'est plus disponible pendant plusieurs heures.

### Sortie narrative

> **Mercredi · 10:21.** Les données arrivent enfin. Le tableau de bord affiche « État actuel ». Samir demande : « Actuel… de quand ? »

---

# Épisode 3 — Mercredi 10:21 — Votre tableau de bord ment

### Déclencheur

Le système affiche simultanément :

- mesure terrain récente ;
- information arrivée en retard ;
- image plus ancienne ;
- prévision ;
- signalement humain.

L'interface les présente pourtant comme **un seul état courant**.

> Samir : « Cet état du territoire a-t-il réellement existé ? »

### Arc recommandé — 10 activités

1. **Observation ≠ état** — distinguer un point de donnée d'une représentation du système.
2. **Reconnaître les formes de données** — séries temporelles, événements, images, géodonnées, données statiques.
3. **Provenance et contexte** — source, unité, qualité, méthode, version.
4. **Parlent-elles de la même chose ?** — sémantique et interopérabilité.
5. **Parlent-elles du même endroit ?** — coordonnées, zone, objet d'intérêt, référentiel spatial.
6. **Parlent-elles du même moment ?** — phenomenon time, result/arrival time, fréquence, retard.
7. **Même granularité ?** — agrégation, résolution, changement d'échelle.
8. **Sources en désaccord** — redondance, confiance, incertitude, validation croisée.
9. **Construire un état v1** — expliciter ce qui est observé, estimé, prédit ou inconnu.
10. **Incident : l'état affiché n'a jamais existé** — incohérence temporelle → état v2.

### Interlocuteurs

- **Samir** : provenance, temps, cohérence.
- **Maialen** : « puis-je décider à partir de cet état ? »
- **Inès** : retard réseau ≠ temps du phénomène.

### Retour au réel

HydroPortail permet d'examiner de vraies séries de la Nive des Aldudes et leurs métadonnées. Utiliser la source pour ancrer les temporalités, pas pour transformer la séance en étude hydrologique.

### Trace persistante

Chaque variable de l'état doit porter : valeur, localisation/objet, temps du phénomène, source, niveau de confiance/qualité, statut `observé / estimé / prédit / inconnu`.

### Stress-test

> **12:03 · contrôle de cohérence.** Trois informations affichées à 10:21 décrivent en réalité trois instants différents.

### Sortie narrative

> **Jeudi · 14:08.** Le système affiche pour la première fois : **ACTION RECOMMANDÉE**.

---

# Épisode 4 — Jeudi 14:08 — Le système recommande d'agir

### Déclencheur

Le tableau de bord ne se contente plus de représenter : une alerte ou recommandation apparaît.

> Maialen : « Une prédiction n'est pas une décision. Qui assume l'action ? »

### Arc recommandé — 10 activités

1. **Que peut-on faire avec les données ?** — archiver, visualiser, alerter, détecter, prédire, optimiser, agir.
2. **Une règle suffit-elle ?** — seuil/règle vs détection statistique/modèle ; pas d'IA par défaut.
3. **Une alerte peut être fausse** — faux positifs, faux négatifs et conséquences asymétriques.
4. **Prédire ≠ décider** — objectif, coût, contraintes, incertitude.
5. **Qui décide ?** — human-in/on/out-of-the-loop.
6. **Où décider ?** — local vs distant ; criticité, latence, disponibilité.
7. **Tester avant d'agir** — simulation, scénarios, what-if.
8. **Quand devient-on un jumeau numérique ?** — le terme n'arrive qu'après que ses briques ont été construites.
9. **Boucle complète** — observer → représenter → analyser → décider → agir → observer.
10. **Incident : bonne donnée, mauvaise décision** — modifier seuil, règle de délégation ou boucle humaine.

### Interlocuteurs

- **Maialen** : finalité, responsabilité, valeur.
- **Peio** : conséquences physiques d'une action.
- **Samir** : décision basée sur une donnée incertaine.
- **Inès** : placement de la décision et dépendance réseau.

### Règle narrative majeure

Ne jamais présenter le Digital Twin comme le « boss final » technologique. L'effet recherché est :

> « Nous avons déjà construit plusieurs propriétés associées à un jumeau numérique ; voyons maintenant précisément quand ce terme est légitime. »

### Trace persistante

Pour chaque décision : entrée(s), règle/modèle, horizon, seuil de confiance, acteur responsable, emplacement du calcul, action, retour d'observation.

### Stress-test

> **15:26 · incident scénarisé.** Le système recommande une action que l'exploitant juge disproportionnée. La donnée est plausible : c'est la décision qu'il faut auditer.

### Sortie narrative

> **Six mois plus tard.** Le prototype fonctionne. Peio dépose les premières interventions de maintenance et Samir une demande d'audit des accès.

---

# Épisode 5 — Six mois plus tard — Le prototype fonctionne. Maintenant, exploitez-le

### Déclencheur

La réussite du prototype déplace le problème : on ne juge plus une démo, on juge un système qui doit vivre longtemps.

> Peio : « La démo était jeudi. Maintenant quelqu'un doit remplacer les batteries, recalibrer les capteurs et expliquer pourquoi ce service coûte encore de l'argent dans dix ans. »

### Arc recommandé — 10 activités

1. **Attaquer son propre système** — dépendances, single points of failure, hypothèses cachées.
2. **Et si la donnée était fausse ?** — panne, dérive, falsification, détection.
3. **Et si une partie disparaissait ?** — redondance, résilience, modes dégradés.
4. **Qui maintient ?** — alimentation, batterie, calibration, inspection, accessibilité, cycle de vie.
5. **Qui possède et conserve les données ?** — gouvernance, durée, finalité, responsabilités.
6. **Qui peut commander quoi ?** — identité, authentification, autorisation, sécurité des actions.
7. **Le fournisseur disparaît** — interopérabilité, export, lock-in, obsolescence.
8. **Combien coûte réellement le système ?** — CAPEX, OPEX, communication, cloud, interventions, remplacement.
9. **Supprimer 30 %** — sobriété et valeur marginale ; retirer ce qui ne contribue pas à une décision essentielle.
10. **Revue finale** — défendre l'architecture finale devant les quatre interlocuteurs.

### Interlocuteurs

Tous reviennent, chacun avec sa question :

- Maialen : **quelle valeur reste ?**
- Peio : **qui entretient ?**
- Inès : **quelle dépendance technique ?**
- Samir : **qui peut faire confiance / accéder / agir ?**

### Stress-tests séquencés

Les événements peuvent être révélés comme un journal d'exploitation, sans surdramatisation :

- **09:10** — dérive d'une mesure ;
- **09:28** — indisponibilité d'un service tiers ;
- **10:04** — demande d'accès à une donnée ;
- **10:42** — coût d'intervention terrain ;
- **11:17** — exigence de fonctionnement sur dix ans supplémentaires.

### Dernière mission

> Vous n'avez plus à rendre la vallée « plus connectée ». Vous devez décider **ce qui mérite réellement de rester connecté**, et défendre ce que vous avez supprimé autant que ce que vous avez conservé.

### Sortie du cours

Artefact final : architecture déployable, dépendances visibles, coûts/limites assumés, décisions soutenues et composants supprimés explicitement justifiés.

---

## Convention d'écriture des épisodes futurs

Chaque activité de S2 à S5 doit être relue avec quatre questions avant publication :

1. **L'étudiant manipule-t-il une matière riche, ou lui demande-t-on surtout de remplir du texte ?**
2. **Si un personnage intervient, apporte-t-il une information réellement nouvelle ?**
3. **La restitution ajoute-t-elle un référentiel ou une connaissance au-delà des réponses visibles dans l'activité ?**
4. **Une information importante est-elle répétée inutilement entre brief, intervention, consigne, STOP et Guide de terrain ?**

Cible : privilégier sélection, appariement, classement, comparaison, priorisation, construction et révision. La rédaction libre reste ponctuelle et justifiée.
