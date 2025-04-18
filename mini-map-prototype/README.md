# mini-map-prototype

TODO

## Generating PWA assets

First add an icon to the `./public` directory. This should be,

- 512x512px min.
- an SVG (for scaling and masking)

```sh
npx pwa-asset-generator ./public/icon.jpg ./public -i ./index.html --icon-only --favicon
```

This command will print out the PWA asset config needed for the Vite PWA plugin config (ie. the manifest). Copy it into the PWA plugin config within
`vite.config.ts`

> Note that this will modify the `index.html` with the appropriate meta.

## Drawbacks

mount then resolve,

- geo location
- data wrangling
- ref loading > prop mapping

Map(markerRef, zoom) - figure out its centre-point - set its zoom - create the initial leaflet map DOM node and pipe config - create the tile layer
for the map content - add marker content for points of interest, populating content onto the slot for markers

other crap

- setting default icon options
- watching for changes to zoom
- watching for changes to marker content
- construct a map instance that attaches to a DOM node
- given some markers, provide them to the leaflet map instance
