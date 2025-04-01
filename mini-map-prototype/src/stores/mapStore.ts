import { defineStore } from 'pinia';
import { VueMarker } from './VueMarker';
import type { AppContext, ShallowRef } from 'vue';
import { MapBuilder } from './MapBuilder';

export const useMap = defineStore('map', () => {
  const markers = ref<Map<string, VueMarker>>(new Map());
  const appContext = ref<AppContext | undefined>();
  const features = ref<PointOfInterest[]>([]);

  let builder: MapBuilder | undefined;

  function load(mapRef: Readonly<ShallowRef<HTMLInputElement | null>>, center: Coordinate) {
    try {
      console.log('building map');
      // center MUST be set, else we will see a white placeholder (no map will load)
      builder = new MapBuilder(mapRef).addBaseLayer().setCenter(6, center);

      // we must track the instance (specifically AppContext) to render custom Vue components
      const instance = getCurrentInstance();
      if (!instance) throw new Error('no app context found');
      appContext.value = instance.appContext;
    } catch (error) {
      console.error(error);
    }
  }

  function setFeatures(value: PointOfInterest[]) {
    features.value = value;
  }

  function clear() {
    if (!builder) {
      console.log('clear called without builder');
      return;
    }
    console.log('clear called');

    const before = markers.value.size;
    console.log('Clearing the current marker set');
    markers.value.forEach((m) => {
      // m?.element && builder!.map.removeControl(m.element);
      m?.element?.remove();
    });

    markers.value.clear();

    const after = markers.value.size;
    console.log(`Cleared "${before - after}" markers (this should be ALL markers)`);
  }

  function setMarkers(elements: HTMLInputElement[]) {
    if (!appContext.value) {
      console.log('no app context when setting markers');
      return;
    }

    // build the marker set for future lifecycle tracking
    features.value.forEach((poi: PointOfInterest, index: number) => {
      const el = elements[index];
      const vueMarker = new VueMarker(poi.geometry.coordinates, el, appContext.value!);
      markers.value.set(vueMarker.toString(), vueMarker);
    });

    // first add the marker controls to the map
    markers.value.forEach((m) => m.marker.addTo(builder!.map));
  }

  function setCenter(zoom: number, coordinate: Coordinate) {
    if (!builder) return;
    builder!.setCenter(zoom, coordinate);
  }

  return {
    load,
    markers,
    clear,
    setMarkers,
    setFeatures,
    setCenter,
  };
});
