import { AADUser } from "./users";

export interface AuthStore {
  authenticated: boolean
  user: AADUser | null
}

export type AuthState = Readonly<AuthStore>