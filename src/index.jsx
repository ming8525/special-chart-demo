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
  const [chartLimits, setChartLimits] = React.useState({
    maxCategoryCount: 3,
    behaviorAfterLimit: 'renderUpToTheLimit'
  })
  const [webChart, setWebChart] = React.useState()
  const seriesType = webChart?.series[0]?.type ?? 'barSeries'

  const handleUpdate = () => {
    setWebChart(editorRef.current.get())
  }
  const handleUpdateChartLimits = () => {
    setChartLimits({
      maxCategoryCount: 2,
      behaviorAfterLimit: 'renderUpToTheLimit'
    })
  }

  return (
    <div style={{ height: 800, width: 1600, display: 'flex' }}>
      {seriesType === 'barSeries' && <ArcgisChartsBarChart chartLimits={chartLimits} config={webChart} style={{ height: 800, width: 800 }} className='border' />}
      {seriesType === 'lineSeries' && <ArcgisChartsLineChart config={webChart} style={{ height: 800, width: 800 }} className='border' />}
      {seriesType === 'pieSeries' && <ArcgisChartsPieChart config={webChart} style={{ height: 800, width: 800 }} className='border' />}
      {seriesType === 'scatterSeries' && <ArcgisChartsScatterPlot config={webChart} style={{ height: 800, width: 800 }} className='border' />}
      {seriesType === 'histogramSeries' && <ArcgisChartsHistogram config={webChart} style={{ height: 800, width: 800 }} className='border' />}
      <div style={{ height: 800, width: 800 }} className='border'>
        <JsonEditor ref={editorRef} defaultValue={config} onUpdate={handleUpdate} />
      </div>
      <button onClick={handleUpdateChartLimits}>UpdateChartLimits</button>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
