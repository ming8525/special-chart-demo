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
const createFeatureLayer = (url) => {
  if (!url) return
  if (!CacheLayers[url]) {
    const fl = new FeatureLayer({ url })
    return fl
  } else {
    return CacheLayers[url]
  }
}

const HistogramServiceURL = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3'
const ScatterPlotServiceURL = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA_secure_user1/MapServer/0' // user1/user1

const Root = (props) => {
  const scatterRef = React.useRef(null)
  const histogramRef = React.useRef(null)
  const scatterPlotLayer = React.useRef(createFeatureLayer(ScatterPlotServiceURL))
  const histogramLayer = React.useRef(createFeatureLayer(HistogramServiceURL))

  React.useEffect(() => {
    scatterRef.current.config = config.scatterPlot
    scatterRef.current.layer = scatterPlotLayer.current
    scatterRef.current.addEventListener('arcgisChartsDataProcessError', (e) => {
      console.log('Scatter Plot Error:')
      console.log(e)
    })

    histogramRef.current.config = config.histogram
    histogramRef.current.layer = histogramLayer.current
    histogramRef.current.addEventListener('arcgisChartsDataProcessError', (e) => {
      console.log('Histogram Error:')
      console.log(e)
    })
  }, [])

  return (
    <div style={{ height: 400, display: 'flex' }}>
      <div style={{ height: '100%', width: '50%' }}>
        <arcgis-charts-scatter-plot ref={scatterRef} />
      </div>
      <div style={{ height: '100%', width: '50%' }}>
        <arcgis-charts-histogram ref={histogramRef} />
      </div>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));