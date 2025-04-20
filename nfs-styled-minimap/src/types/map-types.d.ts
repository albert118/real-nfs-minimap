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

  export enum FeatureType {
    Feature = 'Feature',
    RedLightCamera = 'Red Light Camera',
    MobileSpeedCamera = 'Mobile Speed Camera',
    SchoolZone = 'School Zone',
    SafeTCam = 'Safe-T-Cam',
    SpeedTrap = 'Speed Trap',
    NoiseCamera = 'Noise Camera',
    FixedSpeedCamera = 'Fixed Speed Camera',
    SurveillanceCamera = 'Surveillance Camera',
    TunnelSafetyCamera = 'Tunnel Safety Camera',
    AverageSpeedCamera = 'Average Speed Camera',
    HeavyVehicleSafetyCamera = 'Heavy Vehicle Safety Camera',
    AverageTunnnelSpeedCamera = 'Average Tunnel Speed Camera',
    PhoneDetectionCamera = 'Phone Detection Camera',
    SchoolZoneSpeedCamera = 'School Zone Speed Camera',
    VariableSpeedZone = 'Variable Speed Zone',
    CurrentLocation = 'Current Location',
  }

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

  // every feature type can potenially resolve a component to render it
  export const FeatureTypeMap: Record<FeatureType, ComponentAlias> = {
    [FeatureType.Feature]: SimpleMarker,
    [FeatureType.RedLightCamera]: SimpleMarker,
    [FeatureType.MobileSpeedCamera]: SimpleMarker,
    [FeatureType.SchoolZone]: SimpleMarker,
    [FeatureType.SafeTCam]: SimpleMarker,
    [FeatureType.SpeedTrap]: SimpleMarker,
    [FeatureType.NoiseCamera]: SimpleMarker,
    [FeatureType.FixedSpeedCamera]: SimpleMarker,
    [FeatureType.SurveillanceCamera]: SimpleMarker,
    [FeatureType.TunnelSafetyCamera]: SimpleMarker,
    [FeatureType.AverageSpeedCamera]: SimpleMarker,
    [FeatureType.HeavyVehicleSafetyCamera]: SimpleMarker,
    [FeatureType.AverageTunnnelSpeedCamera]: SimpleMarker,
    [FeatureType.PhoneDetectionCamera]: SimpleMarker,
    [FeatureType.SchoolZoneSpeedCamera]: SimpleMarker,
    [FeatureType.VariableSpeedZone]: SimpleMarker,
    [FeatureType.CurrentLocation]: LocationPin,
  };
}
