import { defineStore } from 'pinia';
import arcardes from './arcades.json';

// this metadata is almost entirely useless from the example, but something like it might be needed
export interface Arcades {
  type: string;
  generator: string;
  copyright: string;
  timestamp: string;
  // prefer to cast as needed
  features: any;
}

export const useArcadesDemo = defineStore('arcadesDemo', () => {
  // this staged type casting is needed, as doing it all at once throws unexpected errors
  const typedArcades = arcardes as Arcades;
  const meta = {
    type: typedArcades.type,
    generator: typedArcades.generator,
    copyright: typedArcades.copyright,
    timestamp: new Date(typedArcades.timestamp),
  };

  // we can pre-compute this entire data set, but loading large sets will potentially create performance issues
  const features: PointOfInterest[] = typedArcades.features.map((f: any) => ({
    id: f.id,
    type: f.type,
    properties: f.properties,
    geometry: {
      type: 'Point',
      coordinates: {
        x: f.geometry.coordinates[0],
        y: f.geometry.coordinates[1],
      },
    },
  }));

  return {
    meta,
    features,
  };
});
