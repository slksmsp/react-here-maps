"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVectorLayers = void 0;
var react_1 = require("react");
var defaultLogisticsLayerFeatures = [
    {
        feature: 'road exit labels',
        mode: 'numbers only',
    },
    {
        feature: 'building extruded',
        mode: 'all',
    },
    {
        feature: 'building footprints',
        mode: 'all',
    },
];
var setFeatures = function (style, truckRestrictions, congestion) {
    style.setEnabledFeatures(__spreadArray(__spreadArray(__spreadArray([], defaultLogisticsLayerFeatures, true), (truckRestrictions ? [{ feature: 'vehicle restrictions' }] : []), true), (congestion
        ? [{ feature: 'congestion zones' }, { feature: 'environmental zones' }]
        : []), true));
};
var useVectorLayers = function (_a) {
    var map = _a.map, useSatellite = _a.useSatellite, trafficLayer = _a.trafficLayer, congestion = _a.congestion, truckRestrictions = _a.truckRestrictions, defaultLayers = _a.defaultLayers, enableVectorLayers = _a.enableVectorLayers;
    (0, react_1.useEffect)(function () {
        if (!map || !defaultLayers || !enableVectorLayers) {
            return;
        }
        [
            defaultLayers.vector.normal.logistics,
            defaultLayers.hybrid.logistics.vector,
        ].forEach(function (layer) {
            var style = layer.getProvider().getStyleInternal();
            if (style.getState() === H.map.render.Style.State.READY) {
                setFeatures(style, truckRestrictions, congestion);
                return;
            }
            var changeListener = function () {
                if (style.getState() === H.map.Style.State.READY) {
                    style.removeEventListener('change', changeListener);
                    setFeatures(style, truckRestrictions, congestion);
                }
            };
            style.addEventListener('change', changeListener);
        });
    }, [defaultLayers, map, enableVectorLayers, useSatellite, truckRestrictions, congestion]);
    (0, react_1.useEffect)(function () {
        if (!map || !defaultLayers || !enableVectorLayers) {
            return;
        }
        if (useSatellite) {
            map.setBaseLayer(defaultLayers.hybrid.logistics.raster);
            map.addLayer(defaultLayers.hybrid.logistics.vector);
        }
        return function () {
            map.removeLayer(defaultLayers.hybrid.logistics.vector);
            map.setBaseLayer(defaultLayers.vector.normal.logistics);
        };
    }, [defaultLayers, map, enableVectorLayers, useSatellite]);
    (0, react_1.useEffect)(function () {
        if (!map || !defaultLayers || !enableVectorLayers) {
            return;
        }
        if (trafficLayer) {
            map.addLayer(defaultLayers.vector.traffic.logistics);
        }
        return function () {
            map.removeLayer(defaultLayers.vector.traffic.logistics);
        };
    }, [trafficLayer, map, defaultLayers, enableVectorLayers]);
};
exports.useVectorLayers = useVectorLayers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlVmVjdG9yTGF5ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VzZVZlY3RvckxheWVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQkFBaUM7QUFjakMsSUFBTSw2QkFBNkIsR0FBRztJQUNwQztRQUNFLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsSUFBSSxFQUFFLGNBQWM7S0FDckI7SUFDRDtRQUNFLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsSUFBSSxFQUFFLEtBQUs7S0FDWjtJQUNEO1FBQ0UsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixJQUFJLEVBQUUsS0FBSztLQUNaO0NBQ0YsQ0FBQTtBQUVELElBQU0sV0FBVyxHQUFHLFVBQUMsS0FBOEIsRUFBRSxpQkFBMEIsRUFBRSxVQUFtQjtJQUNsRyxLQUFLLENBQUMsa0JBQWtCLCtDQUNuQiw2QkFBNkIsU0FDN0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUNoRSxDQUFDLFVBQVU7UUFDWixDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLENBQUM7UUFDdkUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUNQLENBQUE7QUFDSixDQUFDLENBQUE7QUFFTSxJQUFNLGVBQWUsR0FBRyxVQUFDLEVBUVQ7UUFQckIsR0FBRyxTQUFBLEVBQ0gsWUFBWSxrQkFBQSxFQUNaLFlBQVksa0JBQUEsRUFDWixVQUFVLGdCQUFBLEVBQ1YsaUJBQWlCLHVCQUFBLEVBQ2pCLGFBQWEsbUJBQUEsRUFDYixrQkFBa0Isd0JBQUE7SUFFbEIsSUFBQSxpQkFBUyxFQUFDO1FBQ1IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLGtCQUFrQixFQUFF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