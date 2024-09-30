import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { ArcgisChartsBarChart } from '@arcgis/charts-components-react'
import { defineCustomElements } from '@arcgis/charts-components/dist/loader'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import config from './config.json'
import fakerLayer from './faker-layer.json'
import Resizable from './resizable'
import './style.css'
defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })

const Chart = () => {
  const [layer, setLayer] = React.useState(null)

  React.useEffect(() => {
    const layer = new FeatureLayer({
      objectIdField: "FID",
      fields: fakerLayer.fields,
      source: fakerLayer.features
    })
    setLayer(layer)
  }, [])

  return <ArcgisChartsBarChart layer={layer} config={config} />
}

const Root = (props) => {
  return (
    <div className='container border'>
      <Resizable>
        <Chart />
      </Resizable>
    </div>
  )
}

const app = ReactDOMClient.createRoot(document.getElementById('app'))
app.render(<Root />)
