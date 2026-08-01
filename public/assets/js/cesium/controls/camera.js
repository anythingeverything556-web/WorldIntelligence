var HEIGHTS=[40000000,20000000,10000000,5000000,2500000,1500000,750000,400000,200000,100000,50000,25000,15000,8000,4000,2000,1000,500,250,125,100];

export function setupCameraControls(viewer){
 if(!viewer)return;
 var ctrl=viewer.scene.screenSpaceCameraController;
 ctrl.minimumZoomDistance=100;
 ctrl.maximumZoomDistance=40000000;
 ctrl.rotateFactor=0.4;
 ctrl.zoomFactor=0.15;
  ctrl.inertiaSpin=0.5;
  ctrl.inertiaZoom=0.92;
  ctrl.inertiaTranslate=0.6;
 ctrl.enableTilt=true;
 ctrl.enableRotate=true;
 ctrl.enableZoom=true;
 ctrl.enableTranslate=true;
 var Cesium=window.Cesium;
 ctrl.zoomEventType=Cesium.CameraEventType.WHEEL;
 ctrl.tiltEventTypes=[Cesium.CameraEventType.RIGHT_DRAG];
 ctrl.rotateEventTypes=[Cesium.CameraEventType.LEFT_DRAG];
 viewer.camera.flyToDuration=2.0;
}

export function flyToLocation(viewer,lon,lat,height,duration){
 if(!viewer)return;
 duration=duration||1.5;
 var Cesium=window.Cesium;
 viewer.camera.flyTo({
 destination:Cesium.Cartesian3.fromDegrees(lon,lat,height||10000000),
 duration:duration
 });
}

export function zoomToHeight(zoom){
 return HEIGHTS[zoom]||10000000;
}

export function heightToZoom(height){
  for (var i = 0; i < HEIGHTS.length; i++) {
    if (height >= HEIGHTS[i]) return i;
  }
  return HEIGHTS.length - 1;
}
