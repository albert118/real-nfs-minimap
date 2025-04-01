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

  constructor(coordinates: Coordinate, el: HTMLElement, appContext: AppContext) {
    this.coordinate = coordinates;
    this.name = `vue-marker-${this.coordinate.x}-${this.coordinate.y}`;

    // name as key is fine for the prototype, however it is not globally unique
    this.vueComponent = renderComponent(el, MapMarker, this.name, appContext);
    if (!this.vueComponent) throw new Error('Failed to render the MapMarker');

    // add a fake div marker to remove the default marker
    const markerDivIcon = L.divIcon({
      // we must provide a custom classname here to override the default styling
      className: 'map--marker-icon',
      html: this.vueComponent,
    });

    try {
      // to create the marker icon, this must be first added to a map otherwise no element will exist (yet)
      this.marker = L.marker([this.coordinate.y, this.coordinate.x], { icon: markerDivIcon });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create Vue Marker');
    }
  }

  get element() {
    return this.marker.getElement();
  }

  toString() {
    return `${this.name}:${this.coordinate.x}-${this.coordinate.y}`;
  }
}
