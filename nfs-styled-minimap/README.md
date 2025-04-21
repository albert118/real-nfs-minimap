# nfs-styled-minimap

Builds on the prev. prototype and adds much more styling and iconography.

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
- [ ] implement routing feature
- [ ] caching tile assets for improved load times > reduced network calls
- [ ] implement rally stage data
- [ ] add even more icons

## Prototypes

- / > homeview first attempt
