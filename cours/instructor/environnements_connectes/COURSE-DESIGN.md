# Conception du cours — Environnements connectés et données

## Positionnement

Public principal : étudiants de M2 BTP, sans prérequis fort en réseaux ou informatique.

Le cours ne cherche pas à convaincre que le BTP est déjà « massivement IoT ». Il traite de la manière dont un environnement physique peut être **observé, représenté et piloté à partir de données hétérogènes**, et des raisons pour lesquelles un système techniquement possible peut rester inutile, fragile ou non déployable.

### Question directrice

> Comment construire, à partir de données imparfaites, une représentation suffisamment utile d'un environnement réel pour prendre de meilleures décisions ?

## Ancrage narratif : Mission Vallée des Aldudes

Le fil rouge n'est plus une vallée fictive générique. Le cours est ancré dans la **vallée réelle des Aldudes**, au Pays Basque intérieur, composée de Banca, Les Aldudes et Urepel.

### Contrat d'authenticité


Le fichier [`LOCAL-FACT-CHECK.md`](LOCAL-FACT-CHECK.md) est le contrat de formulation locale. Toute nouvelle affirmation sur le territoire (couverture réseau, équipement existant, risque précis, infrastructure, statut d’un projet) doit y être sourcée ou rester explicitement scénarisée.

Trois niveaux doivent toujours rester distingués :

1. **Territoire réel et faits documentés** : communes, relief, Nive des Aldudes, Kintoa, activités et risques lorsque des sources fiables les documentent.
2. **Mission pédagogique fictive** : la « cellule d'étude » confiée aux étudiants n'est pas présentée comme un projet réel d'une collectivité.
3. **Personnages et incidents scénarisés** : Maialen, Peio, Inès et Samir sont fictifs ; les pannes, messages et horaires servent à provoquer un raisonnement.

La narration ne doit donc jamais produire de faux cas d'usage ou de faux résultats industriels.

## Pourquoi ce choix pédagogique

Le scénario est un **ancrage cognitif**, pas une couche décorative. Il sert à :

- donner un but concret à des étudiants dont le cœur de formation n'est pas l'IoT ;
- conserver un même territoire assez longtemps pour que les conséquences d'un choix réapparaissent ;
- préserver de vrais choix et compromis plutôt que guider vers une « bonne technologie » ;
- faire émerger les concepts à partir d'une situation avant de les nommer ;
- faciliter le transfert vers forêt, agriculture, ouvrage d'art, bâtiment ou réseau d'eau.

Ce choix est cohérent avec la littérature récente sur l'**authentic learning / authentic assessment**, qui associe les tâches proches de situations réelles à la mobilisation de compétences comme résolution de problème, pensée critique et collaboration. Une étude de 2024 sur les expériences jugées les plus engageantes par des étudiants de l'enseignement supérieur souligne également le rôle du **choix** en plus de la connexion au monde réel.

Références : voir `NARRATIVE-AND-EVIDENCE.md`.

## Les étudiants dans l'histoire

Les étudiants sont **la cellule d'étude**. Ils ne jouent pas un personnage imposé. Leur identité d'équipe peut être enregistrée dans le dossier, mais la valeur pédagogique vient surtout du fait que leurs décisions persistent.

Quatre interlocuteurs fictifs représentent des contraintes récurrentes :

- **Maialen — coordination territoriale** : valeur d'usage, priorités, décisions ;
- **Peio — exploitation terrain** : maintenabilité, accessibilité, réalité opérationnelle ;
- **Inès — ingénierie systèmes** : réseaux, volumes, énergie, placement ;
- **Samir — données & sécurité** : provenance, fraîcheur, droits, confiance.

Ils interviennent pour poser une contrainte ou challenger une décision, jamais pour donner la réponse.

## Chronologie des cinq épisodes

