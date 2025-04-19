import L from 'leaflet';
import type { VueMarker } from './VueMarker';
import type { ComponentInternalInstance } from 'vue';

export interface MiniMapOptions {
  center: Coordinate;
  zoom: number;
  verbose?: boolean;
}

/***
 * A customised LeafletJs map instance designed to look like a minimap
 */
export class MiniMap {
  private __map: L.Map;

  /** @internal */
  readonly urlTemplate = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';
  /** @internal */
  readonly attribution =
    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

  private markers: Record<string, VueMarker>;

  private readonly verbose: boolean;

  constructor(el: HTMLElement, options: MiniMapOptions) {
    const { center, zoom, verbose = false } = options;
    this.verbose = verbose;
    this.markers = {};

    setDefaultIconOptions();

    this.__map = L.map(el);
    this.verbose && console.log('created and mounted map instance');

    this.setView(center, zoom);

    L.tileLayer(this.urlTemplate, { attribution: this.attribution }).addTo(this.__map);
    this.verbose && console.log('added map layer');
  }

  /**
   * Clear any current markers.
   */
  clearMarkers() {
    console.time('clearing markers');

    Object.values(this.markers).forEach((m) => {
      m.marker && this.__map.removeLayer(m.marker);
      m.destroy();
    });
    console.timeEnd('clearing markers');
  }

  addMarkers(markers: Record<string, VueMarker>, el: HTMLElement, instance: ComponentInternalInstance) {
    this.markers = markers;
    this.verbose && console.log('will attempt to render markers:', this.markers);

    // having rendered the map and awaited the component to render, now attempt to render the markers
    Object.entries(this.markers).forEach(([id, marker]) => {
      marker.render(el, instance?.appContext);
      marker.marker?.addTo(this.__map);
    });
    console.timeEnd('adding markers');
  }

  setView(center: Coordinate, zoom: number) {
    // stop any prior movement before moving to the next requrested coordinate
    this.__map.stop();
    this.verbose && console.log(`set center-point: ${JSON.stringify(center)} and zoom: ${zoom}`);
    this.__map.setView([center.x, center.y], zoom);
  }

  /**
   * Destroy the map instance
   */
  destroy() {
    this.clearMarkers();
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
