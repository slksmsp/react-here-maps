import { FC } from 'react';
import { EventHandlers } from './useEventHandlers';
export interface PolylineProps extends EventHandlers {
    points?: H.geo.IPoint[];
    data?: object;
    zIndex?: number;
    style?: H.map.SpatialStyle.Options;
    /**
     * Sets the arrows style when the P2D engine is in use.
     * @deprecated This is no longer supported in the newer map engines.
     */
    arrows?: H.map.ArrowStyle.Options;
    draggable?: boolean;
}
export declare const Polyline: FC<PolylineProps>;
export default Polyline;
