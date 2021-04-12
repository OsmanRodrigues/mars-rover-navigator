import { MoveResponse, MoveVariables } from "@model";
import axios from "axios";

const service = axios.create({
  baseURL: String(process.env.NEXT_PUBLIC_API_URL)
});

export enum ServiceName {
  move = "move"
}

export type RequestType = {
  [ServiceName.move]: {
    variables: MoveVariables;
    response: MoveResponse;
  };
};

export const api = {
  [ServiceName.move]: (
    body: RequestType[ServiceName.move]["variables"]
  ): Promise<RequestType[ServiceName.move]["response"]> =>
    service.post("move", body)
};
