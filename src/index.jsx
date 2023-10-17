import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {
  applyPolyfills,
  defineCustomElements,
} from '@arcgis/charts-components/dist/loader'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import config from './config.json'
import './style.css'

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const createFeatureLayer = (url) => {
  const fl = new FeatureLayer({ url })
  return fl
}

const convertTimeExtent = (timeExtent) => {
  return {
    start: new Date(timeExtent[0]),
    end: new Date(timeExtent[1]),
  }
}

const timeExtent = convertTimeExtent([1630472401000, 1633064401000])

const Root = (props) => {
  const ref = React.useRef()

  React.useEffect(() => {
    const layer = createFeatureLayer(config.service)
    layer.load().then(() => {
      const webChart = config.webChart
      ref.current.config = webChart
      ref.current.layer = layer
      
      setTimeout(() => {
        layer.timeExtent = timeExtent
        ref.current.refresh() 
      }, [500])
    })
  }, [])

  return (
    <div
      style={{ height: 500, width: '100%', display: 'flex' }}
      className='border'
    >
      <arcgis-charts-line-chart ref={ref} />
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
