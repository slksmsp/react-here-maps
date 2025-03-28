/**
 * Map for image URL strings against H.map.Icon instances
 * @type {Map<string, ScriptState>}
 */
export declare const Icons: Map<string, H.map.Icon>;
/**
 * Returns the Icon for the input bitmap URL string, ensuring that no more
 * than one Icon is created for each bitmap
 * @param bitmap {string} - The location of the bitmap to be used as an icon
 * Note: this can cause a memleak if used with dynamically generated bitmaps.
 */
export default function getMarkerIcon(bitmap: string, anchor?: H.math.IPoint): H.map.Icon;
