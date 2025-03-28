"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlatform = void 0;
require("../bundle");
var platform;
// return the current platform if there is one,
// otherwise open up a new platform
function getPlatform(platformOptions) {
    if (platform) {
        return platform;
    }
    platform = new H.service.Platform(platformOptions);
    return platform;
}
exports.getPlatform = getPlatform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXBsYXRmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2dldC1wbGF0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQkFBa0I7QUFFbEIsSUFBSSxRQUE0QixDQUFBO0FBRWhDLCtDQUErQztBQUMvQyxtQ0FBbUM7QUFDbkMsU0FBZ0IsV0FBVyxDQUFFLGVBQTJDO0lBQ3RFLElBQUksUUFBUSxFQUFFO1FBQ1osT0FBTyxRQUFRLENBQUE7S0FDaEI7SUFFRCxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUVsRCxPQUFPLFFBQVEsQ0FBQTtBQUNqQixDQUFDO0FBUkQsa0NBUUMifQ==