// this SHOULD be in the @types folder, but for some reason it is considered a DTS file
// once it's in there, idky
import type { ComponentAlias } from '@utils/render';
import SimpleMarker from '@components/markers/SimpleMarker.vue';
import LocationPin from '@components/markers/LocationPin.vue';

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
  [FeatureType.Feature]: typeof SimpleMarker,
  [FeatureType.RedLightCamera]: typeof SimpleMarker,
  [FeatureType.MobileSpeedCamera]: typeof SimpleMarker,
  [FeatureType.SchoolZone]: typeof SimpleMarker,
  [FeatureType.SafeTCam]: typeof SimpleMarker,
  [FeatureType.SpeedTrap]: typeof SimpleMarker,
  [FeatureType.NoiseCamera]: typeof SimpleMarker,
  [FeatureType.FixedSpeedCamera]: typeof SimpleMarker,
  [FeatureType.SurveillanceCamera]: typeof SimpleMarker,
  [FeatureType.TunnelSafetyCamera]: typeof SimpleMarker,
  [FeatureType.AverageSpeedCamera]: typeof SimpleMarker,
  [FeatureType.HeavyVehicleSafetyCamera]: typeof SimpleMarker,
  [FeatureType.AverageTunnnelSpeedCamera]: typeof SimpleMarker,
  [FeatureType.PhoneDetectionCamera]: typeof SimpleMarker,
  [FeatureType.SchoolZoneSpeedCamera]: typeof SimpleMarker,
  [FeatureType.VariableSpeedZone]: typeof SimpleMarker,
  [FeatureType.CurrentLocation]: typeof LocationPin,
};
