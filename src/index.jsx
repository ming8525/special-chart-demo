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
  const [hideEmptySeriesInLegend, setHideEmptySeriesInLegend] = React.useState(false)

  React.useEffect(() => {
    chartRef.current.config = config
    chartRef.current.hideEmptySeriesInLegend = hideEmptySeriesInLegend
  }, [])

  React.useEffect(() => {
    if(!chartRef.current) return
    chartRef.current.hideEmptySeriesInLegend = hideEmptySeriesInLegend
  }, [hideEmptySeriesInLegend])

  const handleHideEmptySeriesInLegendChange = (e) => {
    setHideEmptySeriesInLegend(e.checked)
  }

  return (
    <div className='d-flex'>
      <div
        style={{ height: 600, width: 800 }}
        className='border'
      >
        <arcgis-charts-bar-chart ref={chartRef} />
      </div>
      <div>
      <input type="checkbox" id="hideEmptySeriesInLegend" name="scales" checked={hideEmptySeriesInLegend} onChange={handleHideEmptySeriesInLegendChange} />
      <label for="hideEmptySeriesInLegend">hideEmptySeriesInLegend</label>
    </div>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
