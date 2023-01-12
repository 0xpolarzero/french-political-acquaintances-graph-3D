import { create } from 'zustand';
import { Vector3 } from 'three';

const INITIAL_CAMERA_POSITION = [0, 70, 20];

export default create((set) => ({
  initialCameraPosition: INITIAL_CAMERA_POSITION,
  initialCameraPositionVector: new Vector3(
    INITIAL_CAMERA_POSITION[0],
    INITIAL_CAMERA_POSITION[1],
    INITIAL_CAMERA_POSITION[2],
  ),
}));
