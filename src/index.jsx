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
import esriConfig from '@arcgis/core/config'
import '@arcgis/core/assets/esri/themes/light/main.css'

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const Root = (props) => {
  const chartRef = React.useRef()
  const mapDivRef = React.useRef()

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
      const layerVeiw = await view.whenLayerView(layer)
      const webChart = config.webChart
      chartRef.current.config = config.webChart
      // chartRef.current.layer = layerVeiw 
      chartRef.current.layer = layer
      chartRef.current.view = view
    })()
  }, [])

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
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
