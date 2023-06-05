import React from 'react';
import * as ReactDOMClient from 'react-dom/client'
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import config from './config.json'
import './style.css';

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const CacheLayers = {}
const createFeatureLayer = (url) => {
  if (!url) return null
  if (!CacheLayers[url]) {
    const fl = new FeatureLayer({ url })
    CacheLayers[url] = fl
    return fl
  } else {
    return CacheLayers[url]
  }
}

let selectionIndex = 0
const selectionIndexes = new Map()
selectionIndexes.set(0, { indexesToSelect: []})
const DefaultSelectionData = { selectionIndexes }

const Root = (props) => {
  const ref = React.useRef()

  React.useEffect(() => {
    const service = config.service
    const layer = createFeatureLayer(service)

    const webChart = config.webChart
    ref.current.config = webChart
    ref.current.layer = layer
    setTimeout(() => {
      ref.current.selectionData = DefaultSelectionData
    }, 200)
  }, [])

  return <div style={{ height: 500 }}>
    <arcgis-charts-pie-chart ref={ref} />
  </div>
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)