| Séance | Épisode narratif | Déclencheur | Question scientifique | Artefact |
|---|---|---|---|---|
| **S1** | **Lundi 08:42 — On vous demande de voir** | un dossier arrive sans solution imposée | Que faut-il savoir et que peut-on observer ? | stratégie d'observation v1→v2 |
| **S2** | **Mardi 07:56 — Faites arriver l'information** | Inès demande comment récupérer les observations dispersées | Comment collecter sous contraintes de terrain ? | architecture de collecte |
| **S3** | **Mercredi 10:21 — Votre tableau de bord ment** | l'écran combine des données qui ne décrivent pas le même état | Comment reconstruire un état cohérent ? | modèle d'état |
| **S4** | **Jeudi 14:08 — Le système recommande d'agir** | une recommandation apparaît pour la première fois | Comment passer d'une représentation à une décision ? | boucle décision/action |
| **S5** | **Six mois plus tard — Le prototype fonctionne** | arrivent maintenance, factures, sécurité et obsolescence | Que mérite réellement de rester connecté ? | architecture déployable |

## Continuité narrative attendue

Les incidents ne sont pas cinq artifices indépendants. Ils doivent attaquer progressivement la chaîne :

**observation → communication → représentation → décision → exploitation**.

Une décision prise dans une séance doit réapparaître plus tard lorsque cela sert l'apprentissage. Exemples :

- une fréquence choisie en S1 devient une contrainte de volume ou de latence en S2 ;
- une source déclarée « fraîche » en S1 réapparaît avec un retard de transport en S3 ;
- une représentation d'état de S3 devient le support d'une décision en S4 ;
- une redondance technique de S2 devient un coût de maintenance en S5.

## Compétences finales

1. Transformer un besoin opérationnel en besoin d'information puis en stratégie d'observation.
2. Concevoir une chaîne de collecte et de communication adaptée aux contraintes du terrain.
3. Construire une représentation cohérente à partir de données hétérogènes dans le temps et l'espace.
4. Distinguer visualisation, détection, prédiction, optimisation et automatisation dans une boucle de décision.
5. Évaluer de façon critique la résilience, la maintenance, la cybersécurité, la gouvernance, le coût et l'intérêt réel d'un environnement connecté.

## Artefact persistant sur les cinq séances

1. **S1 — Carte / stratégie d'observation**
2. **S2 — Architecture de collecte**
3. **S3 — Représentation de l'état**
4. **S4 — Boucle de décision**
5. **S5 — Architecture déployable et défendable**

Les décisions structurantes sont versionnées (`v1 → v2`) au lieu d'être silencieusement écrasées.

## Architecture des cinq séances

| Séance | Verbe | Question | Concepts majeurs |
|---|---|---|---|
| 1 | **OBSERVER** | Comment savoir ce qui se passe ? | décision, information, observable, mesure, sources, proxies, métadonnées, espace, temps, qualité |
| 2 | **CONNECTER** | Comment faire circuler l'information ? | chaînes, passerelles, contraintes, familles de connectivité, intermittence, volumes, local/edge/cloud |
| 3 | **REPRÉSENTER** | Comment reconstruire l'état du monde ? | types de données, provenance, sémantique, localisation, temps, granularité, fusion, incertitude |
| 4 | **DÉCIDER** | Que faire de cette représentation ? | seuils, détection, prédiction, optimisation, faux positifs/négatifs, human-in-the-loop, simulation, digital twin |
| 5 | **ÉPROUVER** | Le système survivra-t-il au terrain ? | résilience, dérive, maintenance, gouvernance, cybersécurité, lock-in, TCO, sobriété |

## Densité

Cible : **7 à 10 activités canoniques par séance de 1h30**, typiquement 9–10 lorsque la progression le justifie.

Une activité n'est pas ajoutée pour « faire participer ». Elle doit faire émerger ou formaliser au moins une notion, distinction conceptuelle, règle de conception, cadre de décision ou limite.

## Pattern pédagogique

Le cours reprend le pattern MACU du cours IoT :

**Découvrir → Externaliser → Comparer → Éprouver → Formaliser → Transférer → Réviser → Récupérer**

À un STOP :

**REGARDER → COMPARER → ÉPROUVER → FORMALISER**

La formalisation suit trois mouvements :

1. **À partir de vos constats**
2. **Formaliser**
3. **Règle pour la suite**

Le **Guide de terrain** contient ensuite une version plus courte destinée à la récupération et à la révision.

## Règles de narration

- Ne jamais utiliser la narration pour pré-enseigner le concept.
- Un message de personnage doit introduire une **contrainte**, une **question** ou une **conséquence**, pas une réponse.
- Ne pas surjouer : pas d'XP, badges, classement, catastrophe permanente ou dialogue infantilisant.
- Les horaires donnent une continuité mais ne prétendent pas documenter un événement réel.
- Chaque information locale factuelle utilisée comme argument doit être sourcée.
- Les éléments fictifs doivent rester identifiables comme tels.
- La séance doit rester compréhensible si l'étudiant ignore toute la narration : l'histoire soutient le raisonnement, elle ne remplace pas le contenu.

