import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
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

const runtimeDataFilters = {
  where: '(((ID = 1)))'
}

const Root = (props) => {
  const ref = React.useRef()
  const layerRef = React.useRef(createFeatureLayer(config.service))

  React.useEffect(() => {
    const layer = layerRef.current
    layer.load().then(() => {
      const webChart = config.webChart
      ref.current.config = webChart
      ref.current.layer = layer
    })
  }, [])

  const handleClick = () => {
    ref.current.runtimeDataFilters = runtimeDataFilters
  }

  return (
    <div style={{ height: 323, width: 738 }} className='border'>
      <arcgis-charts-bar-chart ref={ref} />
      <button onClick={handleClick}>Filter: (ID = 1)</button>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
