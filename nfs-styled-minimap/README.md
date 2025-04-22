# nfs-styled-minimap

Builds on the prev. prototype and adds much more styling and iconography.

basic inspo:
https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fneed-for-speed-minimap-v0-fv5bk6sjik4a1.jpg%3Fwidth%3D1899%26format%3Dpjpg%26auto%3Dwebp%26s%3Dce9d912ae32598a8b5c2d7b594884f95aec043ff

## Problems

- ~cant render vuetify components using current strategy~
- global typing seems broken (eg. `FeatureType` usages)
- marker manip' is ~40ms to remove a few hundred or ~100ms to add a few hundred
- legibility (lack of "good" styling)
- extensibiliy of markers is tedious
  - fix typing support
  - make generic component (props: FeatureMetaData, color, size, icon )

## TODO

- [x] improve design and portability (screen consistency) for "minimap" round aesthetic
- [x] add control to filter visible markers
- [x] add actual icons
- [ ] improve live geo interaction (current location)
- [ ] implement routing feature see [here](https://github.com/perliedman/leaflet-routing-machine)
- [x] caching tile assets for improved load times > reduced network calls
- [ ] implement rally stage data
- [ ] add even more icons
- [ ] marker clustering see [here](https://github.com/Leaflet/Leaflet.markercluster)

## Prototypes

- / > homeview first attempt
