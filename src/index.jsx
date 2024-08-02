import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { defineCustomElements } from '@arcgis/charts-components/dist/loader'
import { useRegisterOAuth } from './inentity-manager'
import config from './config.json'
import './style.css'
defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })

const Chart = () => {
  const chartRef = React.useRef()
  React.useEffect(() => {
    chartRef.current.config = config
  }, [])
  return <arcgis-charts-bar-chart ref={chartRef} />
}

const Root = (props) => {
  const clientIdRef = React.useRef()
  const portalUrlRef = React.useRef()
  const [oAuthState, handleSignIn] = useRegisterOAuth()
  const [activated, setActivated] = React.useState('second')

  const handleClickSignIn = () => {
    const clientId = clientIdRef.current.value
    const portalUrl = portalUrlRef.current.value
    handleSignIn(clientId, portalUrl)
  }

  return (
    <div>
      {oAuthState === 'not_ready' && <div>
        <label>
          Portal URL:
          <input style={{ width: 200 }} ref={portalUrlRef} type='text' value='https://essorg.maps.arcgis.com' disabled />
        </label>
        <label>
          <a href='https://developers.arcgis.com/documentation/security-and-authentication/api-key-authentication/tutorials/create-an-api-key/' target='_blank'>ClientId:</a>
          <input ref={clientIdRef} type='password' />
        </label>
        <button onClick={handleClickSignIn}>Sign in</button>
      </div>}
      {oAuthState === 'ready' && (
        <div className='container border'>
          <div
            className='header border-bottom'
            style={{ width: '100%', display: 'flex' }}
          >
            <button
              className={activated === 'first' ? 'activated' : ''}
              style={{ width: '50%' }}
              onClick={() => setActivated('first')}
            >
              First
            </button>
            <button
              className={activated === 'second' ? 'activated' : ''}
              style={{ width: '50%' }}
              onClick={() => setActivated('second')}
            >
              Second
            </button>
          </div>
          <div className='contents'>
            <div
              className='content first-content'
              style={{ display: activated === 'first' ? 'block' : 'none' }}
            >
              Please switch to the second tab content
            </div>
            <div
              className='content second-content'
              style={{ display: activated === 'second' ? 'block' : 'none' }}
            >
              <Chart />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const app = ReactDOMClient.createRoot(document.getElementById('app'))
app.render(<Root />)
