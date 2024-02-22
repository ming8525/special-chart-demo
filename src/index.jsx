import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {
  applyPolyfills,
  defineCustomElements,
} from '@arcgis/charts-components/dist/loader'
import config from './config.json'
import './style.css'

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const props = {
  "timeZone": "system",
  "chartLimits": {
    "maxPieChartSliceCountTotal": 300,
    "behaviorAfterLimit": "reject"
  },
  "selectionData": {},
  "autoDisposeChart": false,
  "enableResponsiveFeatures": false,
  "queueChartCreation": true,
  "useAnimatedCharts": false,
  "hideLicenceWatermark": true,
  "returnSelectionIndexes": true,
  "returnSelectionOIDs": false
}

const Root = (props) => {
  const chartRef = React.useRef()

  React.useEffect(() => {
    chartRef.current.config = config
    Object.keys(props).forEach((key) => {
      chartRef.current[key] = props[key]
    })
    setTimeout(() => {
      chartRef.current.selectionData = {}
    }, 500);
  }, [])


  return (<div style={{ height: 262, width: 378 }}>
    <arcgis-charts-pie-chart ref={chartRef} />
  </div>)
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
