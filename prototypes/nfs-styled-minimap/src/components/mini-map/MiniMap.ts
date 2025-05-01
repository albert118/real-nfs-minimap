import L from 'leaflet';
import type { ComponentInternalInstance } from 'vue';
import Logger from 'js-logger';
import { FeatureType, FeatureTypeMap } from '@stores/feature-types';
import type { MapMarker } from '@components/markers/MapMarker';

export interface MiniMapOptions {
  center: Coordinate;
  zoom: number;
}

/***
 * A customised LeafletJs map instance designed to look like a minimap
 */
export class MiniMap {
  private __map: L.Map;
  private __logger = Logger.get('MiniMap');

  // tile servers: https://wiki.openstreetmap.org/wiki/Tile_servers
  // tile providers: https://wiki.openstreetmap.org/wiki/Raster_tile_providers

  /** @internal */
  readonly urlTemplate = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

  /** @internal */
  readonly attribution =
    '&copy; <a href="https://osmfoundation.org/">OpenStreetMap Foundation</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

  constructor(el: HTMLElement, options: MiniMapOptions) {
    const { center, zoom } = options;

    setDefaultIconOptions();

    this.__map = L.map(el);
    this.__logger.debug('created and mounted map instance');

    this.setView(center, zoom);

    L.tileLayer(this.urlTemplate, { attribution: this.attribution }).addTo(this.__map);
    this.__logger.debug('added map layer');
  }

  removeMarkers(toRemove: Set<MarkerFeature>) {
    this.__logger.time('removing markers');

    toRemove.forEach((value) => {
      // typing must be reapplied here, otherwise we lose deep-typing of the attributes
      const { marker }: { marker: MapMarker } = value;
      marker.marker && this.__map.removeLayer(marker.marker);
      marker.destroy();
    });

    this.__logger.timeEnd('removing markers');
  }

  addMarkers(toAdd: Set<MarkerFeature>, el: HTMLElement, instance: ComponentInternalInstance) {
    this.__logger.time('adding markers');
    this.__logger.debug(`will add '${toAdd.size}' markers`);

    toAdd.forEach((value) => {
      // typing must be reapplied here, otherwise we lose deep-typing of the attributes
      const { type, props, marker }: { type: FeatureType; props: Partial<FeatureMetaData>; marker: MapMarker } = value;
      marker.render(el, FeatureTypeMap[type], instance?.appContext, props);
      marker.marker?.addTo(this.__map);
    });

    this.__logger.timeEnd('adding markers');
  }

  setView(center: Coordinate, zoom: number) {
    if (center.x === Infinity || center.y === Infinity) {
      this.__logger.warn('cannot update the map view with center-point where either x or y are "Infinity"');
      return;
    }

    // stop any prior movement before moving to the next requrested coordinate
    this.__map.stop();
    this.__logger.debug(`set center-point: ${JSON.stringify(center)} and zoom: ${zoom}`);
    this.__map.setView([center.x, center.y], zoom);
  }

  destroy() {
    this.removeMarkers(new Set());
    this.__map.remove();
  }
}

/**
 * Overrides the default implementation
 * https://leafletjs.com/reference.html#divicon
 */
function setDefaultIconOptions() {
  L.Icon.Default.prototype.options = {
    ...L.Icon.Default.prototype.options,
    iconUrl: undefined,
    iconRetinaUrl: undefined,
    shadowRetinaUrl: undefined,
    iconSize: undefined,
  };
}

// Stadia tile provider
// /** @internal */
// readonly urlTemplate = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';
// /** @internal */
// readonly attribution =
//   '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
