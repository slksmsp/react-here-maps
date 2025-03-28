export interface Datapoint<T> {
    lat: number;
    lng: number;
    /**
     * Any generic data that can be stored in the datapoint.
     */
    data: T;
}
export interface ClusterProps<T> {
    /**
     * The datapoints that should be clustered. They should contain coordinates, a bitmap, and any generic type of data.
     * Note: a change in this array will force a reclustering of the entire cluster.
     */
    points: Array<Datapoint<T>>;
    /**
     * Clustering options used by HERE maps clustering provider.
     * Note: a change in these options will recreate the clustering provider.
     */
    clusteringOptions?: H.clustering.Provider.ClusteringOptions;
    /**
     * A function that should return the marker bitmap to be used for a specific set of cluster points.
     * Note: a change in this function will trigger a redraw for all the datapoints in the cluster.
     * So make sure to wrap it in a `useCallback` and only change its reference when necessary.
     */
    getBitmapForCluster: (points: T[]) => string;
    /**
     * A function that should return the marker bitmap for a single point.
     * Note: a change in this function will trigger a redraw for all the datapoints in the cluster.
     * So make sure to wrap it in a `useCallback` and only change its reference when necessary.
     */
    getBitmapForPoint: (point: T) => string;
    /**
     * A callback for when a cluster of points are clicked.
     */
    onClusterClick: (data: T[], e: H.mapevents.Event) => void;
    /**
     * A callback for when a single point in the cluster is clicked.
     */
    onPointClick: (data: T, e: H.mapevents.Event) => void;
}
export declare const defaultClusteringOptions: H.clustering.Provider.ClusteringOptions;
/**
 * A component that can automatically cluster a group of datapoints.
 */
export default function Cluster<T>({ points, clusteringOptions, getBitmapForCluster, getBitmapForPoint, onClusterClick, onPointClick, }: ClusterProps<T>): null;
