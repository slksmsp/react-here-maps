import { debounce, uniqueId } from "lodash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";

import HMapMethods from "./mixins/h-map-methods";
import cache, { onAllLoad } from "./utils/cache";
import getLink from "./utils/get-link";
import getPlatform from "./utils/get-platform";
import getScriptMap from "./utils/get-script-map";
import { Options } from "jsdom";

// declare an interface containing the required and potential
// props that can be passed to the HEREMap component
export interface HEREMapProps extends H.Map.Options {
  appId: string;
  appCode: string;
  animateCenter?: boolean;
  animateZoom?: boolean;
  hidpi?: boolean;
  interactive?: boolean;
  secure?: boolean;
  routes?: object[];
  transportData?: boolean;
}

// declare an interface containing the potential state flags
export interface HEREMapState {
  map?: H.Map;
  behavior?: H.mapevents.Behavior;
  ui?: H.ui.UI;
  markersGroup?: H.map.Group;
  routesGroup?: H.map.Group;
}

// declare an interface containing the context to be passed through the heirarchy
export interface HEREMapChildContext {
  map: H.Map;
}

// export the HEREMap React Component from this module
@HMapMethods
export class HEREMap
  extends React.Component<HEREMapProps, HEREMapState>
  implements React.ChildContextProvider<HEREMapChildContext> {
  public static childContextTypes = {
    map: PropTypes.object,
    markersGroup: PropTypes.object,
    routesGroup: PropTypes.object,
  };

  // add typedefs for the HMapMethods mixin
  public getElement: () => Element;
  public getMap: () => H.Map;
  public setCenter: (point: H.geo.IPoint) => void;
  public setZoom: (zoom: number) => void;

  // add the state property
  public state: HEREMapState = {};

  private debouncedResizeMap: any;
  public truckOverlayLayer: H.map.layer.TileLayer;
  constructor(props: HEREMapProps, context: object) {
    super(props, context);

    // bind all event handling methods to this
    this.resizeMap = this.resizeMap.bind(this);

    // debounce the resize map method
    this.debouncedResizeMap = debounce(this.resizeMap, 200);
    this.zoomOnMarkers = this.zoomOnMarkers.bind(this)
    this.screenToGeo = this.screenToGeo.bind(this)
  }
  public screenToGeo (x:number, y:number):H.geo.Point {
    const { map } = this.state
    return map.screenToGeo(x,y)
  }
  public zoomOnMarkers() {
    const { map, markersGroup } = this.state;
    const viewBounds = markersGroup.getBounds();
    if (viewBounds) map.setViewBounds(viewBounds);
  }
  public getChildContext() {
    const {map, markersGroup, routesGroup} = this.state;
    return {map, markersGroup, routesGroup};
  }

  public componentDidMount() {
    onAllLoad(() => {
      const {
        appId,
        appCode,
        center,
        hidpi,
        interactive,
        secure,
        zoom,
        routes,
      } = this.props;

      // get the platform to base the maps on
      const platform = getPlatform({
        app_code: appCode,
        app_id: appId,
        useHTTPS: secure === true,
      });

      const defaultLayers = platform.createDefaultLayers({
        ppi: hidpi ? 320 : 72,
      });
      const truckOverlayLayerOptions = {
        label: 'Tile Info Overlay',
        descr: "",
        min: 8,
        max: 20,
        getURL: function( col, row, level )
        {
          return ["https://",
          "1.base.maps.cit.api.here.com/maptile/2.1/truckonlytile/newest/normal.day/",
          level,
          "/",
          col,
          "/",
          row,
          "/256/png8",
          "?style=fleet",
          "&app_code=",
          appCode,
          "&app_id=",
          appId
          ].join("");
        }
      } as H.map.provider.ImageTileProvider.Options; 
      const truckOverlayProvider = new H.map.provider.ImageTileProvider(truckOverlayLayerOptions);
    
      this.truckOverlayLayer = new H.map.layer.TileLayer(truckOverlayProvider);
      const hereMapEl = ReactDOM.findDOMNode(this);

      const map = new H.Map(
        hereMapEl.querySelector(".map-container"),
        defaultLayers.normal.map,
        {
          center,
          pixelRatio: hidpi ? 2 : 1,
          zoom,
        },
      );
      const markersGroup = new H.map.Group();
      const routesGroup = new H.map.Group();
      map.addObject(markersGroup)
      map.addObject(routesGroup)
      if(this.props.transportData) map.addLayer(this.truckOverlayLayer)
      if (interactive !== false) {
        // make the map interactive
        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // create the default UI for the map
        const ui = H.ui.UI.createDefault(map, defaultLayers);

        this.setState({
          behavior,
          ui,
        });
      }
      
      // make the map resize when the window gets resized
      window.addEventListener("resize", this.debouncedResizeMap);

      // attach the map object to the component"s state
      this.setState({ map, markersGroup, routesGroup });
    });
  }
  public componentWillReceiveProps(nextProps: HEREMapProps) {
    if (this.props.transportData !== nextProps.transportData) {
      if(nextProps.transportData) {
        this.getMap().addLayer(this.truckOverlayLayer)
      }
      else {
        this.getMap().removeLayer(this.truckOverlayLayer)
      }
    }
  }
  public componentWillMount() {
    const {
      secure,
    } = this.props;
    cache(getScriptMap(secure === true));
    const stylesheetUrl = `${secure === true ? "https:" : ""}//js.api.here.com/v3/3.0/mapsjs-ui.css`;
    getLink(stylesheetUrl, "HERE Maps UI");
  }

  public componentWillUnmount() {
    // make the map resize when the window gets resized
    window.removeEventListener("resize", this.debouncedResizeMap);
  }

  public render() {
    const { children } = this.props;
    return (
      <div className="heremap" style={{height: "100%"}}>
        <div
          className="map-container"
          id={`map-container-${uniqueId()}`}
          style={{height: "100%"}}
        >
          {children}
        </div>
      </div>
    );
  }

  private resizeMap() {
    const {
      map,
    } = this.state;

    if (map) {
      map.getViewPort().resize();
    }
  }
}

// make the HEREMap component the default export
export default HEREMap;
