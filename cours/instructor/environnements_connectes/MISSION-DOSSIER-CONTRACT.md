# Contrat de dossier de mission inter-séances

## Objectif

Chaque séance conserve son **état pédagogique interne** (écran courant, Unlocks, réponses intermédiaires, retrieval, etc.) dans une clé locale propre. En parallèle, elle publie uniquement ses **décisions structurantes** dans un dossier de mission commun.

- État S1 : `environnements-connectes-session1-v5`
- Dossier partagé : `environnements-connectes-mission-v1`

Les futures S2–S5 doivent **lire le dossier partagé**, et non dépendre de la structure interne de S1.

## Schéma stable v1

```text
mission
├── schemaVersion
├── missionId
├── territory
├── team
├── progress
├── observation       # publié par S1
├── collecte          # publié par S2
├── representation    # publié par S3
├── decision          # publié par S4
└── exploitation      # publié par S5
```

### `observation` (S1)

La version publiée par la refonte S1 actuelle porte `observation.schemaVersion = 3`. Les séances suivantes doivent lire les champs structurants ci-dessous, et non les détails de l’état pédagogique interne.


Contient notamment : priorités, information demandée en premier pour chaque décision, chaîne d’observation, comparaison espace × rythme de quelques sources, distinctions direct/proxy/inférence/externe, contexte temporel, choix d’observation sous contraintes, aptitude à l’usage et stratégies v1/v2 avec leurs limites. Pour la révision v2, le dossier partagé conserve les trois repères structurants `hypothesis`, `action`, `weakness`; l’information menacée est désormais un point de restitution oral plutôt qu’une interaction obligatoire.

Le schéma doit stocker des données **auto-descriptives** lorsque les séances suivantes doivent les afficher (par exemple `{id, label, role, limit}` pour une source), afin que S2 n'ait pas à importer les constantes JavaScript de S1.

## Règles d'architecture

1. Une séance peut modifier son propre état interne librement sans casser les autres séances.
2. Le dossier partagé ne contient que ce qui possède une valeur inter-séances.
3. Une séance future consomme le dossier commun et publie sa propre section.
4. Une remise à zéro d'un épisode invalide les sections qui en dépendent (`clearFromEpisode`).
5. L'export utilisateur est un **bundle de mission** : dossier partagé + états pédagogiques disponibles.
6. `schemaVersion` doit être incrémenté seulement en cas de rupture de compatibilité du dossier commun.

## Taille et stockage

Le dossier commun contient du texte et de petits objets JSON, jamais des images, vidéos ou fichiers binaires. Il doit rester très petit (typiquement quelques dizaines de kilo-octets au maximum). Les fichiers volumineux restent hors `localStorage`.

`localStorage` est une commodité locale, pas une sauvegarde durable : changement de navigateur, navigation privée ou suppression des données du site peuvent effacer l'état. L'export/import JSON constitue donc le mécanisme de portabilité et de sauvegarde manuelle.
