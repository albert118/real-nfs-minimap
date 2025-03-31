import { renderComponent } from '@utils/render';
import type { Marker } from 'leaflet';
import L from 'leaflet';
import type { AppContext } from 'vue';
import MapMarker from '@components/MapMarker.vue';

export type VueMarkerType = {
  name: string;
  marker: Marker<any>;
  coordinate: Coordinate;
};

export class VueMarker implements VueMarkerType {
  name: string;
  marker: Marker<any>;
  coordinate: Coordinate;
  vueComponent: HTMLElement | undefined;

  constructor(poi: PointOfInterest) {
    this.name = this.getPoiName(poi);
    this.coordinate = poi.geometry.coordinates;

    // add a fake div marker to remove the default marker
    // TODO: can we just unset the marker icon here? - no default is provided by Icon.Default implementation
    // TODO: override Icon.Default.prototype.options.icon with undefined URL and hidden class
    const fakeDivIcon = L.divIcon({
      className: 'map--marker-icon',
    });

    try {
      // to create the marker icon, this must be first added to a map otherwise no element will exist (yet)
      this.marker = L.marker([this.coordinate.y, this.coordinate.x], { icon: fakeDivIcon });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create Vue Marker');
    }
  }

  createMarkerIcon(appContext: AppContext) {
    const el = this.marker.getElement();

    if (!el) {
      console.warn('failed to get element for marker: ', this.marker.toString());
      throw new Error('Fuck the thing never made an element');
    }

    this.vueComponent = renderComponent(el, MapMarker, this.marker.toString(), appContext);

    if (!this.vueComponent) throw new Error('Fuck the thing did not render');

    return this.vueComponent;
  }

  get element() {
    return this.marker.getElement();
  }

  toString() {
    return `${this.name}:${this.coordinate.x}-${this.coordinate.y}`;
  }

  private getPoiName(poi: PointOfInterest) {
    if (poi.properties['name']) return poi.properties['name'];
    if (poi.properties['name:en']) return poi.properties['name:en'];
    return '<no name>';
  }
}
