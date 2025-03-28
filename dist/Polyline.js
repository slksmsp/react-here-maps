"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polyline = void 0;
var react_1 = require("react");
var context_1 = require("./context");
var useEventHandlers_1 = require("./useEventHandlers");
var defaultMapStyles = {
    fillColor: 'blue',
    strokeColor: 'blue',
    lineWidth: 4,
};
var Polyline = function (_a) {
    var _b = _a.style, style = _b === void 0 ? defaultMapStyles : _b, arrows = _a.arrows, data = _a.data, zIndex = _a.zIndex, points = _a.points, onPointerMove = _a.onPointerMove, onPointerLeave = _a.onPointerLeave, onPointerEnter = _a.onPointerEnter, onDrag = _a.onDrag, onDragEnd = _a.onDragEnd, onDragStart = _a.onDragStart, onTap = _a.onTap, draggable = _a.draggable;
    var routesGroup = (0, react_1.useContext)(context_1.HEREMapContext).routesGroup;
    var _c = (0, react_1.useState)(null), polyline = _c[0], setPolyline = _c[1];
    var line = (0, react_1.useMemo)(function () {
        var shape = new H.geo.LineString();
        points.forEach(function (point) {
            var lat = point.lat, lng = point.lng;
            shape.pushPoint(new H.geo.Point(lat, lng));
        });
        return shape;
    }, [points]);
    (0, useEventHandlers_1.useEventHandlers)(polyline, {
        onDrag: onDrag,
        onDragEnd: onDragEnd,
        onDragStart: onDragStart,
        onPointerEnter: onPointerEnter,
        onPointerLeave: onPointerLeave,
        onPointerMove: onPointerMove,
        onTap: onTap,
    });
    (0, react_1.useEffect)(function () {
        if (polyline && typeof draggable === 'boolean') {
            polyline.draggable = draggable;
        }
    }, [polyline, draggable]);
    (0, react_1.useEffect)(function () {
        polyline === null || polyline === void 0 ? void 0 : polyline.setGeometry(line);
    }, [line]);
    (0, react_1.useEffect)(function () {
        polyline === null || polyline === void 0 ? void 0 : polyline.setData(data);
    }, [data]);
    (0, react_1.useEffect)(function () {
        polyline === null || polyline === void 0 ? void 0 : polyline.setZIndex(zIndex);
    }, [zIndex]);
    (0, react_1.useEffect)(function () {
        polyline === null || polyline === void 0 ? void 0 : polyline.setStyle(style);
    }, [style]);
    (0, react_1.useEffect)(function () {
        polyline === null || polyline === void 0 ? void 0 : polyline.setArrows(arrows);
    }, [arrows]);
    (0, react_1.useEffect)(function () {
        if (!routesGroup) {
            return;
        }
        var routeLine = new H.map.Polyline(line, { style: style, zIndex: zIndex, data: data, arrows: arrows });
        routesGroup.addObject(routeLine);
        setPolyline(routeLine);
        return function () {
            routesGroup.removeObject(routeLine);
        };
    }, [routesGroup]);
    return null;
};
exports.Polyline = Polyline;
exports.default = exports.Polyline;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9seWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUG9seWxpbmUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUFvRTtBQUVwRSxxQ0FBOEQ7QUFDOUQsdURBQW9FO0FBRXBFLElBQU0sZ0JBQWdCLEdBQStCO0lBQ25ELFNBQVMsRUFBRSxNQUFNO0lBQ2pCLFdBQVcsRUFBRSxNQUFNO0lBQ25CLFNBQVMsRUFBRSxDQUFDO0NBQ2IsQ0FBQTtBQWVNLElBQU0sUUFBUSxHQUFzQixVQUFDLEVBYzNDO1FBYkMsYUFBd0IsRUFBeEIsS0FBSyxtQkFBRyxnQkFBZ0IsS0FBQSxFQUN4QixNQUFNLFlBQUEsRUFDTixJQUFJLFVBQUEsRUFDSixNQUFNLFlBQUEsRUFDTixNQUFNLFlBQUEsRUFDTixhQUFhLG1CQUFBLEVBQ2IsY0FBYyxvQkFBQSxFQUNkLGNBQWMsb0JBQUEsRUFDZCxNQUFNLFlBQUEsRUFDTixTQUFTLGVBQUEsRUFDVCxXQUFXLGlCQUFBLEVBQ1gsS0FBSyxXQUFBLEVBQ0wsU0FBUyxlQUFBO0lBRUQsSUFBQSxXQUFXLEdBQUssSUFBQSxrQkFBVSxFQUFxQix3QkFBYyxDQUFDLFlBQW5ELENBQW1EO0lBQ2hFLElBQUEsS0FBMEIsSUFBQSxnQkFBUSxFQUFpQixJQUFJLENBQUMsRUFBdkQsUUFBUSxRQUFBLEVBQUUsV0FBVyxRQUFrQyxDQUFBO0lBRTlELElBQU0sSUFBSSxHQUFHLElBQUEsZUFBTyxFQUFDO1FBQ25CLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUNYLElBQUEsR0FBRyxHQUFVLEtBQUssSUFBZixFQUFFLEdBQUcsR0FBSyxLQUFLLElBQVYsQ0FBVTtZQUMxQixLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FB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