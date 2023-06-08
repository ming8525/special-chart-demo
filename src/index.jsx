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

const Root = (props) => {
  const ref = React.useRef()
  const [layer, setLayer] = React.useState()

  React.useEffect(() => {
    createWebMapLayer(config.portalUrl, config.itemId).then((layer) => {
      setLayer(layer)
    })
  }, [])

  React.useEffect(() => {
    if (layer) {
      const webChart = config.webChart
      ref.current.config = webChart
      ref.current.layer = layer
    }
  }, [layer])

  return <div style={{ height: 500 }}>
    {layer && <arcgis-charts-pie-chart ref={ref} />}
  </div>
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)