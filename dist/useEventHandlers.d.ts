export interface EventHandlers {
    onPointerMove?: (evt: H.mapevents.Event) => void;
    onPointerLeave?: (evt: H.mapevents.Event) => void;
    onPointerEnter?: (evt: H.mapevents.Event) => void;
    onDragStart?: (evt: H.mapevents.Event) => void;
    onDrag?: (evt: H.mapevents.Event) => void;
    onDragEnd?: (evt: H.mapevents.Event) => void;
    onTap?: (evt: H.mapevents.Event) => void;
}
export declare const useEventHandlers: (object: H.util.EventTarget, { onTap, onPointerLeave, onPointerMove, onPointerEnter, onDragStart, onDrag, onDragEnd, }: EventHandlers) => void;
