import Portal from '@arcgis/core/portal/Portal'
import OAuthInfo from '@arcgis/core/identity/OAuthInfo'
import IdentityManager from '@arcgis/core/identity/IdentityManager'

export const registerOAuthInfos = (portalUrl, clientId) => {
  return new Promise((resolve, reject) => {
    const info = new OAuthInfo({
      portalUrl,
      appId: clientId,
      popup: false
    })
    IdentityManager.registerOAuthInfos([info])
    IdentityManager.checkSignInStatus(info.portalUrl + "/sharing").then(() => {
      resolve()
    }).catch(() => {
      IdentityManager.setOAuthRedirectionHandler((info) => {
        resolve()
      })
    })
  })
}
