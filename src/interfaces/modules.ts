import { ReactElement } from 'react'

export interface HomePage {
    key: string
    name: string
    link: string
    icon: ReactElement
}

export interface PageGroup {
    key: string
    name: string
    icon: ReactElement
}

export interface Page {
    key: string
    // parent: string
    name: string
    link: string
    icon: ReactElement
    // permissions: string[]
}
