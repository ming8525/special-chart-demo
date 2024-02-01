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

const ChartLimits = {
  maxBarChartSeriesCount: 100,
  maxBarThreePlusSeriesCountTotal: 2000,
  maxBarThreePlusSeriesCountPerSeries: 2,
  behaviorAfterLimit: 'renderUpToTheLimit'
}

const Root = (props) => {
  const chartRef = React.useRef()

  React.useEffect(() => {
    chartRef.current.config = config
    chartRef.current.chartLimits = ChartLimits
  }, [])


  return (
    <div className='d-flex'>
      <div
        style={{ height: 600, width: 600 }}
        className='border'
      >
        <arcgis-charts-bar-chart ref={chartRef} />
      </div>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
