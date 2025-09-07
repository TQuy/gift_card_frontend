import { UserResponse } from "~/api/types";

export interface StateStore {
  user: UserResponse | null
}

export type StateType = () => StateStore