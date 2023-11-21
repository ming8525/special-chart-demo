import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {
  applyPolyfills,
  defineCustomElements,
} from '@arcgis/charts-components/dist/loader'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import config from './config.json'
import './style.css'

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const createFeatureLayer = (url) => {
  const fl = new FeatureLayer({ url })
  return fl
}

const Root = (props) => {
  const ref = React.useRef()

  React.useEffect(() => {
    const layer = createFeatureLayer(config.service)
    layer.load().then(() => {
      const webChart = config.webChart
      ref.current.config = webChart
      ref.current.layer = layer
    })
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
