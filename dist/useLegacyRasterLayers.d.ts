import type { DefaultLayers } from './types';
export interface UseRasterLayersProps {
    map?: H.Map;
    truckRestrictions?: boolean;
    trafficLayer?: boolean;
    useSatellite?: boolean;
    congestion?: boolean;
    defaultLayers?: DefaultLayers;
    apiKey: string;
    hidpi?: boolean;
    enableRasterLayers: boolean;
    language: string;
    engineType?: H.Map.EngineType;
}
export declare const getLayers: (apiKey: string, language: string, hidpi?: boolean) => {
    trafficBaseLayer: H.map.layer.TileLayer;
    trafficOverlayLayer: H.map.layer.TileLayer;
    truckCongestionLayer: H.map.layer.TileLayer;
    truckOverlayLayer: H.map.layer.TileLayer;
};
export declare const useLegacyRasterLayers: ({ map, useSatellite, trafficLayer, congestion, truckRestrictions, defaultLayers, apiKey, language, hidpi, enableRasterLayers, }: UseRasterLayersProps) => void;
