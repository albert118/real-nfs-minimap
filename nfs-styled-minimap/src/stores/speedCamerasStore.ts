import { defineStore } from 'pinia';
import speedCamerasNsw from './speed_cameras_nsw.json';

// this metadata is almost entirely useless from the example, but something like it might be needed
export interface SpeedCamerasNsw {
  type: string;
  generator: string;
  copyright: string;
  timestamp: string;
  // prefer to cast as needed
  features: any;
}

export const useSpeedCamerasNsw = defineStore('speedCamerasNsw', () => {
  // this staged type casting is needed, as doing it all at once throws unexpected errors
  const typedSpeedCameras = speedCamerasNsw as SpeedCamerasNsw;
  const meta = {
    type: typedSpeedCameras.type,
    generator: typedSpeedCameras.generator,
    copyright: typedSpeedCameras.copyright,
    timestamp: new Date(typedSpeedCameras.timestamp),
  };

  // we can pre-compute this entire data set, but loading large sets will potentially create performance issues
  const features: Feature[] = typedSpeedCameras.features.map((f: any) => ({
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
