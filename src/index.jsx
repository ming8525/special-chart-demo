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

const selectionData = {
  selectionItems: [
    {
      count_of_FID: 1,
      FID: 2
    }
  ]
}

const Root = (props) => {
  const chartRef = React.useRef()

  React.useEffect(() => {
    chartRef.current.config = config
    chartRef.current.selectionData = selectionData
  }, [])


  return (
    <div className='d-flex'>
      <div
        style={{ height: 600, width: 600 }}
        className='border'
      >
        <arcgis-charts-pie-chart ref={chartRef} />
      </div>
      <pre className='border' style={{ width: 360, wordBreak: 'break-word' }}>{JSON.stringify(selectionData, null, " ")}</pre>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
