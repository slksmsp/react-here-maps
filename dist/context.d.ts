/// <reference types="react" />
export interface HEREMapContextType {
    map?: H.Map;
    routesGroup?: H.map.Group;
    removeFromMarkerGroup: (marker: H.map.Marker, group: string) => void;
    addToMarkerGroup: (marker: H.map.Marker, group: string) => void;
}
export declare const HEREMapContext: import("react").Context<HEREMapContextType>;
