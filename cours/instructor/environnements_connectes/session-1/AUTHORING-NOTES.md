# Environnements connectés et données — Séance 1

## Mission

**Épisode 1 — Lundi 08:42 : observer la vallée des Aldudes sans commencer par la technologie.**

Le territoire est réel (Banca, Les Aldudes, Urepel) ; la cellule d’étude, les personnages et les incidents sont scénarisés. La séance est une mission interactive de 1h30 utilisant le même pattern MACU que le cours IoT :

**Découvrir → Externaliser → Comparer → Éprouver → Formaliser → Transférer → Réviser → Récupérer**

## 10 activités canoniques

1. Que voudriez-vous savoir ?
2. Partir de la décision
3. Ce que l'on peut réellement observer
4. D'où viennent les données ?
5. Observer, indiquer ou inférer ?
6. Une valeur ne suffit pas
7. Où et quand observer ?
8. Une donnée est-elle « bonne » ?
9. Construire une stratégie d'observation
10. Incident : réviser une stratégie !

## Artefact persistant

Le **dossier d'observation** accumule les décisions de la séance. La stratégie d'observation est figée en **v1** avant le stress-test final ; les modifications sont ensuite enregistrées en **v2** au lieu d'écraser l'artefact initial.

## Navigation et sauvegarde

- progression douce : futur verrouillé, passé revisitable ;
- Guide de terrain débloqué après les restitutions ;
- stockage local : `environnements-connectes-session1-v7` ;
- dossier de mission inter-séances (`environnements-connectes-mission-v1`) ;
- export/import JSON du bundle de mission ;
- aucun backend requis.


## Projector — règle v1.27

Le Projector suit désormais le même modèle minimal que le cours IoT :

- écran TRAVAIL : question centrale + contexte court + 2–3 productions attendues ;
- écran DISCUSSION : une question de reprise ;
- face avant : 2–3 relances maximum ;
- face arrière : 2–3 compléments qui ajoutent quelque chose à la restitution étudiante ;
- aucune saisie de classe, aucun compteur, aucun tableau collectif obligatoire.

Les `guardrails`, réponses acceptables, misconceptions et indications de conduite restent dans `notes.html`. Ils ne doivent pas apparaître au tableau.

Le verso n’est pas une correction. Les étudiants possèdent déjà leur formalisation locale. Il sert à faire un **saut d’abstraction** : partir du cas traité pour stabiliser une propriété générale transférable à d’autres systèmes. Pour S1, les six sauts d’abstraction sont : **cadrage du besoin** ; **valeur informationnelle + observabilité** ; **chaîne d’hypothèses** ; **échantillonnage spatio-temporel** ; **qualité relative + indépendance** ; **dégradation maîtrisée**. Les ordres de grandeur et cas limites ne sont que des preuves ou illustrations de ces propriétés.

En fin de séance, conserver un écran de synthèse très court qui décontextualise explicitement la vallée : un environnement connecté est un **système d’observation** ; ce qui n’est pas observable reste inconnu ; toute observation est un échantillon ; toute information interprétée repose sur des hypothèses ; la robustesse dépend de l’indépendance des défaillances et d’un comportement dégradé défini. Poser ensuite le mot **IoT** sur la partie instrumentée/connectée du système, puis ouvrir S2.

