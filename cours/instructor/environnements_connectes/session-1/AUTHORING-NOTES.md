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


## Mise à jour v1.13 — alignement IoT v1.27

- A4 : le panorama de 8 familles est désormais replié par défaut ; la carte espace × rythme reste le geste principal.
- A10 : historique v1.13, désormais supersédé par la chaîne causale simplifiée de la v1.21.
- Projector : `COMPARER` reste une question ouverte non retournable ; `PRÉCISER / ÉPROUVER` deviennent les cartes à retourner, verso = ancrage pédagogique ; `Retour au réel` seulement s’il apporte un transfert.
- Correctifs CSS : wrapping défensif des libellés français et des traces de classe, `min-width:0` sur les composants de restitution.


## Restitution — règle v1.15
- **COMPARER** est une question ouverte projetée, jamais une carte à retourner : elle sert à mettre les artefacts en regard et à faire apparaître les divergences.
- **PRÉCISER / ÉPROUVER** peuvent être retournés après échange ; leur verso contient l’ancrage à conserver.
- Ne pas dupliquer le verso dans un panneau « À retenir ».
- Le **Retour au réel** n’est utilisé que s’il apporte un cas, une donnée, un ordre de grandeur ou un transfert supplémentaire.
- En fin de séance : 5 questions flash sans score, puis un résumé explicite des capacités acquises et une transition vers S2.


## Mise à jour v1.20 — clarté étudiant et niveau ingénieur

- **IoT nommé explicitement**, mais positionné comme sous-ensemble d’un environnement connecté : objets instrumentés et connectés d’un côté ; imagerie, services externes, traces métier et humains de l’autre.
- **A1 ≠ A2 rendu explicite** : A1 ouvre le champ depuis le territoire ; A2 inverse le raisonnement depuis une décision imposée vers l’information à demander en premier.
- **A2 test rapide** : l’information CRUE choisie est retirée ; le groupe décide agir / confirmer / différer et voit l’hypothèse implicite associée.
- **A3** : cinq niveaux nommés sur un cas BTP concret. La seconde partie n’est plus un exercice à refaire : elle montre la même chaîne dans le sens d’exploitation afin de comparer les deux directions.
- **A4** : après placement sur étendue × rythme, trois besoins concrets servent à utiliser la carte. Suppression du quiz méta sur « ce que la carte ne montre pas ».
- **A5** : revue fournisseur contextualisée ; trois relations sémantiques (direct / proxy / inférence) + provenance interne/externe comme axe séparé.
- **A6** : trois questions opérationnelles avant les noms des timestamps ; progression non bloquante sur la justesse.
- **A7** : Peio revient du terrain avec trois dynamiques incompatibles. A7 dimensionne un plan d’observation (cadence + granularité) et ne doit pas être confondue avec A4, qui décrit seulement les capacités espace × temps des familles de sources. Les ordres de grandeur Sentinel-2 / LiDAR HD servent à casser l’intuition « plus de données = meilleure observation ».
- **A8** : désaccord de mission explicite ; même donnée, décisions différentes. Les trois dossiers sont traités séquentiellement avec un retour de référence explicatif après chaque dossier.
- **A10** : v1 visible, incident pertinent, effet sur la décision, diagnostic filtré, une règle de fonctionnement minimale, risque résiduel. Pas de réédition complète des sources.
- Les **ordres de grandeur d’observation** sont donnés en S1 lorsqu’ils éclairent un raisonnement (Sentinel-2, LiDAR HD). Les **portées radio** sont réservées à S2 et seront toujours présentées comme ordres de grandeur dépendant du relief, du débit, de l’énergie et du déploiement — jamais comme distances garanties.
