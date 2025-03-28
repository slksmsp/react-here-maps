import './bundle';
import React from 'react';
export interface HEREMapProps extends H.Map.Options {
    children?: React.ReactNode;
    apiKey: string;
    animateCenter?: boolean;
    animateZoom?: boolean;
    hidpi?: boolean;
    interactive?: boolean;
    routes?: object[];
    truckRestrictions?: boolean;
    /**
     * Specify the engine type. Choose between the newer HARP engine, or the legacy P2D engine.
     * The WEBGL engine is not supported by this library.
     *
     * Note that the P2D engine is no longer supported by HERE and may be shut down at any moment.
     * It's only provided for legacy reasons for a transitional period.
     */
    engineType?: H.Map.EngineType;
    showActiveAndInactiveTruckRestrictions?: boolean;
    trafficLayer?: boolean;
    useSatellite?: boolean;
    disableMapSettings?: boolean;
    onMapAvailable?: (state: HEREMapState) => void;
    /**
     * Language code that is used both for the tile labels
     * and for the UI (if disableMapSettings is false).
     * This can be either a two-letter code (e.g. 'en') or
     * a full locale code (e.g. 'en-US' or `de-DE`).
     *
     * Note that not all languages can be used for the UI.
     * For the full list of supported languages, see
     * https://www.here.com/docs/bundle/maps-api-for-javascript-developer-guide/page/topics/map-controls-ui.html#change-the-ui-language
     *
     * @default en
     */
    language?: string;
    /**
     * Also known as environmental zones.
     */
    congestion?: boolean;
    useVectorTiles?: boolean;
}
export interface HEREMapState {
    map?: H.Map;
    behavior?: H.mapevents.Behavior;
    ui?: H.ui.UI;
    markersGroups: Record<string, H.map.Group>;
    routesGroup?: H.map.Group;
    trafficLayer?: boolean;
}
export interface HEREMapRef {
    getMap: () => H.Map;
    getElement: () => Element;
    setCenter: (point: H.geo.IPoint) => void;
    setZoom: (zoom: number) => void;
    screenToGeo: (x: number, y: number) => H.geo.Point;
    zoomOnMarkers: (animate?: number | boolean, group?: string) => void;
    zoomOnMarkersSet: (markersSet: H.map.DomMarker[], animate?: number | boolean) => void;
    addToMarkerGroup: (marker: H.map.Marker, group: string) => void;
    removeFromMarkerGroup: (marker: H.map.Marker, group: string) => void;
}
export declare const HEREMap: React.ForwardRefExoticComponent<HEREMapProps & React.RefAttributes<HEREMapRef>>;
export default HEREMap;
