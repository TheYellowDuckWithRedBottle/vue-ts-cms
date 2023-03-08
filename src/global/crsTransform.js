import proj4 from 'proj4'
function tranform(fromProjection, toProjection,point){
  return proj4(fromProjection,toProjection,point)
}
function getScaleByResolution(resolution,dpi) {
  dpi = dpi?dpi:96
  return 1 / ((dpi/0.00254) *resolution)
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getResolutionByScale(scale,dpi){
  dpi = dpi?dpi:96
  return 0.0254/(scale * dpi)
}
export  {
  tranform,
  getScaleByResolution,
  getResolutionByScale
}
