import React from 'react'

interface PageRoute {
    key: string
    path: string
    pageComponent: any
    exact: boolean
    prod: boolean
}

const pageRoutes: PageRoute[] = [
    {
        key: 'HomePage',
        path: '/',
        pageComponent: React.lazy(() => import('./containers/HomePage')),
        exact: true,
        prod: true,
    },
    {
        key: 'AddGamePage',
        path: `/add/`,
        pageComponent: React.lazy(() => import('./containers/AddGamePage')
        ),
        exact: false,
        prod: true,
    },
    // {
    //     key: 'PlayPage',
    //     path: `/play/:Id?`,
    //     pageComponent: React.lazy(() => import('./containers/HardwareManagementPage')
    //     ),
    //     exact: false,
    //     prod: true,
    // },
    {
        key: 'GameManagementPage',
        path: `/games/`,
        pageComponent: React.lazy(() => import('./containers/GameManagementPage')
        ),
        exact: true,
        prod: true,
    },
]

export default pageRoutes