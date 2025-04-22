import { type TileLayerOptions } from 'leaflet';

export {};

declare module 'leaflet' {
  export interface CachedTileLayerOptions extends TileLayerOptions {
    folder: string;
    name: string;
    autocache?: boolean;
    debug?: boolean;
  }

  export interface TileLayer {
    initialize: (url: string, options: TileLayerOptions) => void;
  }
}
