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
  const ref = React.useRef(null)
  const [selectionData, setSelectionData] = React.useState()

  React.useEffect(() => {
    const service = config.service
    const layer = createFeatureLayer(service)

    const webChart = config.webChart
    
    ref.current.config = webChart
    ref.current.layer = layer
  }, [])

  const handleClick = () => {
    let newSelectionData = selectionData ?? DefaultSelectionData
    const selectionIndexes = newSelectionData.selectionIndexes
    selectionIndexes.set(0, { indexesToSelect: [selectionIndex]})
    ref.current.selectionData = { selectionIndexes }
    selectionIndex++
    if(selectionIndex > 4) selectionIndex = 0
  }

  return <div style={{ height: 400 }}>
    <arcgis-charts-bar-chart ref={ref} />
    <button onClick={handleClick}>Update selection</button>
  </div>
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root/>)