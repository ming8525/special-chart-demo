import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { ArcgisChartsBarChart } from '@arcgis/charts-components-react'
import { defineCustomElements } from '@arcgis/charts-components/dist/loader'
import { JsonEditor } from './json-editor'
import config from './config.json'
import './style.css'

defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })


const Root = (props) => {
  const editorRef = React.useRef(null)
  const [webChart, setWebChart] = React.useState()

  const handleUpdate = () => {
    setWebChart(editorRef.current.get())
  }

  return (
    <div style={{ height: 800, width: 1600, display: 'flex' }}>
      <ArcgisChartsBarChart config={webChart} style={{ height: 800, width: 800 }} className='border' />
      <div style={{ height: 800, width: 800 }} className='border'>
        <JsonEditor ref={editorRef} defaultValue={config} onUpdate={handleUpdate} />
      </div>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
