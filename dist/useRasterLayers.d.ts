import type { DefaultLayers } from './types';
export interface UseRasterLayersProps {
    map?: H.Map;
    truckRestrictions?: boolean;
    showActiveAndInactiveTruckRestrictions?: boolean;
    trafficLayer?: boolean;
    useSatellite?: boolean;
    congestion?: boolean;
    defaultLayers?: DefaultLayers;
    apiKey: string;
    enableRasterLayers: boolean;
    language: string;
    hidpi?: boolean;
}
export declare const useRasterLayers: ({ map, useSatellite, trafficLayer, congestion, truckRestrictions, defaultLayers, apiKey, language, enableRasterLayers, showActiveAndInactiveTruckRestrictions, hidpi, }: UseRasterLayersProps) => void;
