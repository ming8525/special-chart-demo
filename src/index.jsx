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

const BarChart = ({ style }) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    const service = config.service
    const layer = createFeatureLayer(service)

    const webChart = config.webChart
    ref.current.config = webChart
    ref.current.layer = layer
  }, [])

  return <div style={{ height: '100%', width: '100%', ...style }}>
    <arcgis-charts-bar-chart ref={ref} />
  </div>
}

const Charts = ['1', '2']

const Root = (props) => {
  const [displayIndex, setDisplayIndex] = React.useState(0)

  const switchChart = () => {
    let newIndex = displayIndex + 1
    if (newIndex > (Charts.length - 1)) {
      newIndex = 0
    }
    setDisplayIndex(newIndex)
  }

  return <div style={{ height: 300 }}>
    <div style={{ height: '100%', width: '1200px' }}>
      {
        Charts.map((chart, idx) => {
          const activate = displayIndex === idx
          return <BarChart key={idx} style={{ display: activate ? 'flex' : 'none' }}/>
        })
      }
    </div>
    <button onClick={switchChart}>Switch chart</button>
  </div>
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)