## Cas de transfert

Le cas des Aldudes apporte la cohérence. Les transferts changent les caractéristiques de surface :

- forêt / incendie ;
- agriculture / irrigation ;
- ouvrage d'art ;
- bâtiment ;
- réseau d'eau ;
- éventuellement chantier lorsque le cas est réellement pertinent.

Le but est de tester la généralisation du raisonnement, pas la mémorisation de la vallée.


## Contrat de persistance inter-séances

Les cinq épisodes partagent un dossier stable `environnements-connectes-mission-v1`. Chaque séance conserve séparément son état pédagogique interne, mais publie dans ce dossier les décisions structurantes nécessaires aux épisodes suivants. S2 doit donc consommer `mission.observation`, S3 `mission.observation` + `mission.collecte`, etc. Voir `MISSION-DOSSIER-CONTRACT.md`.


## Frontière éditoriale : interne vs étudiant

Les surfaces étudiantes doivent rester **dans le dossier de mission**. Elles ne doivent pas commenter les intentions de conception du cours. Éviter notamment les formulations du type « éviter un cas d’école artificiel », « montrer que le BTP est concerné », « objectif pédagogique », « personnage fictif » répété ou « artefact inter-séances ».

Ces éléments appartiennent aux notes enseignant et aux documents d’authoring. Côté étudiant, les mêmes informations doivent être reformulées comme **faits du dossier, contraintes, ordre de mission, interlocuteurs, incidents, décisions et traces du travail**.

L’honnêteté sur la fiction reste explicite mais discrète : une mention globale suffit pour indiquer que les lieux et données terrain sont sourcés tandis que les interlocuteurs et incidents de mission sont scénarisés.

---

## Contrat de micro-pédagogie — à conserver pour S2 à S5

La structure MACU et la narration ne suffisent pas : la forme de l'activité doit elle-même produire du raisonnement. Les conventions suivantes sont désormais considérées comme stables pour le cours.

### 1. Manipuler avant de rédiger

La rédaction libre est l'exception, pas le moteur principal d'une activité. Par défaut, faire travailler les étudiants sur un corpus suffisamment riche déjà présent dans la page :

- sélectionner parmi des possibilités crédibles ;
- classer ou catégoriser ;
- apparier des éléments ;
- ordonner une chaîne ;
- comparer plusieurs solutions ;
- prioriser sous contrainte ;
- construire une combinaison ;
- diagnostiquer une faiblesse ;
- réviser un choix après changement d'hypothèse.

Un champ libre n'est justifié que s'il apporte quelque chose qu'une interaction structurée ne permet pas : proposition hors corpus, justification courte, ou remarque personnelle facultative. Il ne doit jamais servir à demander aux étudiants de deviner le contenu que le cours pourrait leur fournir.

### 1 bis. Une interaction doit être évidente avant le premier clic

**Microcopy étudiant :** distinguer les libellés fonctionnels des phrases de mission. Les compteurs et verbes d’action peuvent rester courts (`SÉLECTIONNER`, `2 / 4`, `PLACÉ`). En revanche, les phrases `POINT DE DÉPART`, `IMPACT SUR LA MISSION`, feedbacks et transitions doivent être rédigées comme des phrases professionnelles naturelles. Éviter les états télégraphiques du type « votre Top 3 existe », « stratégie complète » ou « contexte incomplet » lorsqu’une formulation causale et lisible peut dire ce qui est acquis et ce qui reste à résoudre.


Une interaction structurée n’est utile que si son **affordance** est immédiatement lisible. La surface étudiant doit donc montrer, sans explication orale de l’enseignant :

- ce qui est manipulable ;
- l’action attendue (`RETENIR`, `PLACER`, `CLASSER`, `ASSOCIER`, etc.) ;
- l’état courant (`0/5`, `3/4`, sélection active, élément verrouillé) ;
- ce qui reste à faire avant de poursuivre ;
- un état sélectionné nettement distinct du simple survol ;
- un bouton de progression désactivé tant que l’artefact minimal n’est pas complet.

