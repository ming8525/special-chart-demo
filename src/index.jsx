import React from 'react';
import * as ReactDOMClient from 'react-dom/client'
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import Portal from '@arcgis/core/portal/Portal'
import PortalItem from '@arcgis/core/portal/PortalItem'
import WebMap from '@arcgis/core/WebMap'
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
  return map.layers[0]
}

const Root = (props) => {
  const ref = React.useRef()

  React.useEffect(() => {
    const layer = createFeatureLayer(config.service)
    const webChart = config.webChart
    ref.current.config = webChart
    setTimeout(() => {
      ref.current.layer = layer
    })
  }, [layer])

  return <div style={{ height: 500 }}>
    <arcgis-charts-pie-chart ref={ref} />
  </div>
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)