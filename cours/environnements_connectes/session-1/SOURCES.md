# Sources techniques et territoriales — Séance 1

Ces sources servent aux **retours au réel** et à la précision des notes enseignant. Elles ne remplacent pas les activités de découverte. La vallée est réelle ; la mission et les incidents sont scénarisés.

## Dossier terrain — Vallée des Aldudes

### Communauté Pays Basque — La Vallée des Aldudes, au cœur des montagnes

https://www.communaute-paysbasque.fr/actualites/toutes-les-actualites/actualite/la-vallee-des-aldudes-au-coeur-des-montagnes

La page décrit la vallée comme composée des trois villages des Aldudes, d'Urepel et de Banca, à l'entrée du Kintoa, territoire de pâturages et de bois d'environ 2 500 ha.

### Géorisques — inondation à Urepel / AZI Nive des Aldudes

https://www.georisques.gouv.fr/mes-risques/connaitre-les-risques-pres-de-chez-moi/detail/INOND?adresse=64543+Urepel&city=Urepel&codeInsee=64543&commune=Urepel&form-commune=true

La page indique un risque de crue torrentielle ou à montée rapide et référence l'AZI Nive des Aldudes couvrant Aldudes, Banca, Urepel et Saint-Étienne-de-Baïgorry.

### Communauté Pays Basque — projet Olha à Banca

https://www.communaute-paysbasque.fr/actualites/toutes-les-actualites/actualite/tiers-lieu-olha-un-projet-emblematique-pour-la-vallee-des-aldudes

Le projet a été adapté avec un nouveau bâtiment hors zone à risque de crue. La même source mentionne reconstruction de la station d'épuration de Banca et travaux de confortement des berges.


### Communauté Pays Basque — PLUi Sud Basse-Navarre (approuvé en 2026)

https://www.communaute-paysbasque.fr/logement-et-urbanisme/les-procedures-durbanisme/procedures-durbanisme/elaboration-du-plan-local-durbanisme-infracommunautaire-plui-sud-basse-navarre

Le périmètre du PLUi Sud Basse-Navarre inclut Aldudes, Banca et Urepel. Les documents d'approbation 2026 apportent des repères locaux utiles pour l'enseignant : topographie très contrainte à Banca, présence de la Nive des Aldudes, urbanisation linéaire aux Aldudes, prairies et reliefs à Urepel. Ne pas transformer ces repères en inventaire exhaustif du territoire.

### Insee — repère démographique 2023

Aldudes : 332 habitants ; Banca : 358 ; Urepel : 274, soit 964 habitants au total selon les populations communales 2023 publiées par l'Insee en 2026. Utiliser seulement comme ordre de grandeur daté ; la Communauté Pays Basque parle de façon arrondie d'un territoire rural d'environ 1 000 habitants.

## A3 — Hydrométrie : observable, mesure et prévision

### HydroPortail — station réelle sur la Nive des Aldudes

https://www.hydro.eaufrance.fr/stationhydro/Q916461001/fiche

La station « La Nive des Aldudes à Saint-Étienne-de-Baïgorry » est donnée comme mise en service en 1960 et utilisée notamment pour le suivi d'étiage et la prévision des crues. Elle permet d'ancrer la différence entre **observer une grandeur hydrométrique** et **évaluer un risque**. Attention : la station citée est à Saint-Étienne-de-Baïgorry, en aval des trois communes de la vallée ; ne pas la présenter comme une station située aux Aldudes, à Banca ou à Urepel.

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

## A7 — Relief et observation 3D

### IGN — LiDAR HD, descriptif technique

Source officielle :
https://geoservices.ign.fr/sites/default/files/2022-05/DT_LiDAR_HD_1-0.pdf

Les spécifications du produit LiDAR HD indiquent une acquisition aérienne avec une densité d'au moins **10 impulsions par m²**. Le cours l'utilise comme exemple de représentation spatiale très détaillée qui ne constitue pas, pour autant, un flux d'observation temps réel.
