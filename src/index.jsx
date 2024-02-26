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
  }, [])

  return (<div className='container'>
    <arcgis-charts-pie-chart ref={chartRef} />
  </div>)
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
