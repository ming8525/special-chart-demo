import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { ArcgisChartsLineChart } from '@arcgis/charts-components-react'
import { defineCustomElements } from '@arcgis/charts-components/dist/loader'
import config from './config.json'
import './style.css'

defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })


const Root = (props) => {
  const editorRef = React.useRef(null)
  const [selectionData, setSelectionData] = React.useState({ selectionItems: [] })

  const handleUpdateSelectionData = () => {
    setSelectionData({
      selectionItems: [
        {
          Date: 1266854400000,
          count_of_FID: 4
        }
      ]
    })
  }

  const handleDataProcessComplete = () => {
    console.log('The arcgisDataProcessComplete event was triggered.')
  }

  return (
    <div style={{ height: 500, width: 500 }}>
      <ArcgisChartsLineChart
        className='border'
        config={config}
        selectionData={selectionData}
        onArcgisDataProcessComplete={handleDataProcessComplete} />
      <button onClick={handleUpdateSelectionData}>Update selectionData</button>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
