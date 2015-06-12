"use strict";

export function toArray(obj){
  return Array.prototype.splice.call(obj, 0);
}

export function getEnv(){
  if(typeof window === "object"){
    return "browser";
  }
  else{
    return "nodejs";
  }
}

export function eachWithIndex(arr, iter){
  if(!(arr instanceof Array)){ return; }
  if(typeof iter !== "function"){ return; }
  for(var i = 0; i < arr.length; i++){
    iter(i, arr[i]);
  }
}
