const config = {
  mapInitParams: {
    ceneter:[23.14,113.3693],
    zoom:13
  },
  baseMaps: [
    {
      label:'osm街道图',
      Url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    },
    {
      label: 'ArcGIS影像图',
      Url: '/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    },
    {
      label: "ArcGIS街道图",
      Url: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}"
    },
    {
      label: "天地图街道图",
      Url:"http://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=7786923a385369346d56b966bb6ad62f"
    },
    {
      label: "天地图影像图",
      Url:"http://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=7786923a385369346d56b966bb6ad62f"
    },
    {
      label: "谷歌街道图",
      Url:"http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
    },
  ]
}
export default config
