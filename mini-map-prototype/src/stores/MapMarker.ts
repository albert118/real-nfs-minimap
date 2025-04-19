import { renderComponent, type ComponentAlias } from '@utils/render';
import type { Marker } from 'leaflet';
import L from 'leaflet';
import type { AppContext, DefineComponent } from 'vue';

export type MapMarkerType = {
  name: string;
  marker: Marker<any> | undefined;
  coordinate: Coordinate;
  render: (
    el: HTMLElement,
    component: DefineComponent<any, any, any, any>,
    appContext: AppContext,
    props?: Record<string, any>,
    className?: string,
  ) => void;
  toString: () => string;
  destroy: () => void;
};

export class MapMarker implements MapMarkerType {
  readonly name: string;
  readonly coordinate: Coordinate;

  private __marker: Marker<any> | undefined;
  private __component: HTMLElement | undefined;

  constructor(coordinates: Coordinate) {
    this.coordinate = coordinates;
    this.name = `vue-marker-${this.coordinate.x}-${this.coordinate.y}`;
  }

  render(el: HTMLElement, component: ComponentAlias, appContext: AppContext, props?: Record<string, any>, className?: string) {
    const markerEl = document.createElement('div');
    // generic ID here should be globally unique
    markerEl.id = 'map--marker';
    el.appendChild(markerEl);

    // name as key is fine for the prototype, however it is not globally unique
    this.__component = renderComponent(markerEl, component, props, appContext);
    if (!this.__component) throw new Error(`Failed to render ${component.name ?? '<no component name resolved>'}`);

    // add a fake div marker to remove the default marker
    const markerDivIcon = L.divIcon({
      // we must provide a custom classname here to override the default styling
      className: className ?? 'map--marker-icon',
      html: this.__component,
    });

    try {
      this.__marker = L.marker([this.coordinate.y, this.coordinate.x], { icon: markerDivIcon });
      console.log(this.__marker);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create Map Marker');
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
