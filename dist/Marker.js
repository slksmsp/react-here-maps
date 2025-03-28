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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marker = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var ReactDOMServer = __importStar(require("react-dom/server"));
var context_1 = require("./context");
var useEventHandlers_1 = require("./useEventHandlers");
var get_dom_marker_icon_1 = __importDefault(require("./utils/get-dom-marker-icon"));
var get_marker_icon_1 = __importDefault(require("./utils/get-marker-icon"));
/**
 * A "normal" marker that uses a static image as an icon.
 * large numbers of markers of this type can be added to the map
 * very quickly and efficiently.
 */
var Marker = function (_a) {
    var children = _a.children, _b = _a.group, group = _b === void 0 ? 'default' : _b, bitmap = _a.bitmap, data = _a.data, _c = _a.draggable, draggable = _c === void 0 ? false : _c, lat = _a.lat, lng = _a.lng, anchor = _a.anchor, onTap = _a.onTap, onPointerEnter = _a.onPointerEnter, onPointerLeave = _a.onPointerLeave, onPointerMove = _a.onPointerMove, onDrag = _a.onDrag, onDragEnd = _a.onDragEnd, onDragStart = _a.onDragStart, options = __rest(_a, ["children", "group", "bitmap", "data", "draggable", "lat", "lng", "anchor", "onTap", "onPointerEnter", "onPointerLeave", "onPointerMove", "onDrag", "onDragEnd", "onDragStart"]);
    var _d = (0, react_1.useContext)(context_1.HEREMapContext), map = _d.map, removeFromMarkerGroup = _d.removeFromMarkerGroup, addToMarkerGroup = _d.addToMarkerGroup;
    var _e = (0, react_1.useState)(null), marker = _e[0], setMarker = _e[1];
    var renderChildren = function () {
        if (!map) {
            throw new Error('Map has to be loaded before performing this action');
        }
        // if children are provided, we render the provided react
        // code to an html string
        var html = ReactDOMServer.renderToStaticMarkup(((0, jsx_runtime_1.jsx)("div", __assign({ className: "dom-marker" }, { children: children }))));
        // we then get a dom icon object from the wrapper method
        return (0, get_dom_marker_icon_1.default)(html);
    };
    var addMarkerToMap = function () {
        if (!map) {
            throw new Error('Map has to be loaded before performing this action');
        }
        var newMarker = null;
        if (react_1.default.Children.count(children) > 0) {
            var icon = renderChildren();
            newMarker = new H.map.DomMarker({ lat: lat, lng: lng }, { icon: icon, data: null });
        }
        else if (bitmap) {
            // if we have an image url or an svg markup and no react children, create a
            // regular icon instance
            var icon = (0, get_marker_icon_1.default)(bitmap, anchor);
            // then create a normal marker instance and attach it to the map
            newMarker = new H.map.Marker({ lat: lat, lng: lng }, __assign({ icon: icon, volatility: draggable, data: null }, options));
        }
        else {
            // create a default marker at the provided location
            newMarker = new H.map.Marker({ lat: lat, lng: lng });
        }
        newMarker.draggable = draggable;
        newMarker.setData(data);
        addToMarkerGroup(newMarker, group);
        setMarker(newMarker);
        return newMarker;
    };
    (0, useEventHandlers_1.useEventHandlers)(marker, {
        onDrag: onDrag,
        onDragEnd: onDragEnd,
        onDragStart: onDragStart,
        onPointerEnter: onPointerEnter,
        onPointerLeave: onPointerLeave,
        onPointerMove: onPointerMove,
        onTap: onTap,
    });
    (0, react_1.useEffect)(function () {
        var addedMarker = addMarkerToMap();
        return function () {
            removeFromMarkerGroup(addedMarker, group);
        };
    }, [group]);
    (0, react_1.useEffect)(function () {
        if (marker) {
            marker.draggable = draggable;
            marker.setVolatility(draggable);
        }
    }, [marker, draggable]);
    (0, react_1.useEffect)(function () {
        marker === null || marker === void 0 ? void 0 : marker.setGeometry({
            lat: lat,
            lng: lng,
        });
    }, [marker, lat, lng]);
    (0, react_1.useEffect)(function () {
        marker === null || marker === void 0 ? void 0 : marker.setData(data);
    }, [marker, data]);
    (0, react_1.useEffect)(function () {
        if (bitmap) {
            marker === null || marker === void 0 ? void 0 : marker.setIcon((0, get_marker_icon_1.default)(bitmap, anchor));
        }
    }, [marker, bitmap, anchor]);
    (0, react_1.useEffect)(function () {
        if (react_1.default.Children.count(children)) {
            var icon = renderChildren();
            marker === null || marker === void 0 ? void 0 : marker.setIcon(icon);
        }
    }, [marker, children === null || children === void 0 ? void 0 : children.props]);
    return null;
};
exports.Marker = Marker;
exports.default = exports.Marker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01hcmtlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUFrRTtBQUNsRSwrREFBa0Q7QUFFbEQscUNBQThEO0FBQzlELHVEQUFvRTtBQUNwRSxvRkFBMEQ7QUFDMUQsNEVBQW1EO0FBcUJuRDs7OztHQUlHO0FBQ0ksSUFBTSxNQUFNLEdBQW9CLFVBQUMsRUFpQnZDO0lBaEJDLElBQUEsUUFBUSxjQUFBLEVBQ1IsYUFBaUIsRUFBakIsS0FBSyxtQkFBRyxTQUFTLEtBQUEsRUFDakIsTUFBTSxZQUFBLEVBQ04sSUFBSSxVQUFBLEVBQ0osaUJBQWlCLEVBQWpCLFNBQVMsbUJBQUcsS0FBSyxLQUFBLEVBQ2pCLEdBQUcsU0FBQSxFQUNILEdBQUcsU0FBQSxFQUNILE1BQU0sWUFBQSxFQUNOLEtBQUssV0FBQSxFQUNMLGNBQWMsb0JBQUEsRUFDZCxjQUFjLG9CQUFBLEVBQ2QsYUFBYSxtQkFBQSxFQUNiLE1BQU0sWUFBQSxFQUNOLFNBQVMsZUFBQSxFQUNULFdBQVcsaUJBQUEsRUFDUixPQUFPLGNBaEI0QixnTEFpQnZDLENBRFc7SUFFSixJQUFBLEtBQW1ELElBQUEsa0JBQVUsRUFBcUIsd0JBQWMsQ0FBQyxFQUEvRixHQUFHLFNBQUEsRUFBRSxxQkFBcUIsMkJBQUEsRUFBRSxnQkFBZ0Isc0JBQW1ELENBQUE7SUFFakcsSUFBQSxLQUFzQixJQUFBLGdCQUFRLEVBQXdDLElBQUksQ0FBQyxFQUExRSxNQUFNLFFBQUEsRUFBRSxTQUFTLFFBQXlELENBQUE7SUFFakYsSUFBTSxjQUFjLEdBQUc7UUFDckIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQTtTQUN0RTtRQUVELHlEQUF5RDtRQUN6RCx5QkFBeUI7UUFD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