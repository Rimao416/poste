function isValue(chaine) {
  if (typeof (chaine === "string") || chaine instanceof String) {
    return chaine;
  } else {
    return "----------";
  }
}
// Charge les dix dernières années
function loadyears() {
  const mYyear = parseInt(new Date().getFullYear()) + 1;
  // const [yearMap,setYearMap]=useState([])
  let yearMap = [];
  for (let i = 11; i >= 0; i--) {
    yearMap.push(mYyear - i);
  }
  return yearMap;
}
function isUndefined(chaine){
  if(chaine===undefined){
    return true
  }
}


export default {
  isValue,
  loadyears,
  isUndefined
};


