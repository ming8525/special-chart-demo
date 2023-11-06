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

const Root = (props) => {
  const ref = React.useRef()

  React.useEffect(() => {
    const layer = createFeatureLayer(config.service)
    layer.load().then(() => {
      const webChart = config.webChart
      ref.current.config = webChart
      ref.current.layer = layer
    })
  }, [])

  const handleClick = () => {
    let legendTitle = config.webChart.legend.title
    legendTitle = {
      ...legendTitle,
      content: {
        ...legendTitle.content,
        text: 'Legend title'
      }
    }
    const webChart = {
      ...config.webChart,
      legend: {
        ...config.webChart.legend,
        title: legendTitle
      }
    }
    ref.current.config = webChart
  }

  return (
    <div
      style={{ height: 500, width: '100%', display: 'flex' }}
      className='border'
    >
      <arcgis-charts-bar-chart ref={ref} />
      <button onClick={handleClick}>Add legend title</button>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
