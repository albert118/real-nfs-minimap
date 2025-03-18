# mapping-test

TODO

## Generating PWA assets

First add an icon to the `./public` directory. This should be,

- 512x512px min.
- an SVG or png

```sh
npx pwa-asset-generator --preset minimal -i ./index.html ./public/icon.jpg ./public
```

This command will print out the PWA asset config needed for the Vite PWA plugin config (ie. the manifest). Copy it into the PWA plugin config within
`vite.config.ts`
