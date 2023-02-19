import proj4 from 'proj4'
function tranform(fromProjection, toProjection,point){
  return proj4(fromProjection,toProjection,point)
}
export default tranform
