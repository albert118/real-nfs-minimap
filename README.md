# Real Need for Speed Mini-Map

The goal is to recreate a NFS style minimap that can be installed as a PWA. The desired features are,

- [x] a real map
- [x] custom map icons (markers) for a variety of real world features/points/people of interest
- [ ] a slick UX (it should feel snappy)
- [ ] a simple UI that is reminiscent of the Need for Speed style mini-maps
  - this should be legible (not all the NFS examples were lol)
  - high contrast preferred
  - dark/light modes for improved night/day contrast
- [ ] offline support (loss of network is expected)
- [ ] live location (current location should be functional)

Additional features I'd like to add,

- [ ] saved routes ("courses")
- [ ] rally stage data (maybe as an overlay?)
- [ ] "drive with friends" - friend markers if they're nearby
  - this is basically just a location share-by-invite feature (think Messenger)
- [ ] OSM additional data (features) plugin support (could be interesting?) see [here](https://github.com/amrHH/Leaflet.OSMDataPicker)

## Feature Roadmap (incl. technical)

- [x] caching and latency improvements
  - [x] tile layer caching
  - [x] edge "buffering"
  - [x] grid layer fade transitioning (leverage cached grid layers)
- [ ] marker support
  - [x] variety of markers for various known road features
  - [ ] marker clustering (simplify markers when zoomed out)
  - [ ] ~marker filtering~ > a settings feature is more useful here
- [ ] UI/UX improvements
  - [ ] tech/material theme
  - [ ] icons
  - [ ] favicon
- [ ] live location
  - [ ] live tracking while moving
  - [ ] optimised to avoid battery drain where possible (?)
- [ ] routing
  - [ ] some simple routing support
  - this isn't Google Maps, but a simple feature would be neat for now
  - this would avoid swapping between two different apps while driving
- [ ] settings
  - [ ] marker filtering (disable features that aren't preferred)
  - [ ] choose your icon (think Wayze but cooler options)
  - [ ] theme (dark/light preferred or follow device)
  - [ ] labels (enable/disable marker labels)
  - [ ] dev settings (clear cache, etc.)
- [ ] "drive with friends" - friend markers if they're nearby
  - [ ] invite system
  - [ ] nearby prompt + opt-in setting (don't share location unless preferred)

## Prototypes

Attempts with various configurations to see what's possible,

1. [mapping-test](./prototypes/mapping-test/README.md)
2. [mini-map-prototype](./prototypes/mini-map-prototype/README.md)
3. [nfs-styled-minimap](./prototypes/nfs-styled-minimap/README.md)
