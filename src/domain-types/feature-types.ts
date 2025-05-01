import SimpleMarker from '@components/markers/SimpleMarker.vue';
import LocationPin from '@components/markers/LocationPin.vue';
import RedLightMarker from '@components/markers/RedLightMarker.vue';
import MobileSpeedCameraMarker from '@components/markers/MobileSpeedCameraMarker.vue';
import SchoolZoneMarker from '@components/markers/SchoolZoneMarker.vue';
import type { MapMarker } from '@components/markers/MapMarker';
import type { Geometry } from './map-types';

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

// every feature type can potenially resolve a component to render it
export const FeatureTypeMap = {
    [FeatureType.Feature]: SimpleMarker,
    [FeatureType.RedLightCamera]: RedLightMarker,
    [FeatureType.MobileSpeedCamera]: MobileSpeedCameraMarker,
    [FeatureType.SchoolZone]: SchoolZoneMarker,
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