Éviter les cartes qui ressemblent à des fiches d’information mais sont secrètement cliquables. Éviter aussi les clics sans conséquence explicite : toute sélection doit alimenter un artefact, une comparaison, un profil ou une décision ultérieure. Le modèle de référence est celui du cours IoT : **action visible → feedback immédiat → progression visible → engagement avant restitution**.

### 2. Donner un corpus, puis demander un choix

Une activité dense commence souvent par un panorama partiel ou complet, puis impose une décision. Exemple de pattern :

> possibilités → sélection → priorité → justification/association → contrainte → révision

L'objectif n'est pas de tester si l'étudiant sait inventer cinq exemples, mais s'il sait distinguer ceux qui comptent, expliquer pourquoi et transférer la règle.

### 3. Une intervention de personnage doit faire avancer le dossier

Une intervention suit la grammaire :

**POINT DE DÉPART → NOUVELLE INFORMATION → IMPACT SUR LA MISSION → À VOUS**

- **Point de départ** rappelle seulement l'état déjà acquis, sans réexpliquer l'activité précédente.
- **Nouvelle information** contient le fait, la contrainte ou la demande qui change réellement la situation.
- **Impact sur la mission** indique la décision de conception désormais nécessaire, sans donner la solution.
- **À vous** bascule immédiatement vers la manipulation.

Ne pas convoquer un personnage lorsqu'aucune nouvelle information n'est nécessaire. Une voix récurrente n'est pas un décor : elle représente une exigence et doit avoir un effet sur le travail demandé.

### 4. Éviter la répétition entre activité, intervention et STOP

Une même information ne doit pas être répétée sous quatre formes successives. Chaque surface a un rôle distinct :

- **intervention** : ce qui vient de changer ;
- **activité** : ce qu'il faut faire avec cette information ;
- **restitution** : ce que les productions de la classe permettent de comparer ;
- **formalisation** : le concept général qui dépasse le cas ;
- **référence / step further** : panorama, variantes, faits, limites ou exemples que les étudiants n'avaient pas nécessairement devant eux.

### 5. Une restitution doit apporter plus que la correction

Les STOP importants doivent pouvoir enrichir le corpus. Selon le sujet, prévoir :

- un panorama de réponses possibles plus large que les cartes de l'activité ;
- des cas de transfert ;
- une distinction conceptuelle ou une taxonomie utile ;
- un ordre de grandeur ou un fait terrain vérifié ;
- un contre-exemple ;
- une règle de conception réutilisable.

La restitution n'est donc pas « voici la bonne réponse ». Elle transforme les choix locaux des groupes en connaissance générale.

### 6. Commit avant challenge

Ne pas sauver les étudiants avant que leur décision soit figée. Lorsque l'activité prépare un stress test :

**choix → commit → révélation → conséquence → révision**.

L'enseignant évite d'annoncer la future panne ou la future contrainte sous forme de conseil préventif. Une décision imparfaite mais explicite est pédagogiquement plus utile qu'une solution parfaite soufflée avant le challenge.

### 1 ter. Une activité complexe expose son workflow

Quand une activité comporte plusieurs opérations, l’étudiant ne doit pas les reconstruire à partir du texte. La page affiche des sous-étapes numérotées et un état de progression explicite, par exemple :

**1 · CLASSER → 2 · RELIER**

ou

**1 · DIAGNOSTIQUER → 2 · CHANGER L’USAGE → 3 · PRIORISER**, puis **Mode Défi facultatif · CONTRE-EXEMPLE**.

Chaque sous-étape doit montrer :

- l’action attendue ;
- la quantité ou la condition de complétion ;
- le feedback après manipulation ;
- l’état complet/verrouillé ;
- la relation avec l’artefact final de l’activité.

Le même workflow est résumé dans les Notes enseignant sous **Parcours étudiant à l’écran**. Ce contrat est à conserver pour S2–S5.


## Progression guidée intra-activité

Pour les activités comportant plusieurs manipulations, ne pas afficher quatre formulaires actifs simultanément. La prochaine sous-étape peut rester visible comme destination, mais elle reste verrouillée jusqu'à ce que l'artefact précédent soit suffisamment construit. Le contrat visuel est : **action courante → compteur/feedback → sous-étape suivante verrouillée → déblocage → engagement suivant**.

