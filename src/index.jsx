import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { ArcgisChartsBarChart } from '@arcgis/charts-components-react'
import { defineCustomElements } from '@arcgis/charts-components/dist/loader'
import config from './config.json'
import './style.css'

defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })

const Root = (props) => {
  return (
    <div className='d-flex'>
      <div
        style={{ height: 600, width: 800 }}
        className='border'
      >
        <ArcgisChartsBarChart
          timeZone='Indian/Comoro'
          className='border'
          config={config}/>
      </div>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
