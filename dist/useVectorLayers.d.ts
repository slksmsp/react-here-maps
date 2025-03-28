import { DefaultLayers } from './types';
export interface UseVectorLayersProps {
    map?: H.Map;
    truckRestrictions?: boolean;
    trafficLayer?: boolean;
    useSatellite?: boolean;
    congestion?: boolean;
    defaultLayers?: DefaultLayers;
    enableVectorLayers: boolean;
}
export declare const useVectorLayers: ({ map, useSatellite, trafficLayer, congestion, truckRestrictions, defaultLayers, enableVectorLayers, }: UseVectorLayersProps) => void;
