import L from 'leaflet';
import type { ComponentInternalInstance } from 'vue';
import type { MapMarker } from './MapMarker';
import SimpleMarker from '@components/markers/SimpleMarker.vue';
import LocationPin from '@components/markers/LocationPin.vue';

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

  // tile servers: https://wiki.openstreetmap.org/wiki/Tile_servers
  // tile providers: https://wiki.openstreetmap.org/wiki/Raster_tile_providers
  // /** @internal */
  // readonly urlTemplate = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';
  /** @internal */
  readonly urlTemplate = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  // /** @internal */
  // readonly attribution =
  //   '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
  /** @internal */
  readonly attribution =
    '&copy; <a href="https://osmfoundation.org/">OpenStreetMap Foundation</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

  private markers: Record<string, MapMarker>;
  private locationPins: Record<string, MapMarker>;

  private readonly verbose: boolean;

  constructor(el: HTMLElement, options: MiniMapOptions) {
    const { center, zoom, verbose = false } = options;
    this.verbose = verbose;
    this.markers = {};
    this.locationPins = {};

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
    this.verbose && console.time('clearing markers');

    Object.values(this.markers).forEach((m) => {
      m.marker && this.__map.removeLayer(m.marker);
      m.destroy();
    });
    this.verbose && console.timeEnd('clearing markers');
  }

  clearLocationPins() {
    this.verbose && console.time('clearing location pins');

    Object.values(this.locationPins).forEach((m) => {
      m.marker && this.__map.removeLayer(m.marker);
      m.destroy();
    });
    this.verbose && console.timeEnd('clearing location pins');
  }

  addMarkers(markers: Record<string, MapMarker>, el: HTMLElement, instance: ComponentInternalInstance) {
    this.markers = markers;
    this.verbose && console.log('will attempt to render markers:', this.markers);

    // having rendered the map and awaited the component to render, now attempt to render the markers
    Object.entries(this.markers).forEach(([id, marker]) => {
      marker.render(el, SimpleMarker, instance?.appContext, { label: marker.name });
      marker.marker?.addTo(this.__map);
    });
    console.timeEnd('adding markers');
  }

  addLocationPins(markers: Record<string, MapMarker>, el: HTMLElement, instance: ComponentInternalInstance) {
    this.locationPins = markers;
    this.verbose && console.log('will attempt to render location pins:', this.locationPins);

    // having rendered the map and awaited the component to render, now attempt to render the markers
    Object.entries(this.locationPins).forEach(([id, marker]) => {
      marker.render(el, LocationPin, instance?.appContext, { label: marker.name });
      marker.marker?.addTo(this.__map);
    });
    console.timeEnd('adding location pins');
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
