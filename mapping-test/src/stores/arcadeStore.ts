import { defineStore } from 'pinia';
import arcardes from './arcades.json';

export type FeatureType = 'Feature';

export type GeometryType = 'Point';

export type Geometry = {
  type: GeometryType;
  coordinates: [number, number];
};

export interface PointOfInterest {
  type: FeatureType;
  properties: Record<string, string>;
  geometry: Geometry;
  id: string;
}

export interface Arcades {
  type: string;
  generator: string;
  copyright: string;
  timestamp: string;
  // prefer to cast as needed
  features: any;
}

export const useArcardes = defineStore('arcardes', () => {
  const typedArcades = arcardes as Arcades;
  const meta = {
    type: typedArcades.type,
    generator: typedArcades.generator,
    copyright: typedArcades.copyright,
    timestamp: new Date(typedArcades.timestamp),
  };

  return {
    meta,
    features: typedArcades.features as PointOfInterest[],
  };
});
