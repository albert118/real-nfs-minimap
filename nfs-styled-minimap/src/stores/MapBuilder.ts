import L from 'leaflet';
import { VueMarker } from './VueMarker';
import type { ShallowRef } from 'vue';

export class MapBuilder {
  _map: L.Map;

  constructor(mapRef: Readonly<ShallowRef<HTMLInputElement | null>>) {
    if (!mapRef.value) throw new Error('no map ref available');
    this._map = L.map(mapRef.value);
  }

  addBaseLayer() {
    const stadiaMapUrlTemplate = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';
    const attribution =
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

    L.tileLayer(stadiaMapUrlTemplate, { attribution: attribution }).addTo(this._map);

    return this;
  }

  addMarkers(markers: Map<string, VueMarker>) {
    markers.forEach((m) => m.getMarker.addTo(this._map));
    return this;
  }

  setCenter(zoom: number, coordinate: Coordinate) {
    // TODO: fix order of these two variables and improve usage + deconstruction + naming
    const { x, y } = coordinate;
    this._map.setView([x, y], 6);
    return this;
  }

  get map() {
    return this._map;
  }
}
