"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icons = void 0;
/**
 * Map for image URL strings against H.map.Icon instances
 * @type {Map<string, ScriptState>}
 */
exports.Icons = new Map();
/**
 * Returns the Icon for the input bitmap URL string, ensuring that no more
 * than one Icon is created for each bitmap
 * @param bitmap {string} - The location of the bitmap to be used as an icon
 * Note: this can cause a memleak if used with dynamically generated bitmaps.
 */
function getMarkerIcon(bitmap, anchor) {
    if (!exports.Icons.has(bitmap)) {
        var icon = new H.map.Icon(bitmap, anchor ? { anchor: anchor } : undefined);
        exports.Icons.set(bitmap, icon);
    }
    return exports.Icons.get(bitmap);
}
exports.default = getMarkerIcon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LW1hcmtlci1pY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2dldC1tYXJrZXItaWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7O0dBR0c7QUFDVSxRQUFBLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBc0IsQ0FBQTtBQUVsRDs7Ozs7R0FLRztBQUNILFNBQXdCLGFBQWEsQ0FBRSxNQUFjLEVBQUUsTUFBc0I7SUFDM0UsSUFBSSxDQUFDLGFBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDdEIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3BFLGFBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0tBQ3hCO0lBRUQsT0FBTyxhQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzFCLENBQUM7QUFQRCxnQ0FPQyJ9