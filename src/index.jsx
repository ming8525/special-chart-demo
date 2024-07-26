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

const Root = (props) => {
  const chartRef = React.useRef()

  React.useEffect(() => {
    chartRef.current.config = config
    chartRef.current.chartLimits = {
      maxBarChartSeriesCount: 100,
      maxBarThreePlusSeriesCountTotal: 2000,
      maxBarThreePlusSeriesCountPerSeries: 100,
      behaviorAfterLimit: 'reject'
    }
    chartRef.current.runtimeDataFilters = {
      where: "((P0010001 IN (104357)))"
    }
    chartRef.current.selectionData = {
      selectionItems: []
  }
  }, [])

  return (
    <div className='d-flex'>
      <div
        style={{ height: 600, width: 800 }}
        className='border'
      >
        <arcgis-charts-bar-chart ref={chartRef} />
      </div>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
