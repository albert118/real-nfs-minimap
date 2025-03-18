import { defineStore } from 'pinia';
import arcardes from './arcades.json';

export type FeatureType = 'Feature';

export type GeometryType = 'Point';

export type Geometry = {
  // this map usage will only need one geometry type afaik so far (ie. Point/Cartesian)
  type: GeometryType;
  // we need to expose this geomtry as a reversed [y,x] format for Leaflet
  coordinates: [number, number];
};

export interface PointOfInterest {
  type: FeatureType;
  // this metadata section would be useful to expand on
  properties: Record<string, string>;
  geometry: Geometry;
  id: string;
}

// this metadata is almost entirely useless from the example, but something like it might be needed
export interface Arcades {
  type: string;
  generator: string;
  copyright: string;
  timestamp: string;
  // prefer to cast as needed
  features: any;
}

export const useArcardes = defineStore('arcardes', () => {
  // this staged type casting is needed, as doing it all at once throws unexpected errors
  const typedArcades = arcardes as Arcades;
  const meta = {
    type: typedArcades.type,
    generator: typedArcades.generator,
    copyright: typedArcades.copyright,
    timestamp: new Date(typedArcades.timestamp),
  };

  return {
    meta,
    // we can pre-compute this entire data set, but loading large sets will potentially create perofrmance issues
    features: typedArcades.features as PointOfInterest[],
  };
});
