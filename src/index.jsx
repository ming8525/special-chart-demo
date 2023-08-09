import React from 'react';
import * as ReactDOMClient from 'react-dom/client'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import Portal from '@arcgis/core/portal/Portal'
import PortalItem from '@arcgis/core/portal/PortalItem'
import WebMap from '@arcgis/core/WebMap'
import { applyPolyfills, defineCustomElements } from './arcgis-charts'
import config from './config.json'
import './style.css';

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: './arcgis-charts/' })
})

const createWebMapLayer = (portalUrl, itemId) => {
  const portal = new Portal({
    url: portalUrl
  })
  const map = new WebMap({
    portalItem: new PortalItem({
      id: itemId,
      portal: portal
    })
  })
  return new Promise((resolve, reject) => {
    map.load().then(() => {
      const layers = map.layers.toArray()
      resolve(layers[3].clone())
    })
  })
}

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

  return <div style={{ height: 500 }}>
    {layer && <arcgis-charts-bar-chart ref={ref} />}
  </div>
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)