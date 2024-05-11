import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {
  applyPolyfills,
  defineCustomElements,
} from '@arcgis/charts-components/dist/loader'
import config from './config.json'
import './style.css'
import WebMap from '@arcgis/core/WebMap'
import MapView from '@arcgis/core/views/MapView'
import '@arcgis/core/assets/esri/themes/light/main.css'

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const Root = (props) => {
  const chartRef = React.useRef()
  const mapDivRef = React.useRef()
  const [viewExtentChangePolicy, setViewExtentChangePolicy] = React.useState('refresh')

  React.useEffect(() => {
    (async () => {
      const webmap = new WebMap({
        portalItem: {
          id: 'f41763f3ec144ac4b771c7b8d17cca11',
        },
      })
      const view = new MapView({
        container: mapDivRef.current,
        map: webmap,
        zoom: 10,
        center: [-87.85, 41.80]
      })

      await view.when()

      const layer = view.map.layers.toArray()[0]

      chartRef.current.config = config.webChart
      chartRef.current.layer = layer
      chartRef.current.view = view

      chartRef.current.viewExtentChangePolicy = 'refresh'
    })()
  }, [])

  const handleRefreshOnViewExtentChange = (e) => {
    const checked = e.target.checked
    const changePolicy = checked ? 'refresh' : 'ignore'
    chartRef.current.viewExtentChangePolicy = changePolicy
    setViewExtentChangePolicy(changePolicy)
  }

  return (
    <div className='d-flex'>
      <div
        style={{ height: 600, width: 600 }}
        className='border'
        ref={mapDivRef}
      />
      <div
        style={{ height: 600, width: 600 }}
        className='border'
      >
        <arcgis-charts-bar-chart ref={chartRef} />
      </div>
      <div>
        <input type="checkbox" id="viewExtentChangePolicy" checked={viewExtentChangePolicy === 'refresh'} onChange={handleRefreshOnViewExtentChange} />
        <label htmlFor="viewExtentChangePolicy">{viewExtentChangePolicy}</label>
      </div>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