Une interaction est retenue seulement si elle change l'artefact, une hypothèse, une classification ou une décision. Les clics purement décoratifs sont interdits.


## Variation du rythme interactif

Le cours ne doit pas appliquer mécaniquement le même mini-workflow à chaque activité. S1 fixe désormais le rythme de référence : certaines activités sont un seul classement ou filtre, quelques-unes combinent deux gestes, et seules les activités de synthèse (stratégie / révision) deviennent plus riches. La profondeur vient des choix et des restitutions, pas du nombre de widgets.

**Règle :** une activité ne gagne une sous-étape que si celle-ci produit un nouvel artefact ou une distinction indispensable. Les transferts peuvent être apportés au STOP plutôt que répétés sous forme d’un second widget.

## Parité d'interaction avec le cours IoT — règle renforcée après S1 v1.12

La variété ne se mesure pas au nombre de boutons. Deux activités qui présentent chacune une grille de cartes, un compteur et un verrouillage sont perçues comme la même interaction même si leur contenu conceptuel diffère.

S1 fixe désormais une grammaire de gestes volontairement variée :

- A1 : sélectionner puis prioriser ;
- A2 : choisir une information en premier ;
- A3 : ordonner une chaîne ;
- A4 : placer des sources sur une carte à deux axes ;
- A5 : ranger des cartes dans des bacs ;
- A6 : enrichir une valeur puis ordonner ses temps ;
- A7 : choisir un dispositif sous contraintes ;
- A8 : comparer la même donnée dans deux usages ;
- A9 : composer un artefact de stratégie ;
- A10 : réviser une version après incident.

**Règle pour S2–S5 :** ne pas répéter plus de deux fois de suite le même geste cognitif ou la même géométrie d'interface. Une activité simple peut n'avoir ni compteur visible ni verrouillage si son état est évident. Les mécanismes de progression guidée sont réservés aux artefacts réellement cumulatifs.

### Continuité sans personnage

Quand aucune nouvelle information ne justifie l'intervention d'un personnage, ne pas laisser pour autant l'activité apparaître comme un chapitre abstrait. Utiliser un repère court :

**CE QUE VOUS AVEZ ÉTABLI → CE QU'IL RESTE À RÉSOUDRE**

Ce repère doit tenir en deux phrases et relier directement l'artefact précédent à la nouvelle question. Il remplace une intervention artificielle, sans introduire de méta-discours pédagogique côté étudiant.


## Alignement v1.27 IoT — simplicité et restitution

À conserver pour S2–S5 :

- une référence secondaire doit être **repliée par défaut** si elle n'est pas nécessaire pour réaliser le geste principal ;
- supprimer une saisie écrite dès qu'un choix structuré + une défense orale produisent le même apprentissage ;
- pour une activité riche, afficher un **parcours en trois mouvements maximum** sans ajouter de nouveaux clics ;
- côté Projector, une restitution suit **COMPARER (discussion ouverte, non retournable) → PRÉCISER / ÉPROUVER (cartes retournables avec l’ancrage à garder) → Retour au réel si utile** ;
- le verso d'une carte de discussion n'est pas « la bonne réponse » mais le repère conceptuel à conserver après l'échange ;
- les traces de classe et libellés français doivent toujours accepter `min-width:0` et le retour à la ligne ; aucune carte ne doit élargir la colonne de restitution.


## Contrat Projector v1.31 — ancrage par cartes

Pour les restitutions de S1 à S5 :

- afficher d’abord l’artefact ou la représentation de classe sur toute la largeur utile ;
- placer ensuite les cartes de discussion en pleine largeur ;
- le recto contient la question ; le verso contient l’ancrage local à conserver ;
- ne pas dupliquer ces ancrages dans un panneau séparé « À retenir » ;
- réserver « Retour au réel » à un exemple, une donnée, un ordre de grandeur ou un transfert qui apporte réellement quelque chose de plus ;
- sur l’écran WORK du Projector, une intervention ne montre que la nouvelle information utile, puis « À vous ». Le détail point de départ / impact appartient à l’écran étudiant et aux notes Instructor.

Pour les activités étudiantes riches, préférer quelques groupes visuels larges et des libellés courts à une grille dense de petites cartes. La profondeur doit venir du choix et de la défense, non du volume de micro-contrôles.
