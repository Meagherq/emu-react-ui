import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import store from './store/configureStore'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import EmunationTheme from './styles/EmunationTheme'
import { BrowserRouter as Router } from 'react-router-dom'
import AADauth from '../src/auth/azure-AD'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'

const host = window.location.origin
const instance = process.env.REACT_APP_B2C_INSTANCE;
const tenant = process.env.REACT_APP_B2C_TENANT;
// const policy = process.env.REACT_APP_B2C_POLICY;
const appId = process.env.REACT_APP_B2C_APPID;
const scopes = process.env.REACT_APP_B2C_SCOPES?.split(',');

const msalConfig = {
    auth: {
        clientId: appId,
        //authority: `${instance}${tenant}/${policy}`,
        authority: `${instance}${tenant}`,
        validateAuthority: false,
        redirectUri: process.env.REACT_APP_SITE_URL || host,
        postLogoutRedirectUri: host,
    },
    cache: {
        cacheLocation: 'sessionStorage',
    },
}

AADauth.initialize(scopes, msalConfig)

AADauth.run(() => {
    render(
        <>
            <CssBaseline />
            <MuiThemeProvider theme={EmunationTheme}>
                <Router>
                    <Provider store={store}>
                        <Root />
                    </Provider>
                </Router>
            </MuiThemeProvider>
        </>,
        document.getElementById('root')
    )
})

serviceWorker.register()
