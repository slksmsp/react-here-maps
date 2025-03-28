"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultClusteringOptions = void 0;
var react_1 = require("react");
var context_1 = require("./context");
var get_marker_icon_1 = __importDefault(require("./utils/get-marker-icon"));
exports.defaultClusteringOptions = {
    /**
     * Maximum radius of the neighborhood.
     */
    eps: 32,
    /**
     * Minimum weight of points required to form a cluster (default weight for a cluster point is 1).
     */
    minWeight: 2,
};
function createTheme(getBitmapForCluster, getBitmapForPoint) {
    return {
        getClusterPresentation: function (cluster) {
            var clusterPoints = [];
            cluster.forEachDataPoint(function (point) { return clusterPoints.push(point.getData()); });
            return new H.map.Marker(cluster.getPosition(), {
                data: clusterPoints,
                icon: (0, get_marker_icon_1.default)(getBitmapForCluster(clusterPoints)),
                max: cluster.getMaxZoom(),
                min: cluster.getMinZoom(),
            });
        },
        getNoisePresentation: function (point) {
            var data = point.getData();
            return new H.map.Marker(point.getPosition(), {
                data: data,
                icon: (0, get_marker_icon_1.default)(getBitmapForPoint(data)),
                min: point.getMinZoom(),
            });
        },
    };
}
function pointToDatapoint(point) {
    return new H.clustering.DataPoint(point.lat, point.lng, null, point.data);
}
/**
 * A component that can automatically cluster a group of datapoints.
 */
function Cluster(_a) {
    var points = _a.points, _b = _a.clusteringOptions, clusteringOptions = _b === void 0 ? exports.defaultClusteringOptions : _b, getBitmapForCluster = _a.getBitmapForCluster, getBitmapForPoint = _a.getBitmapForPoint, onClusterClick = _a.onClusterClick, onPointClick = _a.onPointClick;
    var map = (0, react_1.useContext)(context_1.HEREMapContext).map;
    var onClusterClickRef = (0, react_1.useRef)(onClusterClick);
    onClusterClickRef.current = onClusterClick;
    var onPointClickRef = (0, react_1.useRef)(onPointClick);
    onPointClickRef.current = onPointClick;
    var theme = (0, react_1.useMemo)(function () { return createTheme(getBitmapForCluster, getBitmapForPoint); }, [getBitmapForCluster, getBitmapForPoint]);
    var datapoints = (0, react_1.useMemo)(function () { return points.map(pointToDatapoint); }, [points]);
    var onClick = (0, react_1.useCallback)(function (evt) {
        var e = evt;
        var data = e.target.getData();
        if (Array.isArray(data)) {
            onClusterClickRef.current(data, e);
        }
        else {
            onPointClickRef.current(data, e);
        }
    }, []);
    var clusteredDataProvider = (0, react_1.useMemo)(function () {
        var provider = new H.clustering.Provider(datapoints, {
            clusteringOptions: clusteringOptions,
            theme: theme,
        });
        provider.addEventListener('tap', onClick);
        return provider;
    }, [clusteringOptions, onClick]);
    (0, react_1.useEffect)(function () {
        clusteredDataProvider.setTheme(theme);
    }, [theme, clusteredDataProvider]);
    (0, react_1.useEffect)(function () {
        clusteredDataProvider.setDataPoints(datapoints);
    }, [datapoints, clusteredDataProvider]);
    (0, react_1.useEffect)(function () {
        var layer = new H.map.layer.ObjectLayer(clusteredDataProvider);
        map === null || map === void 0 ? void 0 : map.addLayer(layer);
        return function () {
            map === null || map === void 0 ? void 0 : map.removeLayer(layer);
        };
    }, [map, clusteredDataProvider]);
    return null;
}
exports.default = Cluster;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2x1c3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9DbHVzdGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwrQkFBMkU7QUFFM0UscUNBQTBDO0FBQzFDLDRFQUFtRDtBQTRDdEMsUUFBQSx3QkFBd0IsR0FBNEM7SUFDL0U7O09BRUc7SUFDSCxHQUFHLEVBQUUsRUFBRTtJQUNQOztPQUVHO0lBQ0gsU0FBUyxFQUFFLENBQUM7Q0FDYixDQUFBO0FBRUQsU0FBUyxXQUFXLENBQ2xCLG1CQUE0QyxFQUM1QyxpQkFBdUM7SUFFdkMsT0FBTztRQUNMLHNCQUFzQixFQUFFLFVBQUMsT0FBTztZQUM5QixJQUFNLGFBQWEsR0FBUSxFQUFFLENBQUE7WUFDN0IsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFBO1lBQ3hFLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQzdDLElBQUksRUFBRSxhQUFhO2dCQUNuQixJQUFJLEVBQUUsSUFBQSx5QkFBYSxFQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN2RCxHQUFHLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDekIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQUU7YUFDMUIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELG9CQUFvQixFQUFFLFVBQUMsS0FBSztZQUMxQixJQUFNLElBQUksR0FBTSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDL0IsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxNQUFBO2dCQUNKLElBQUksRUFB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