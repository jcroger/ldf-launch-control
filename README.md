# LFD Launch Control

Interface de pilotage pour le lancement de fusées LDF — armement, tir et
suivi télémétrie depuis un point d'accès ESP32 embarqué.

## Fonctionnalités prévues

- Sélection de la configuration à piloter (LFD #1, LFD #2 avec avionique)
- État continuité / liaison radio en temps réel
- Armement par pression longue (3s) avec confirmation de tir + compte à rebours annulable
- Télémétrie live en vol (vitesse, accélération, altitude) pour les configs équipées d'avionique
- Récapitulatif de vol (valeurs max) après atterrissage

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- [Mantine](https://mantine.dev/) pour les composants et le style

## Développement

```bash
npm install
npm run dev
```

```bash
npm run build   # build de production dans dist/
npm run lint
```

## Structure

```
src/            App React (en cours de construction)
prototype/      Maquette interactive de référence (format .dc.html,
                 nécessite le runtime support.js — non déployée telle quelle)
```

Le dossier `prototype/` contient la maquette visuelle initiale (3 écrans :
sélection, Fusée 1 sans télémétrie, Fusée 2 avec télémétrie live) qui sert
de référence pour l'implémentation React/Mantine en cours dans `src/`.
