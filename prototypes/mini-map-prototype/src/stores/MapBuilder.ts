import L from 'leaflet';
import { VueMarker } from './VueMarker';
import type { ShallowRef } from 'vue';
// enable the Grid Layer fadeout
// https://gitlab.com/IvanSanchez/Leaflet.GridLayer.FadeOut
// this should require 0 additional config
import 'leaflet.gridlayer.fadeout';

export class MapBuilder {
  _map: L.Map;

  constructor(mapRef: Readonly<ShallowRef<HTMLInputElement | null>>) {
    if (!mapRef.value) throw new Error('no map ref available');
    this._map = L.map(mapRef.value);
  }

  addBaseLayer() {
    // stadia provider often limits the requests because of frequent dev hard refreshes
    // const stadiaMapUrlTemplate = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';
    // const attribution =
    //   '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

    const urlTemplate = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution =
      '&copy; <a href="https://osmfoundation.org/">OpenStreetMap Foundation</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

    // configure Leaflet.EdgeBuffer here by specifying the number of edge tiles to buffer
    // { edgeBufferTiles: 1 }
    // this isn't truly caching/buffering see https://github.com/TolonUK/Leaflet.EdgeBuffer/blob/9fef088b57176186853dbf2ce55dfc2decaffedc/src/leaflet.edgebuffer.js#L33-L37
    // it just increases the network load
    L.tileLayer(urlTemplate, { attribution: attribution }).addTo(this._map);

    return this;
  }

  addMarkers(markers: Map<string, VueMarker>) {
    markers.forEach((m) => m.marker?.addTo(this._map));
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
