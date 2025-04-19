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

## Prototypes

- / > homeview first attempt
- /minimap > minimapview second attempt
