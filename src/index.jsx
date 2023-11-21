import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {
  applyPolyfills,
  defineCustomElements,
} from '@arcgis/charts-components/dist/loader'
import config from './config.json'
import './style.css'

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const Root = (props) => {
  const ref = React.useRef()

  React.useEffect(() => {
    const webChart = config.webChart
    ref.current.config = webChart
  }, [])

  return (
    <div
      style={{ height: 408, width: 500, display: 'flex' }}
      className='border'
    >
      <arcgis-charts-pie-chart ref={ref} />
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
