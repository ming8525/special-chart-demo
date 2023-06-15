import React from 'react';
import * as ReactDOMClient from 'react-dom/client'
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import Graphic from '@arcgis/core/Graphic'
import Portal from '@arcgis/core/portal/Portal'
import PortalItem from '@arcgis/core/portal/PortalItem'
import WebMap from '@arcgis/core/WebMap'
import configs from './configs.json'
import './style.css';

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const createFeatureLayer = (url, json) => {
  if (!url && !json) return null
  let fl = null
  if(url) {
    fl = new FeatureLayer({ url })
  } else if (json) {
    let graphics = json.source
    graphics = graphics.map((graphic) => {
      return new Graphic({
        geometry: null,
        attributes: graphic.attributes
      })
    })
    fl = new FeatureLayer(json)
    fl.source = graphics
  }
  return fl
}

const Chart = ({ config }) => {
  const ref = React.useRef()
  const [layer, setLayer] = React.useState()

  React.useEffect(() => {
    const layer = createFeatureLayer(config.service, config.layerJson)
    setLayer(layer)
  }, [])

  React.useEffect(() => {
    if (layer) {
      const webChart = config.webChart
      ref.current.config = webChart
      ref.current.layer = layer
    }
  }, [layer])

  return <div style={{ width: 502, height: 238 }}>
    {layer && <arcgis-charts-pie-chart ref={ref} />}
  </div>
}

const Root = (props) => {
  return <div style={{ width: '100%', display: 'flex' }}>
    {
      [...configs, configs[1]].map((config) => (<Chart config={config} />))
    }
  </div>
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)