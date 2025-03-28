"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLegacyRasterLayers = exports.getLayers = void 0;
var react_1 = require("react");
var languages_1 = require("./utils/languages");
var getLayers = function (apiKey, language, hidpi) {
    var lang = (0, languages_1.getTileLanguage)(language);
    var ppi = hidpi ? 200 : 100;
    var format = 'png8';
    var getTrafficOverlayProvider = function () {
        return {
            getURL: function (col, row, level) {
                return "https://traffic.maps.hereapi.com/v3/flow/mc/".concat(level, "/").concat(col, "/").concat(row, "/").concat(format, "?apiKey=").concat(apiKey, "&ppi=").concat(ppi);
            },
        };
    };
    var getTrafficBaseProvider = function () {
        return {
            getURL: function (col, row, level) {
                var style = 'lite.day';
                return "https://maps.hereapi.com/v3/base/mc/".concat(level, "/").concat(col, "/").concat(row, "/").concat(format, "?apiKey=").concat(apiKey, "&lang=").concat(lang, "&ppi=").concat(ppi, "&style=").concat(style);
            },
        };
    };
    var getTruckLayerProviderLegacy = function (enableCongestion) {
        return {
            max: 20,
            min: 8,
            getURL: function (col, row, level) {
                return ['https://',
                    '1.base.maps.ls.hereapi.com/maptile/2.1/truckonlytile/newest/normal.day/',
                    level,
                    '/',
                    col,
                    '/',
                    row,
                    '/256/png8',
                    '?style=fleet',
                    '&apiKey=',
                    apiKey,
                    enableCongestion ? '&congestion' : '',
                    '&lg=',
                    lang,
                    '&ppi=',
                    hidpi ? '320' : '72',
                ].join('');
            },
        };
    };
    var truckOverlayProvider = new H.map.provider.ImageTileProvider(getTruckLayerProviderLegacy(false));
    var truckOverlayCongestionProvider = new H.map.provider.ImageTileProvider(getTruckLayerProviderLegacy(true));
    var trafficOverlayProvider = new H.map.provider.ImageTileProvider(getTrafficOverlayProvider());
    var trafficBaseProvider = new H.map.provider.ImageTileProvider(getTrafficBaseProvider());
    return {
        trafficBaseLayer: new H.map.layer.TileLayer(trafficBaseProvider),
        trafficOverlayLayer: new H.map.layer.TileLayer(trafficOverlayProvider),
        truckCongestionLayer: new H.map.layer.TileLayer(truckOverlayCongestionProvider),
        truckOverlayLayer: new H.map.layer.TileLayer(truckOverlayProvider),
    };
};
exports.getLayers = getLayers;
var useLegacyRasterLayers = function (_a) {
    var map = _a.map, useSatellite = _a.useSatellite, trafficLayer = _a.trafficLayer, congestion = _a.congestion, truckRestrictions = _a.truckRestrictions, defaultLayers = _a.defaultLayers, apiKey = _a.apiKey, language = _a.language, hidpi = _a.hidpi, enableRasterLayers = _a.enableRasterLayers;
    var layers = (0, react_1.useMemo)(function () { return map && (0, exports.getLayers)(apiKey, language, hidpi); }, [apiKey, language, hidpi, map]);
    (0, react_1.useEffect)(function () {
        if (map && layers && enableRasterLayers && defaultLayers) {
            var satelliteBaseLayer = defaultLayers === null || defaultLayers === void 0 ? void 0 : defaultLayers.raster.satellite.map;
            var emptyBaseLayer = defaultLayers === null || defaultLayers === void 0 ? void 0 : defaultLayers.raster.normal.map;
            var baseLayer = useSatellite
                ? satelliteBaseLayer
                : trafficLayer
                    ? layers.trafficBaseLayer
                    : emptyBaseLayer;
            map.setBaseLayer(baseLayer);
        }
    }, [map, useSatellite, defaultLayers, trafficLayer, enableRasterLayers, layers]);
    (0, react_1.useEffect)(function () {
        if (map && layers && enableRasterLayers) {
            if (truckRestrictions) {
                if (congestion) {
                    map.removeLayer(layers.truckOverlayLayer);
                    map.addLayer(layers.truckCongestionLayer);
                }
                else {
                    map.removeLayer(layers.truckCongestionLayer);
                    map.addLayer(layers.truckOverlayLayer);
                }
            }
            else {
                map.removeLayer(layers.truckCongestionLayer);
                map.removeLayer(layers.truckOverlayLayer);
            }
        }
    }, [truckRestrictions, congestion, map, enableRasterLayers, layers]);
    (0, react_1.useEffect)(function () {
        if (map && layers && enableRasterLayers) {
            if (trafficLayer) {
                map.addLayer(layers.trafficOverlayLayer);
            }
            else {
                map.removeLayer(layers.trafficOverlayLayer);
            }
        }
    }, [trafficLayer, map, enableRasterLayers, layers]);
};
exports.useLegacyRasterLayers = useLegacyRasterLayers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlTGVnYWN5UmFzdGVyTGF5ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VzZUxlZ2FjeVJhc3RlckxheWVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBMEM7QUFHMUMsK0NBQW1EO0FBZ0I1QyxJQUFNLFNBQVMsR0FBRyxVQUN2QixNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsS0FBZTtJQUVmLElBQU0sSUFBSSxHQUFHLElBQUEsMkJBQWUsRUFBQyxRQUFRLENBQUMsQ0FBQTtJQUN0QyxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO0lBQzdCLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUVyQixJQUFNLHlCQUF5QixHQUFHO1FBQ2hDLE9BQU87WUFDTCxNQUFNLFlBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLO2dCQUNyQixPQUFPLHNEQUErQyxLQUFLLGNBQUksR0FBRyxjQUFJLEdBQUcsY0FBSSxNQUFNLHFCQUFXLE1BQU0sa0JBQVEsR0FBRyxDQUFFLENBQUE7WUFDbkgsQ0FBQztTQUNGLENBQUE7SUFDSCxDQUFDLENBQUE7SUFDRCxJQUFNLHNCQUFzQixHQUFHO1FBQzdCLE9BQU87WUFDTCxNQUFNLFlBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLO2dCQUNyQixJQUFNLEtBQUssR0FBRyxVQUFVLENBQUE7Z0JBQ3hCLE9BQU8sOENBQXVDLEtBQUssY0FBSSxHQUFHLGNBQUksR0FBRyxjQUFJLE1BQU0scUJBQVcsTUFBTSxtQkFBUyxJQUFJLGtCQUFRLEdBQUcsb0JBQVUsS0FBSyxDQUFFLENBQUE7WUFDdkksQ0FBQztTQUNGLENBQUE7SUFDSCxDQUFDLENBQUE7SUFFRCxJQUFNLDJCQUEyQixHQUFHLFVBQUMsZ0JBQXlCO1FBQzVELE9BQU87WUFDTCxHQUFHLEVBQUUsRUFBRTtZQUNQLEdBQUcsRUFBRSxDQUFDO1lB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