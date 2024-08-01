import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { defineCustomElements } from '@arcgis/charts-components/dist/loader'
import { registerOAuthInfos } from './inentity-manager'
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
  const [ready, setReady] = React.useState(false)
  const [activated, setActivated] = React.useState('second')

  const handleSignIn = () => {
    const clientId = clientIdRef.current.value
    if (clientId) {
      registerOAuthInfos('https://essorg.maps.arcgis.com', clientId).then(() => {
        setReady(true)
      }, () => {
        setReady(false)
      })
    }
  }

  return (
    <div>
        <input type='tex' value='https://essorg.maps.arcgis.com' disabled />
        <input ref={clientIdRef} type='tex' />
        <button onClick={handleSignIn}>Sign in</button>
      {ready && (
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
              test
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const app = ReactDOMClient.createRoot(document.getElementById('app'))
app.render(<Root />)
