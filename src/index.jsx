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

const getSelectionData = (indexes) => {
  const selectionIndexes = new Map()
  selectionIndexes.set(0, { indexesToSelect: indexes})
  return { selectionIndexes }
}

const Root = (props) => {
  const ref = React.useRef()
  const [layer, setLayer] = React.useState()

  React.useEffect(() => {
    const layer = createFeatureLayer(config.service)
    setLayer(layer)
  }, [])

  React.useEffect(() => {
    if (layer) {
      const webChart = config.webChart
      ref.current.config = webChart
      ref.current.layer = layer
    }
  }, [layer])

  const handleSelection = () => {
    const selectionData = getSelectionData([0])
    ref.current.selectionData = selectionData
  }

  const clearSelection = () => {
    const selectionData = getSelectionData([])
    ref.current.selectionData = selectionData
  }

  return <div style={{ width: 470, height: 302 }}>
    {layer && <arcgis-charts-pie-chart ref={ref} />}
    <button onClick={handleSelection}>Select the first piece</button>
    <button onClick={clearSelection}>Clear selection</button>
  </div>
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)