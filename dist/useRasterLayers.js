"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRasterLayers = void 0;
var react_1 = require("react");
var get_platform_1 = require("./utils/get-platform");
var languages_1 = require("./utils/languages");
var getBaseLayer = function (_a) {
    var apiKey = _a.apiKey, language = _a.language, congestion = _a.congestion, trafficLayer = _a.trafficLayer, hidpi = _a.hidpi;
    var lang = (0, languages_1.getTileLanguage)(language);
    var platform = (0, get_platform_1.getPlatform)({
        apikey: apiKey,
    });
    var service = platform.getRasterTileService({
        queryParams: __assign({ lang: lang, scale: hidpi ? 2 : 1, style: trafficLayer ? 'lite.day' : 'logistics.day' }, (congestion
            ? {
                features: 'environmental_zones:all,congestion_zones:all',
            }
            : {})),
    });
    var provider = new H.service.rasterTile.Provider(service, { engineType: H.Map.EngineType.HARP, tileSize: hidpi ? 512 : 256 });
    return new H.map.layer.TileLayer(provider);
};
var getTruckOverlayLayer = function (_a) {
    var apiKey = _a.apiKey, language = _a.language, hidpi = _a.hidpi, showActiveAndInactiveTruckRestrictions = _a.showActiveAndInactiveTruckRestrictions;
    var lang = (0, languages_1.getTileLanguage)(language);
    var platform = (0, get_platform_1.getPlatform)({
        apikey: apiKey,
    });
    var truckOnlyTileService = platform.getRasterTileService({
        resource: 'blank',
        queryParams: {
            features: "vehicle_restrictions:".concat(showActiveAndInactiveTruckRestrictions ? 'active_and_inactive' : 'permanent_only'),
            style: 'logistics.day',
            lang: lang,
            scale: hidpi ? 2 : 1,
        },
    });
    var truckOverlayProvider = new H.service.rasterTile.Provider(truckOnlyTileService, { engineType: H.Map.EngineType.HARP, tileSize: hidpi ? 512 : 256 });
    return new H.map.layer.TileLayer(truckOverlayProvider);
};
var useRasterLayers = function (_a) {
    var map = _a.map, useSatellite = _a.useSatellite, trafficLayer = _a.trafficLayer, congestion = _a.congestion, truckRestrictions = _a.truckRestrictions, defaultLayers = _a.defaultLayers, apiKey = _a.apiKey, language = _a.language, enableRasterLayers = _a.enableRasterLayers, showActiveAndInactiveTruckRestrictions = _a.showActiveAndInactiveTruckRestrictions, hidpi = _a.hidpi;
    var truckOverlayLayer = (0, react_1.useMemo)(function () { return map && getTruckOverlayLayer({
        apiKey: apiKey,
        language: language,
        showActiveAndInactiveTruckRestrictions: showActiveAndInactiveTruckRestrictions,
        hidpi: hidpi,
    }); }, [apiKey, showActiveAndInactiveTruckRestrictions, language, hidpi, map]);
    var baseLayer = (0, react_1.useMemo)(function () { return map && getBaseLayer({
        apiKey: apiKey,
        language: language,
        congestion: congestion,
        trafficLayer: trafficLayer,
        hidpi: hidpi,
    }); }, [apiKey, language, congestion, trafficLayer, hidpi, map]);
    (0, react_1.useEffect)(function () {
        if (!map || !defaultLayers || !baseLayer || !enableRasterLayers) {
            return;
        }
        var satelliteBaseLayer = defaultLayers === null || defaultLayers === void 0 ? void 0 : defaultLayers.raster.satellite.map;
        map.setBaseLayer(useSatellite ? satelliteBaseLayer : baseLayer);
    }, [map, useSatellite, defaultLayers, baseLayer, enableRasterLayers]);
    (0, react_1.useEffect)(function () {
        if (!map || !enableRasterLayers || !truckOverlayLayer) {
            return;
        }
        if (truckRestrictions) {
            map.addLayer(truckOverlayLayer);
        }
        return function () {
            map.removeLayer(truckOverlayLayer);
        };
    }, [truckRestrictions, map, enableRasterLayers, truckOverlayLayer]);
    (0, react_1.useEffect)(function () {
        if (!map || !defaultLayers || !enableRasterLayers) {
            return;
        }
        if (trafficLayer) {
            map.addLayer(defaultLayers.vector.traffic.logistics);
        }
        return function () {
            map.removeLayer(defaultLayers.vector.traffic.logistics);
        };
    }, [trafficLayer, map, defaultLayers, enableRasterLayers]);
};
exports.useRasterLayers = useRasterLayers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlUmFzdGVyTGF5ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VzZVJhc3RlckxheWVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUEwQztBQUcxQyxxREFBa0Q7QUFDbEQsK0NBQW1EO0FBZ0JuRCxJQUFNLFlBQVksR0FBRyxVQUFDLEVBTXdFO1FBTDVGLE1BQU0sWUFBQSxFQUNOLFFBQVEsY0FBQSxFQUNSLFVBQVUsZ0JBQUEsRUFDVixZQUFZLGtCQUFBLEVBQ1osS0FBSyxXQUFBO0lBRUwsSUFBTSxJQUFJLEdBQUcsSUFBQSwyQkFBZSxFQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRXRDLElBQU0sUUFBUSxHQUFHLElBQUEsMEJBQVcsRUFBQztRQUMzQixNQUFNLEVBQUUsTUFBTTtLQUNmLENBQUMsQ0FBQTtJQUVGLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztRQUM1QyxXQUFXLGFBQ1QsSUFBSSxNQUFBLEVBQ0osS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3BCLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsZUFBZSxJQUMvQyxDQUFDLFVBQVU7WUFDWixDQUFDLENBQUM7Z0JBQ0EsUUFBUSxFQUFFLDhDQUE4QzthQUN6RDtZQUNELENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FDUjtLQUNGLENBQUMsQ0FBQTtJQUVGLElBQU0sUUFBUSxHQUNaLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFB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