"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventHandlers = void 0;
var react_1 = require("react");
var useEventHandler = function (object, type, handler) {
    (0, react_1.useEffect)(function () {
        if (object && handler) {
            object.addEventListener(type, handler);
            return function () {
                object.removeEventListener(type, handler);
            };
        }
    }, [object, handler, type]);
};
var useEventHandlers = function (object, _a) {
    var onTap = _a.onTap, onPointerLeave = _a.onPointerLeave, onPointerMove = _a.onPointerMove, onPointerEnter = _a.onPointerEnter, onDragStart = _a.onDragStart, onDrag = _a.onDrag, onDragEnd = _a.onDragEnd;
    useEventHandler(object, 'tap', onTap);
    useEventHandler(object, 'pointerleave', onPointerLeave);
    useEventHandler(object, 'pointermove', onPointerMove);
    useEventHandler(object, 'pointerenter', onPointerEnter);
    useEventHandler(object, 'dragstart', onDragStart);
    useEventHandler(object, 'drag', onDrag);
    useEventHandler(object, 'dragend', onDragEnd);
};
exports.useEventHandlers = useEventHandlers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlRXZlbnRIYW5kbGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VFdmVudEhhbmRsZXJzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBaUM7QUFFakMsSUFBTSxlQUFlLEdBQUcsVUFBQyxNQUEwQixFQUFFLElBQVksRUFBRSxPQUF5QztJQUMxRyxJQUFBLGlCQUFTLEVBQUM7UUFDUixJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDckIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFtQyxDQUFDLENBQUE7WUFDbEUsT0FBTztnQkFDTCxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLE9BQW1DLENBQUMsQ0FBQTtZQUN2RSxDQUFDLENBQUE7U0FDRjtJQUNILENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUM3QixDQUFDLENBQUE7QUFZTSxJQUFNLGdCQUFnQixHQUFHLFVBQUMsTUFBMEIsRUFBRSxFQVE3QztRQVBkLEtBQUssV0FBQSxFQUNMLGNBQWMsb0JBQUEsRUFDZCxhQUFhLG1CQUFBLEVBQ2IsY0FBYyxvQkFBQSxFQUNkLFdBQVcsaUJBQUEsRUFDWCxNQUFNLFlBQUEsRUFDTixTQUFTLGVBQUE7SUFFVCxlQUFlLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNyQyxlQUFlLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUN2RCxlQUFlLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUNyRCxlQUFlLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUN2RCxlQUFlLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRCxlQUFlLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxlQUFlLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUMvQyxDQUFDLENBQUE7QUFoQlksUUFBQSxnQkFBZ0Isb0JBZ0I1QiJ9