import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
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

const runtimeDataFilters1 = {
  geometry: {
    spatialReference: {
      latestWkid: 3857,
      wkid: 102100
    },
    xmin: -10305767.857059883,
    ymin: 3453350.867722927,
    xmax: -10196768.654725181,
    ymax: 3606530.6724064793
  }
}

const runtimeDataFilters2 = {
  geometry: {
    spatialReference: {
      latestWkid: 3857,
      wkid: 102100
    },
    xmin: -10305767.857059883,
    ymin: 3453350.867722927,
    xmax: -10196768.654725181,
    ymax: 3606530.6724064793
  }
}

const runtimeDataFilters3 = {
  geometry: {
    spatialReference: {
      latestWkid: 3857,
      wkid: 102100
    },
    xmin: -10305767.857059883,
    ymin: 3453350.867722927,
    xmax: -10196768.654725181,
    ymax: 3606530.6724064793
  }
}

const timeExtent1 = convertTimeExtent([1625029260000, 1627621260000])
const timeExtent2 = convertTimeExtent([1627621260000, 1630299660000])

const Root = (props) => {
  const ref = React.useRef()
  const layerRef = React.useRef(createFeatureLayer(config.service))

  React.useEffect(() => {
    const layer = layerRef.current
    layer.load().then(() => {
      const webChart = config.webChart
      ref.current.config = webChart
      ref.current.layer = layer
      ref.current.runtimeDataFilters = runtimeDataFilters1
      setTimeout(() => {
        layer.timeExtent = timeExtent1
        ref.current.layer = layer
        setTimeout(() => {
          ref.current.refresh()
        }, 11)
      }, 2826)
    })
  }, [])

  const handleClick = () => {
    ref.current.runtimeDataFilters = runtimeDataFilters2
    setTimeout(() => {
      const layer = layerRef.current
      layer.timeExtent = timeExtent2
      ref.current.layer = layer
      setTimeout(() => {
        ref.current.refresh()
      }, 11)
    }, 1)
  }

  return (
    <div style={{ height: 323, width: 738 }} className='border'>
      <arcgis-charts-line-chart ref={ref} />
      <button onClick={handleClick}>Next time</button>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
