export {};

declare module 'leaflet' {
    export interface TileLayerOptions {
        /**
         * Enable buffering edge tiles
         *
         * @see https://github.com/TolonUK/Leaflet.EdgeBuffer
         * @default 1
         */
        edgeBufferTiles: number;
    }
}
