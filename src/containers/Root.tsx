import React from 'react'
import { Route } from 'react-router-dom'
import Dashboard from '../components/dashboard/Dashboard'
import routes from '../routes'
import LoadingPage from './LoadingPage'

const Root = () => {
    return (
        <Dashboard>
            <React.Suspense fallback={<LoadingPage />}>
                {routes.map((route) => {
                    const Component = route.pageComponent
                    return (
                        <Route key={route.key} exact={route.exact} path={route.path}>
                            <Component />
                        </Route>
                    )
                })}
            </React.Suspense>
        </Dashboard>
    )
}

export default Root
