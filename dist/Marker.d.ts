import React, { FC } from 'react';
import { EventHandlers } from './useEventHandlers';
export interface MarkerProps extends Omit<H.map.Marker.Options, 'data'>, EventHandlers {
    lat: number;
    lng: number;
    /**
     * Either an image URL or an SVG markup.
     */
    bitmap?: string;
    data?: unknown;
    draggable?: boolean;
    /**
     * Passing children in this way has performance implications
     * since the 3.1 version of the API and should be avoided.
     * If performance is important, use `bitmap` prop instead.
     */
    children?: React.ReactElement<any>;
    group?: string;
    anchor?: H.math.IPoint;
}
/**
 * A "normal" marker that uses a static image as an icon.
 * large numbers of markers of this type can be added to the map
 * very quickly and efficiently.
 */
export declare const Marker: FC<MarkerProps>;
export default Marker;
