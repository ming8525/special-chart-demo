import React from 'react';
import ReactDOM from 'react-dom';
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
import config from './config.json'
import './style.css';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const CacheLayers = {}
const createFeatureLayer = (portalUrl, itemId) => {
  return new Promise((resolve, reject) => {
    if (!portalUrl || !itemId) return reject()
    if (!CacheLayers[itemId]) {
      const fl = new FeatureLayer({
        portalItem: {
          id: itemId,
          portal: { url: portalUrl }
        }
      })
      fl.load().then((layer) => {
        CacheLayers[itemId] = layer
        resolve(layer)
      })
    } else {
      resolve(CacheLayers[itemId])
    }
  })
}
const portalUrl = 'https://www.arcgis.com/'
const itemId = 'a3880aef9fee444c84da17c0d3b92630'

const Root = (props) => {
  const ref = React.useRef(null)
  const [featureLayer, setFeatureLayer] = React.useState(null)

  React.useEffect(() => {
    createFeatureLayer(portalUrl, itemId).then((featureLayer) => {
      setFeatureLayer(featureLayer)
    })
  }, [])

  React.useEffect(() => {
    if(ref.current && featureLayer) {
      ref.current.config = config
      ref.current.featureLayer = featureLayer
    }
  }, [featureLayer])

  return <div style={{ height: 400 }}>
    {featureLayer && <arcgis-charts-bar-chart ref={ref} />}
  </div>
}

ReactDOM.render(<Root />, document.getElementById('root'));