# Sources techniques — Séance 1

Ces sources servent aux **retours au réel** et à la précision des notes enseignant. Elles ne remplacent pas les activités de découverte.

## A3 — Hydrométrie : observable, mesure et prévision

### HydroPortail / Vigicrues — station hydrométrique

Source officielle :
https://www.hydro.eaufrance.fr/aide/la-station-hydrometrique

Une station hydrométrique permet d’observer une grandeur hydrométrique, typiquement une hauteur d’eau et/ou un débit. Le cours l’utilise pour montrer que le **risque de crue** n’est pas directement une mesure : il est construit à partir d’observations et d’autres informations.

### Vigicrues — services d’observation et de prévision

Source officielle :
https://www.vigicrues.gouv.fr/services/v1.1

La documentation distingue les observations et les prévisions en hauteur ou en débit. Elle sert de support enseignant pour éviter d’assimiler mesure, état et prévision.

## A6 — Observation et métadonnées

### OGC SensorThings API Part 1: Sensing 1.1

Source officielle :
https://docs.ogc.org/is/18-088/18-088.html

Le modèle distingue notamment `Observation`, `ObservedProperty`, `Sensor`, `FeatureOfInterest`, `phenomenonTime`, `resultTime` et `resultQuality`.

**Prudence pédagogique :** la séance n’enseigne pas le standard OGC. Elle fait d’abord construire le besoin de contexte, puis montre que cette distinction existe dans un standard réel.

## A7 — Résolution spatiale et temporelle

### ESA — Sentinel-2 Facts and figures

Source officielle :
https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-2/Facts_and_figures

La fiche mission ESA décrit 13 bandes, des résolutions spatiales de 10, 20 et 60 m selon les bandes, une fauchée de 290 km et un temps de revisite de cinq jours pour une constellation de deux satellites à l’équateur.

**Prudence pédagogique :** une revisite nominale ne garantit pas une image exploitable à chaque passage. Le cours utilise Sentinel-2 comme exemple de compromis espace/temps, pas comme solution universelle.

## A8 — Surveillance d’ouvrages d’art

### Cerema — programme Ponts Connectés

Source officielle :
https://www.cerema.fr/fr/pontsconnectes

Le programme regroupe des expérimentations autour de l’instrumentation continue, de la télédétection, de l’inspection par imagerie et de capteurs innovants. Certains projets construisent des indicateurs de comportement structurel à partir de mesures.

**Prudence pédagogique :** une instrumentation ou un indicateur ne constitue pas automatiquement un diagnostic de l’état de santé de l’ouvrage.

## Complément enseignant — métadonnées hydrologiques

### WMO Hydrological Observing System — metadata quality

Source officielle :
https://wmo.int/sites/default/files/2024-01/WHOS%20metadata%20quality.pdf

Cette source peut être utilisée pour approfondir le rôle de la localisation, des unités, de la période disponible, du fuseau horaire et de l’espacement/agrégation des observations hydrologiques.
