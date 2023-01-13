import { create } from 'zustand';
import { Vector3 } from 'three';

const INITIAL_CAMERA_POSITION = [0, 90, 0];
const INITIAL_CAMERA_LOOK_AT = [0, 0, 0];

export default create((set) => ({
  initialCameraPosition: INITIAL_CAMERA_POSITION,
  initialCameraPositionVector: new Vector3(
    INITIAL_CAMERA_POSITION[0],
    INITIAL_CAMERA_POSITION[1],
    INITIAL_CAMERA_POSITION[2],
  ),
  cameraLookAt: new Vector3(
    INITIAL_CAMERA_LOOK_AT[0],
    INITIAL_CAMERA_LOOK_AT[1],
    INITIAL_CAMERA_LOOK_AT[2],
  ),
}));
