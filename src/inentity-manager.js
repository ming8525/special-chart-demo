import React from 'react'
import OAuthInfo from '@arcgis/core/identity/OAuthInfo'
import IdentityManager from '@arcgis/core/identity/IdentityManager'

const checkSignInStatus = () => {
  return new Promise((resolve, reject) => {
    const auth = localStorage.getItem("auth")
    if(!auth) {
      reject()
    } else {
      const oAuthJson = JSON.parse(auth)
      const info = new OAuthInfo({
        portalUrl: oAuthJson.portalUrl,
        appId: oAuthJson.appId,
        popup: false
      })
      IdentityManager.registerOAuthInfos([info])
      setTimeout(() => {
        IdentityManager.checkSignInStatus(info.portalUrl + "/sharing").then(() => {
          resolve()
        }).catch(() => {
          reject()
        })
      }, 1000)
    }
  })
}

const registerOAuthInfos = (portalUrl, clientId) => {
  return new Promise((resolve) => {
    const info = new OAuthInfo({
      portalUrl,
      appId: clientId,
      popup: false
    })
    IdentityManager.registerOAuthInfos([info])
    localStorage.setItem("auth", JSON.stringify(info.toJSON()));
    IdentityManager.checkSignInStatus(info.portalUrl + "/sharing").then(() => {
      resolve()
    }).catch(() => {
      IdentityManager.getCredential(info.portalUrl + "/sharing", {
        oAuthPopupConfirmation: false
      })
    })
  })
}

export const useRegisterOAuth = () => {
  const [oAuthState, setOAuthState] = React.useState('none')

  React.useEffect(() => {
    checkSignInStatus().then(() => {
      setOAuthState('ready')
    }, () => {
      setOAuthState('not_ready')
    })
  }, [])

  const handleSignIn = React.useCallback((clientId, portalUrl) => {
    if (clientId) {
      registerOAuthInfos(portalUrl, clientId).then(() => {
        setOAuthState('not_ready')
      }, () => {
        setOAuthState('ready')
      })
    }
  }, [])

  return [oAuthState, handleSignIn]
}
