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

    export type GeometryType = 'Point';

    export type Geometry = {
        // this map usage will only need one geometry type afaik so far (ie. Point/Cartesian)
        type: GeometryType;
        // we need to expose this geomtry as a reversed [y,x] format for Leaflet
        coordinates: Coordinate;
    };

    export interface FeatureMetaData {
        name: string;
        description: string;
        accreditation: string;
        source: URL;
        lastUpdated: Date;
        createdOn: Date;
    }

    export interface Feature {
        type: FeatureType;
        properties: Partial<FeatureMetaData>;
        geometry: Geometry;
        id: string;
    }

    export interface MarkerFeature {
        type: FeatureType;
        props: Partial<FeatureMetaData>;
        marker: MapMarker;
    }
}
