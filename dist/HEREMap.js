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
exports.HEREMap = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
require("./bundle");
var lodash_1 = require("lodash");
var react_1 = require("react");
var context_1 = require("./context");
var useLegacyRasterLayers_1 = require("./useLegacyRasterLayers");
var useRasterLayers_1 = require("./useRasterLayers");
var useVectorLayers_1 = require("./useVectorLayers");
var get_platform_1 = require("./utils/get-platform");
var languages_1 = require("./utils/languages");
exports.HEREMap = (0, react_1.forwardRef)(function (_a, ref) {
    var children = _a.children, center = _a.center, hidpi = _a.hidpi, _b = _a.interactive, interactive = _b === void 0 ? true : _b, zoom = _a.zoom, useSatellite = _a.useSatellite, trafficLayer = _a.trafficLayer, onMapAvailable = _a.onMapAvailable, disableMapSettings = _a.disableMapSettings, _c = _a.language, language = _c === void 0 ? 'en' : _c, congestion = _a.congestion, truckRestrictions = _a.truckRestrictions, showActiveAndInactiveTruckRestrictions = _a.showActiveAndInactiveTruckRestrictions, apiKey = _a.apiKey, animateZoom = _a.animateZoom, animateCenter = _a.animateCenter, useVectorTiles = _a.useVectorTiles, _d = _a.engineType, engineType = _d === void 0 ? H.Map.EngineType.HARP : _d;
    if (engineType === H.Map.EngineType.WEBGL) {
        throw new Error('WEBGL Engine is not supported.');
    }
    if (engineType !== H.Map.EngineType.HARP && useVectorTiles) {
        throw new Error('Vector tiles can only be used with the HARP engine.');
    }
    var uniqueIdRef = (0, react_1.useRef)((0, lodash_1.uniqueId)());
    var _e = (0, react_1.useState)(null), map = _e[0], setMap = _e[1];
    var _f = (0, react_1.useState)(null), routesGroup = _f[0], setRoutesGroup = _f[1];
    var markersGroupsRef = (0, react_1.useRef)({});
    var defaultLayersRef = (0, react_1.useRef)(null);
    (0, useVectorLayers_1.useVectorLayers)({
        congestion: congestion,
        defaultLayers: defaultLayersRef.current,
        map: map,
        trafficLayer: trafficLayer,
        truckRestrictions: truckRestrictions,
        useSatellite: useSatellite,
        enableVectorLayers: useVectorTiles,
    });
    (0, useRasterLayers_1.useRasterLayers)({
        apiKey: apiKey,
        congestion: congestion,
        defaultLayers: defaultLayersRef.current,
        language: language,
        map: map,
        trafficLayer: trafficLayer,
        truckRestrictions: truckRestrictions,
        showActiveAndInactiveTruckRestrictions: showActiveAndInactiveTruckRestrictions,
        useSatellite: useSatellite,
        enableRasterLayers: !useVectorTiles && engineType === H.Map.EngineType.HARP,
        hidpi: hidpi,
    });
    (0, useLegacyRasterLayers_1.useLegacyRasterLayers)({
        apiKey: apiKey,
        congestion: congestion,
        defaultLayers: defaultLayersRef.current,
        language: language,
        map: map,
        trafficLayer: trafficLayer,
        truckRestrictions: truckRestrictions,
        useSatellite: useSatellite,
        enableRasterLayers: !useVectorTiles && engineType === H.Map.EngineType.P2D,
        hidpi: hidpi,
    });
    var unmountedRef = (0, react_1.useRef)(false);
    var screenToGeo = function (x, y) {
        return map.screenToGeo(x, y);
    };
    var zoomOnMarkersGroup = function (markersGroup, animate) {
        if (animate === void 0) { animate = true; }
        var DISTANCE_FACTOR = 0.1;
        var BEARING_TOP_LEFT = 315;
        var BEARING_BOTTOM_RIGHT = 135;
        var boundingBox = markersGroup.getBoundingBox();
        var topLeft = boundingBox.getTopLeft();
        var bottomRight = boundingBox.getBottomRight();
        var distance = topLeft.distance(bottomRight) * DISTANCE_FACTOR;
        var viewBounds = H.geo.Rect.fromPoints(topLeft.walk(BEARING_TOP_LEFT, distance), bottomRight.walk(BEARING_BOTTOM_RIGHT, distance));
        if (viewBounds) {
            map.getViewModel().setLookAtData({ bounds: viewBounds }, animate, true);
        }
    };
    var zoomOnMarkers = function (animate, group) {
        if (animate === void 0) { animate = true; }
        if (group === void 0) { group = 'default'; }
        if (map) {
            if (!markersGroupsRef.current[group]) {
                return;
            }
            zoomOnMarkersGroup(markersGroupsRef.current[group], animate);
        }
    };
    var zoomOnMarkersSet = function (markersSet, animate) {
        if (animate === void 0) { animate = true; }
        var markersGroupSet = new H.map.Group();
        markersSet.map(function (m) { return markersGroupSet.addObject(m); });
        zoomOnMarkersGroup(markersGroupSet, animate);
    };
    var addToMarkerGroup = function (marker, group) {
        if (!markersGroupsRef.current[group]) {
            markersGroupsRef.current[group] = new H.map.Group();
            map.addObject(markersGroupsRef.current[group]);
        }
        markersGroupsRef.current[group].addObject(marker);
    };
    var removeFromMarkerGroup = function (marker, group) {
        if (markersGroupsRef.current[group]) {
            markersGroupsRef.current[group].removeObject(marker);
            if (markersGroupsRef.current[group].getObjects().length === 0) {
                if (map.getObjects().length > 0) {
                    map.removeObject(markersGroupsRef.current[group]);
                }
                markersGroupsRef.current[group] = null;
            }
        }
    };
    (0, react_1.useImperativeHandle)(ref, function () {
        return {
            addToMarkerGroup: addToMarkerGroup,
            getElement: function () { return document.querySelector("#map-container-".concat(uniqueIdRef.current)); },
            getMap: function () { return map; },
            removeFromMarkerGroup: removeFromMarkerGroup,
            screenToGeo: screenToGeo,
            setCenter: function (point) {
                map.setCenter(point, animateCenter);
            },
            setZoom: function (newZoom) {
                map.setZoom(newZoom, animateZoom);
            },
            zoomOnMarkers: zoomOnMarkers,
            zoomOnMarkersSet: zoomOnMarkersSet,
        };
    }, [map]);
    (0, react_1.useEffect)(function () {
        if (unmountedRef.current) {
            return;
        }
        // get the platform to base the maps on
        var platform = (0, get_platform_1.getPlatform)({
            apikey: apiKey,
        });
        var ppi = engineType === H.Map.EngineType.P2D
            ? hidpi ? 320 : 72
            : undefined;
        defaultLayersRef.current = platform.createDefaultLayers({
            lg: (0, languages_1.getTileLanguage)(language),
            engineType: engineType,
            ppi: ppi,
        });
        var hereMapEl = document.querySelector("#map-container-".concat(uniqueIdRef.current));
        var baseLayer = useVectorTiles
            ? defaultLayersRef.current.vector.normal.logistics
            : defaultLayersRef.current.raster.normal.map;
        var newMap = new H.Map(hereMapEl, baseLayer, {
            center: center,
            engineType: engineType,
            pixelRatio: hidpi ? 2 : 1,
            zoom: zoom,
        });
        var routesProvider = new H.map.provider.LocalObjectProvider();
        var routesLayer = new H.map.layer.ObjectLayer(routesProvider);
        newMap.addLayer(routesLayer);
        var ui;
        // make the map interactive
        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom
        var behavior = interactive ? new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap)) : undefined;
        if (behavior) {
            behavior.disable(H.mapevents.Behavior.Feature.FRACTIONAL_ZOOM);
            // create the default UI for the map
            ui = H.ui.UI.createDefault(newMap, defaultLayersRef.current, (0, languages_1.getUILanguage)(language));
            if (disableMapSettings) {
                ui.removeControl('mapsettings');
            }
        }
        setMap(newMap);
        setRoutesGroup(routesProvider.getRootGroup());
        onMapAvailable === null || onMapAvailable === void 0 ? void 0 : onMapAvailable({
            behavior: behavior,
            map: newMap,
            markersGroups: markersGroupsRef.current,
            routesGroup: routesProvider.getRootGroup(),
            trafficLayer: trafficLayer,
            ui: ui,
        });
        return function () {
            unmountedRef.current = true;
            map === null || map === void 0 ? void 0 : map.dispose();
        };
    }, []);
    (0, react_1.useEffect)(function () {
        if (map) {
            var resizeMap = function () {
                map.getViewPort().resize();
            };
            var debouncedResizeMap_1 = (0, lodash_1.debounce)(resizeMap, 200);
            // make the map resize when the window gets resized
            window.addEventListener('resize', debouncedResizeMap_1);
            return function () {
                window.removeEventListener('resize', debouncedResizeMap_1);
            };
        }
    }, [map]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "heremap", style: { height: '100%' } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "map-container", id: "map-container-".concat(uniqueIdRef.current), style: { height: '100%' } }, { children: map && (0, jsx_runtime_1.jsx)(context_1.HEREMapContext.Provider, __assign({ value: { map: map, routesGroup: routesGroup, removeFromMarkerGroup: removeFromMarkerGroup, addToMarkerGroup: addToMarkerGroup } }, { children: children })) })) })));
});
exports.default = exports.HEREMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSEVSRU1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9IRVJFTWFwLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBaUI7QUFFakIsaUNBQTJDO0FBQzNDLCtCQUEyRjtBQUUzRixxQ0FBMEM7QUFFMUMsaUVBQStEO0FBQy9ELHFEQUFtRDtBQUNuRCxxREFBbUQ7QUFDbkQscURBQWtEO0FBQ2xELCtDQUFrRTtBQWlFckQsUUFBQSxPQUFPLEdBQUcsSUFBQSxrQkFBVSxFQUEyQixVQUFDLEVBbUI1RCxFQUFFLEdBQUc7UUFsQkosUUFBUSxjQUFBLEVBQ1IsTUFBTSxZQUFBLEVBQ04sS0FBSyxXQUFBLEVBQ0wsbUJBQWtCLEVBQWxCLFdBQVcsbUJBQUcsSUFBSSxLQUFBLEVBQ2xCLElBQUksVUFBQSxFQUNKLFlBQVksa0JBQUEsRUFDWixZQUFZLGtCQUFBLEVBQ1osY0FBYyxvQkFBQSxFQUNkLGtCQUFrQix3QkFBQSxFQUNsQixnQkFBZSxFQUFmLFFBQVEsbUJBQUcsSUFBSSxLQUFBLEVBQ2YsVUFBVSxnQkFBQSxFQUNWLGlCQUFpQix1QkFBQSxFQUNqQixzQ0FBc0MsNENBQUEsRUFDdEMsTUFBTSxZQUFBLEVBQ04sV0FBVyxpQkFBQSxFQUNYLGFBQWEsbUJBQUEsRUFDYixjQUFjLG9CQUFBLEVBQ2Qsa0JBQWtDLEVBQWxDLFVBQVUsbUJBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFBO0lBRWxDLElBQUksVUFBVSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtRQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUE7S0FDbEQ7SUFFRCxJQUFJLFVBQVUsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksY0FBYyxFQUFFO1FBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFE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