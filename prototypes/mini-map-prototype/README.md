# mini-map-prototype

- implements a more customised leaflet map
- attempts to make the map a composable that can be "dropped into" the desired Vue 3 SFC
  - composable uses a builder to wrap up some of the map setup
  - this is later ditched because it's too fiddly
- implements some marker customation and reactivity
- includes PWA config more as a setup demo than an actual usage/PoC
- adds some interesting plugins to test them
  - Buffer edge tiles (increase called tiles by N) [GitHub](https://github.com/TolonUK/Leaflet.EdgeBuffer)
    - not a very clever solution, see notes in MapBuilder.ts
    - not actually buffering/caching
  - Fade out when transitioning between grid layers [GitLab](https://gitlab.com/IvanSanchez/Leaflet.GridLayer.FadeOut)
    - very simple
    - works!
  - caching solution but it's for Cordova [GitHub](https://github.com/gregallensworth/L.TileLayer.Cordova)
    - proves what I was already thinking works
    - very simple ~400 lines
    - toggle for online offline is a nice touch

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

## Prototypes

- / > homeview first attempt
- /minimap > minimapview second attempt
