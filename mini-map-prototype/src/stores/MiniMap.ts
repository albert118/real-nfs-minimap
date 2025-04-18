import L from 'leaflet';
import type { VueMarker } from './VueMarker';
import type { ComponentInternalInstance } from 'vue';

export interface MiniMapOptions {
  center: Coordinate;
  zoom: number;
  markers: Record<string, VueMarker>;
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

  private readonly markers: Record<string, VueMarker>;

  private readonly verbose: boolean;

  constructor(el: HTMLElement, instance: ComponentInternalInstance, options: MiniMapOptions) {
    const { center, zoom, markers, verbose = false } = options;
    this.verbose = verbose;

    setDefaultIconOptions();

    this.__map = L.map(el);
    this.verbose && console.log('created and mounted map instance');

    const { x, y } = center;
    this.__map.setView([x, y], zoom);
    this.verbose && console.log('set center-point and zoom level');

    L.tileLayer(this.urlTemplate, { attribution: this.attribution }).addTo(this.__map);
    this.verbose && console.log('added map layer');

    this.markers = markers;
    this.addMarkers(el, instance);
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

  addMarkers(el: HTMLElement, instance: ComponentInternalInstance) {
    console.time('adding markers');

    this.verbose && console.log('map ready - will attempt to render markers:', this.markers);

    // having rendered the map and awaited the component to render, now attempt to render the markers
    Object.entries(this.markers).forEach(([id, marker]) => {
      marker.render(el, instance?.appContext);
      marker.marker?.addTo(this.__map);
    });
    console.timeEnd('adding markers');
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
