export {};

declare global {
  export type Coordinate = {
    /**
     * Latitude
     */
    x: number;
    /**
     * Longitude
     */
    y: number;
  };

  export type FeatureType = 'Feature';

  export type GeometryType = 'Point';

  export type Geometry = {
    // this map usage will only need one geometry type afaik so far (ie. Point/Cartesian)
    type: GeometryType;
    // we need to expose this geomtry as a reversed [y,x] format for Leaflet
    coordinates: Coordinate;
  };

  export interface PointOfInterest {
    type: FeatureType;
    // this metadata section would be useful to expand on
    properties: Record<string, string>;
    geometry: Geometry;
    id: string;
  }
}
