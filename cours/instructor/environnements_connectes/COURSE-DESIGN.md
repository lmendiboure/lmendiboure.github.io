# Conception du cours — Environnements connectés et données

## Positionnement

Public principal : étudiants de M2 BTP, sans prérequis fort en réseaux ou informatique.

Le cours ne cherche pas à convaincre que le BTP est déjà « massivement IoT ». Il traite de la manière dont un environnement physique peut être **observé, représenté et piloté à partir de données hétérogènes**, et des raisons pour lesquelles un système techniquement possible peut rester inutile, fragile ou non déployable.

### Question directrice

> Comment construire, à partir de données imparfaites, une représentation suffisamment utile d'un environnement réel pour prendre de meilleures décisions ?

## Ancrage narratif : Mission Vallée des Aldudes

Le fil rouge n'est plus une vallée fictive générique. Le cours est ancré dans la **vallée réelle des Aldudes**, au Pays Basque intérieur, composée de Banca, Les Aldudes et Urepel.

### Contrat d'authenticité

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
