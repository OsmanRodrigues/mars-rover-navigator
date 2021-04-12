import { MoveResponse, MoveVariables } from "@model";
import axios from "axios";

const service = axios.create({
  baseURL: String(process.env.NEXT_PUBLIC_API_URL)
});

export const api = {
  move: (body: MoveVariables): Promise<MoveResponse> =>
    service.post("move", body)
};
