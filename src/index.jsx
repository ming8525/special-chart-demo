import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {
  applyPolyfills,
  defineCustomElements,
} from '@arcgis/charts-components/dist/loader'
import config1 from './config1.json'
import config2 from './config2.json'
import config3 from './config3.json'
import './style.css'

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const Chart = ({ config }) => {
  const chartRef = React.useRef()

  React.useEffect(() => {
    chartRef.current.config = config
  }, [config])

  return (
    <div className='d-flex'>
      <div style={{ height: 262, width: 450 }} className='border'>
        <arcgis-charts-gauge ref={chartRef} />
      </div>
      <div>
    </div>
    </div>
  )
}

const Root = (props) => {
  return (
    <div className='d-flex'>
      <Chart config={config1} />
      <Chart config={config2} />
      <Chart config={config3} />
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
