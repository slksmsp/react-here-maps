"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomIcons = void 0;
/**
 * Map for HTML strings against H.map.DomIcon instances
 * @type {Map<string, ScriptState>}
 */
exports.DomIcons = new Map();
/**
 * Returns the DOM Icon for the input HTML string, ensuring that no more
 * than one DOM Icon is created for each HTML string
 * @param html {string} - A string containing the markup to be used as a Dom Icon.
 */
function getDomMarkerIcon(html) {
    if (!exports.DomIcons.has(html)) {
        var icon = new H.map.DomIcon(html);
        exports.DomIcons.set(html, icon);
    }
    return exports.DomIcons.get(html);
}
exports.default = getDomMarkerIcon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWRvbS1tYXJrZXItaWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9nZXQtZG9tLW1hcmtlci1pY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7R0FHRztBQUNVLFFBQUEsUUFBUSxHQUFHLElBQUksR0FBRyxFQUF5QixDQUFBO0FBRXhEOzs7O0dBSUc7QUFDSCxTQUF3QixnQkFBZ0IsQ0FBRSxJQUFZO0lBQ3BELElBQUksQ0FBQyxnQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3BDLGdCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtLQUN6QjtJQUVELE9BQU8sZ0JBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDM0IsQ0FBQztBQVBELG1DQU9DIn0=