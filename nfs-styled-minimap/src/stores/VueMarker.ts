import { renderComponent } from '@utils/render';
import type { Marker } from 'leaflet';
import L from 'leaflet';
import type { AppContext } from 'vue';
import MapMarker from '@components/MapMarker.vue';

export type VueMarkerType = {
  name: string;
  marker: Marker<any> | undefined;
  coordinate: Coordinate;
  render: (el: HTMLElement, appContext: AppContext) => void;
  toString: () => string;
  destroy: () => void;
};

export class VueMarker implements VueMarkerType {
  readonly name: string;
  readonly coordinate: Coordinate;

  private __marker: Marker<any> | undefined;
  private __component: HTMLElement | undefined;

  constructor(coordinates: Coordinate) {
    this.coordinate = coordinates;
    this.name = `vue-marker-${this.coordinate.x}-${this.coordinate.y}`;
  }

  render(el: HTMLElement, appContext: AppContext) {
    const markerEl = document.createElement('div');
    markerEl.id = 'map--marker';
    el.appendChild(markerEl);

    // name as key is fine for the prototype, however it is not globally unique
    this.__component = renderComponent(markerEl, MapMarker, { key: this.name, label: this.name }, appContext);
    if (!this.__component) throw new Error('Failed to render the MapMarker');

    // add a fake div marker to remove the default marker
    const markerDivIcon = L.divIcon({
      // we must provide a custom classname here to override the default styling
      className: 'map--marker-icon',
      html: this.__component,
    });

    try {
      // to create the marker icon, this must be first added to a map otherwise no element will exist (yet)
      this.__marker = L.marker([this.coordinate.y, this.coordinate.x], { icon: markerDivIcon });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create Vue Marker');
    }
  }

  get element() {
    return this.__marker?.getElement();
  }

  get marker() {
    return this.__marker;
  }

  toString() {
    return `${this.name}:${this.coordinate.x}-${this.coordinate.y}`;
  }

  destroy() {
    this.__component?.remove();
  }
}
