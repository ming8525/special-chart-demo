import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { ArcgisChartsBarChart, ArcgisChartsLineChart, ArcgisChartsPieChart, ArcgisChartsHistogram, ArcgisChartsScatterPlot } from '@arcgis/charts-components-react'
import { defineCustomElements } from '@arcgis/charts-components/dist/loader'
import { JsonEditor } from './json-editor'
import config from './config.json'
import './style.css'
defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })


const Root = (props) => {
  const editorRef = React.useRef(null)
  const [webChart, setWebChart] = React.useState()
  const seriesType = webChart?.series[0]?.type ?? 'barSeries'

  const handleUpdate = () => {
    setWebChart(editorRef.current.get())
  }

  return (
    <div style={{ height: 700, width: 1400, display: 'flex' }}>
      {seriesType === 'barSeries' && <ArcgisChartsBarChart config={webChart} style={{ width: 700 }} className='border' />}
      {seriesType === 'lineSeries' && <ArcgisChartsLineChart config={webChart} style={{ width: 700 }} className='border' />}
      {seriesType === 'pieSeries' && <ArcgisChartsPieChart config={webChart} style={{ width: 700 }} className='border' />}
      {seriesType === 'scatterSeries' && <ArcgisChartsScatterPlot config={webChart} style={{ width: 700 }} className='border' />}
      {seriesType === 'histogramSeries' && <ArcgisChartsHistogram config={webChart} style={{ width: 700 }} className='border' />}
      <div style={{ height: 700, width: 700 }} className='border'>
        <JsonEditor ref={editorRef} defaultValue={config} onUpdate={handleUpdate} />
      </div>
    </div>
  )
}

const app = ReactDOMClient.createRoot(document.getElementById('app'))
app.render(<Root />)
