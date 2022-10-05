export interface User {
    id: string // Guid
    email: string
    firstName: string
    lastName: string
    displayName: string
}

export interface Users {
    [id: string]: User
}

export type UsersState = Readonly<Users>

export interface AADUser {
    id: string
    name: string
    firstName: string
    lastName: string
}
