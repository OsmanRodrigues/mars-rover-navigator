export interface MoveVariables {
  limitCoordinate: [number, number];
  roverInfos: [string, string];
}

export interface MoveResponse {
  data: { finalPosition: [number, number, string] };
}
