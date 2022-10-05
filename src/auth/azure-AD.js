/* eslint-disable @typescript-eslint/explicit-function-return-type */
// note on window.msal usage. There is little point holding the object constructed by new Msal.UserAgentApplication
// as the constructor for this class will make callbacks to the acquireToken function and these occur before
// any local assignment can take place. Not nice but its how it works.
import * as Msal from "msal" 
import React from "react" 

const state = {
  stopLoopingRedirect: false,
  launchApp: null,
  accessToken: "",
  scopes: [],
  app: null
} 

function parseAuthResponse(resp) {
  if (resp.accessToken) {
    state.accessToken = resp.accessToken 
  } else {
    state.accessToken = resp.idToken.rawIdToken 
  }

  state.idToken = resp.idToken 
  state.expiresOn = resp.expiresOn 
  state.account = resp.account 
}

function acquireToken(successCallback) {
  const user = state.app.getAccount() 

  if (!user) {
    state.app.loginRedirect({
      scopes: state.scopes
    }) 
  } else {
    state.app
      .acquireTokenSilent({
        scopes: state.scopes
      })
      .then(
        resp => {
          parseAuthResponse(resp) 
          if (state.launchApp) {
            state.launchApp() 
          }
          if (successCallback) {
            successCallback() 
          }
        }).catch(error => {
            console.log(error)
            state.app
            .acquireTokenRedirect({
                scopes: state.scopes
            }).then(
                resp => {
                parseAuthResponse(resp) 
                if (state.launchApp) {
                    state.launchApp() 
                }
                if (successCallback) {
                    successCallback() 
                }
            }).catch(error => {
                console.log("Auth Errortestest: ", error) 
            })
        })
  }
}

const authentication = {
  initialize: (scopes, msalConfig) => {
    state.scopes = scopes 
    state.app = new Msal.UserAgentApplication(msalConfig) 

    state.app.handleRedirectCallback(function (error, resp) {
      if (error) {
        state.stopLoopingRedirect = true 
      } else {
        acquireToken() 
      }
    }) 
  },
  run: launchApp => {
    state.launchApp = launchApp 

    if (
      !window.msal.isCallback(window.location.hash) &&
      window.parent === window &&
      !window.opener
    ) {
      if (!state.stopLoopingRedirect) {
        acquireToken() 
      }
    }
  },
  required: (WrappedComponent, renderLoading) => {
    return class extends React.Component {
      constructor(props) {
        super(props) 
        this.state = {
          signedIn: false,
          error: null
        } 
      }

      componentWillMount() {
        acquireToken(() => {
          this.setState({
            signedIn: true
          }) 
        }) 
      }

      render() {
        if (this.state.signedIn) {
          return <WrappedComponent {...this.props} /> 
        }
        return typeof renderLoading === "function" ? renderLoading() : null 
      }
    } 
  },
  signOut: () => state.app.logout(),
  isLoggedIn: () => !!state.accessToken,
  getAccount: () => state.account || state.app.getAccount(),
  getAccessToken: () => state.accessToken
} 

export default authentication 
