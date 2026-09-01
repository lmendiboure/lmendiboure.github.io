# Conception du cours — Environnements connectés et données

## Positionnement

Public principal : étudiants de M2 BTP, sans prérequis fort en réseaux ou informatique.

Le cours ne cherche pas à convaincre que le BTP est déjà « massivement IoT ». Il traite plus largement de la manière dont un environnement physique peut être observé, représenté et piloté à partir de données issues de sources hétérogènes.

### Question directrice

> Comment construire, à partir de données imparfaites, une représentation suffisamment utile d'un environnement réel pour prendre de meilleures décisions ?

## Compétences finales

1. Transformer un besoin opérationnel en besoin d'information puis en stratégie d'observation.
2. Concevoir une chaîne de collecte et de communication adaptée aux contraintes du terrain.
3. Construire une représentation cohérente à partir de données hétérogènes dans le temps et l'espace.
4. Distinguer visualisation, détection, prédiction, optimisation et automatisation dans une boucle de décision.
5. Évaluer de façon critique la résilience, la maintenance, la cybersécurité, la gouvernance, le coût et l'intérêt réel d'un environnement connecté.

## Mission persistante

### Vallée des Aulnes

Territoire fictif réaliste comprenant :

- rivière et zones exposées aux crues ;
- pont et route d'accès ;
- versant forestier ;
- parcelles agricoles ;
- bâtiments techniques ;
- couverture et infrastructures imparfaites qui seront révélées progressivement.

Le cas n'est volontairement pas présenté comme un « smart territory » préexistant. Les étudiants construisent progressivement ce qui mérite d'être observé et connecté.

## Artefact persistant sur les cinq séances

1. **S1 — Carte / stratégie d'observation**
2. **S2 — Architecture de collecte**
3. **S3 — Représentation de l'état**
4. **S4 — Boucle de décision**
5. **S5 — Architecture déployable et défendable**

Les décisions structurantes sont versionnées (`v1 → v2`) au lieu d'être silencieusement écrasées.

## Architecture des cinq séances

| Séance | Verbe | Question | Artefact principal | Concepts majeurs |
|---|---|---|---|---|
| 1 | **OBSERVER** | Comment savoir ce qui se passe ? | Stratégie d'observation v1→v2 | décision, information, observable, mesure, sources, proxies, métadonnées, espace, temps, qualité |
| 2 | **CONNECTER** | Comment faire circuler l'information ? | Architecture de collecte | chaînes, passerelles, contraintes, familles de connectivité, intermittence, volumes, local/edge/cloud |
| 3 | **REPRÉSENTER** | Comment reconstruire l'état du monde ? | Modèle d'état | types de données, provenance, sémantique, localisation, temps, granularité, fusion, incertitude |
| 4 | **DÉCIDER** | Que faire de cette représentation ? | Boucle décision/action | seuils, détection, prédiction, optimisation, faux positifs/négatifs, human-in-the-loop, simulation, digital twin |
| 5 | **ÉPROUVER** | Le système survivra-t-il au terrain ? | Architecture déployable | résilience, dérive, maintenance, gouvernance, cybersécurité, lock-in, TCO, sobriété |

## Densité

Cible : **7 à 10 activités canoniques par séance de 1h30**, typiquement 9–10 lorsque la progression le justifie.

Une activité n'est pas ajoutée pour « faire participer ». Elle doit faire émerger ou formaliser au moins un élément :

- notion ;
- distinction conceptuelle ;
- cadre de décision ;
- classification ;
- règle de conception ;
- limite ou contre-exemple.

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

## Surfaces

Chaque séance doit maintenir la même liste canonique sur :

1. Espace étudiant ;
2. Mode projection ;
3. Notes enseignant.

Chaque activité possède exactement un écran Projection **TRAVAIL**, et zéro ou un écran **RESTITUTION**.

## Gamification

Pas de points, classement ou badges par défaut. La structure ludique vient de :

- mission persistante ;
- information partielle ;
- engagement avant révélation ;
- progression verrouillée vers l'avant ;
- incidents ;
- artefacts conservés ;
- versions v1/v2 ;
- Mode Défi optionnel ;
- Guide de terrain révélé progressivement.

## Cas de transfert

Le cas de vallée apporte la cohérence. Les transferts doivent changer les caractéristiques de surface :

- forêt / incendie ;
- agriculture / irrigation ;
- ouvrage d'art ;
- bâtiment ;
- réseau d'eau ;
- éventuellement chantier lorsque le cas est réellement pertinent.

Le but est de tester la généralisation du raisonnement, pas la mémorisation de la vallée.
