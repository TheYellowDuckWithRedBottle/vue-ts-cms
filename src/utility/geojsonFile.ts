interface GeoJSONPoint {
  type: 'Point';
  coordinates: [number, number];
}

// 定义 GeoJSON 的坐标线
interface GeoJSONLineString {
  type: 'LineString';
  coordinates: [number, number][];
}

// 定义 GeoJSON 的坐标多边形
interface GeoJSONPolygon {
  type: 'Polygon',
  coordinates: [[number, number][]]
}

// 定义 GeoJSON 对象
interface GeoJSONObject {
  type: 'Feature',
  geometry: GeoJSONPoint | GeoJSONLineString | GeoJSONPolygon,
  properties: {
    [key: string]: any
  };
}

// 定义 GeoJSON 特征集合
interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONObject[];
}
// Define the GeoJSONUnionType as a union of the two types
type GeoJSONUnionType = GeoJSONFeatureCollection | GeoJSONObject;

// Export the interfaces and the union type
export {
  GeoJSONPoint,
  GeoJSONLineString,
  GeoJSONPolygon,
  GeoJSONObject,
  GeoJSONFeatureCollection,
  GeoJSONUnionType
};
